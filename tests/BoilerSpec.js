jest.mock('../src/Signal.js');
jest.mock('../src/LowLevelAPI.js');
import Boiler from '../src/Boiler';

jest.useFakeTimers();

describe('Boiler', () => {
    let boiler;

    beforeEach(() => {
        boiler = new Boiler();
    });

    it('should be able to reset itself', () => {
        boiler.turnOff = jest.fn();

        boiler.initialize();

        expect(boiler.turnOff).toHaveBeenCalled();
        expect(boiler.signal.drained.drop).toHaveBeenCalled();
    });

    it('should be able to turn on', () => {
        boiler.turnOn();

        expect(boiler.api.SetBoilerState).toHaveBeenCalledWith('ON');
        expect(boiler.api.SetReliefValveState).toHaveBeenCalledWith('CLOSED');
    });

    it('should protect itself against overheating', () => {
        boiler.turnOff = jest.fn(boiler.turnOff);
        boiler.isEmpty = jest.fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true)
            .mockReturnValue(false);

        boiler.turnOn();
        jest.advanceTimersByTime(10000);

        expect(boiler.isEmpty).toHaveBeenCalledTimes(3);
        expect(boiler.turnOff).toHaveBeenCalledTimes(1);
    });

    it('should maintain only one overheating check', () => {
        boiler.turnOff = jest.fn(boiler.turnOff);
        boiler.isEmpty = jest.fn().mockReturnValue(false);
        boiler.turnOn();

        boiler.turnOn();
        jest.advanceTimersByTime(10000);

        expect(boiler.turnOff).toHaveBeenCalledTimes(1);
    });

    it('should be able to inform about boiling end', () => {
        boiler.turnOff = jest.fn(boiler.turnOff);
        boiler.isEmpty = jest.fn()
            .mockReturnValue(true);

        boiler.turnOn();
        jest.advanceTimersByTime(1000);

        expect(boiler.signal.drained.emit).toHaveBeenCalled();
    });

    it('should be able to turn off', () => {
        boiler.turnOff();

        expect(boiler.api.SetBoilerState).toHaveBeenCalledWith('OFF');
        expect(boiler.api.SetReliefValveState).toHaveBeenCalledWith('OPEN');
    });

    describe('should indicate if', () => {
        it('is empty', () => {
            boiler.api.GetBoilerStatus.mockReturnValue('EMPTY');

            let result = boiler.isEmpty();

            expect(result).toBeTruthy();
        });

        it('is not empty', () => {
            boiler.api.GetBoilerStatus.mockReturnValue('NOT_EMPTY');

            let result = boiler.isEmpty();

            expect(result).toBeFalsy();
        });
    });
});
