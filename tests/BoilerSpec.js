import Boiler from '../src/Boiler';

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
        let result = boiler.initialize();

        expect(result).toEqual(boiler);
    });

    it('should be able to turn on', function() {
        let result = boiler.turnOn();

        expect(result).toEqual(boiler);
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
