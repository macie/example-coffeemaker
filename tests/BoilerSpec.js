import Boiler from '../src/Boiler';

describe('Boiler', function() {
    let boiler;

    beforeEach(function() {
        let lowLevelAPIFake = {GetBoilerStatus: () => 'NOT_EMPTY'};
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
        let result = boiler.turnOff();

        expect(result).toEqual(boiler);
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
