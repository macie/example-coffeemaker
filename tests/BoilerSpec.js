jest.mock('../src/Watchdog.js');
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
    });

    it('should be able to turn on', () => {
        boiler.turnOn();

        expect(boiler.api.SetBoilerState).toHaveBeenCalledWith('ON');
        expect(boiler.api.SetReliefValveState).toHaveBeenCalledWith('CLOSED');
    });

    it('should protect itself against overheating', () => {
        boiler.turnOff = jest.fn();
        boiler.isEmpty = jest.fn();

        boiler.initialize();

        expect(boiler.overheatingCheckLoop.specification)
            .toHaveBeenCalledWith(boiler.isEmpty, boiler.turnOff);
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
