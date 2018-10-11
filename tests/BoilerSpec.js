import Boiler from '../src/Boiler';

jest.useFakeTimers();

describe('Boiler', function() {
    let boiler;

    beforeEach(function() {
        let lowLevelAPIFake = {
            GetBoilerStatus: () => 'NOT_EMPTY',
            SetBoilerState: () => {},
            SetReliefValveState: () => {}
        };
        boiler = new Boiler();
        boiler.api = lowLevelAPIFake;
    });

    it('should be able to reset itself', function() {
        spyOn(boiler, 'turnOff');

        boiler.initialize();

        expect(boiler.turnOff).toHaveBeenCalled();
    });

    it('should be able to turn on', function() {
        spyOn(boiler.api, 'SetBoilerState');
        spyOn(boiler.api, 'SetReliefValveState');

        boiler.turnOn();

        expect(boiler.api.SetBoilerState).toHaveBeenCalledWith('ON');
        expect(boiler.api.SetReliefValveState).toHaveBeenCalledWith('CLOSED');
    });

    it('should protect itself against overheating ', function() {
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

    it('should be able to turn off', function() {
        spyOn(boiler.api, 'SetBoilerState');
        spyOn(boiler.api, 'SetReliefValveState');

        boiler.turnOff();

        expect(boiler.api.SetBoilerState).toHaveBeenCalledWith('OFF');
        expect(boiler.api.SetReliefValveState).toHaveBeenCalledWith('OPEN');
    });

    describe('should indicate if', function() {
        it('is empty', function() {
            boiler.api.GetBoilerStatus = () => 'EMPTY';

            let result = boiler.isEmpty();

            expect(result).toBeTruthy();
        });

        it('is not empty', function() {
            boiler.api.GetBoilerStatus = () => 'NOT_EMPTY';

            let result = boiler.isEmpty();

            expect(result).toBeFalsy();
        });
    });
});
