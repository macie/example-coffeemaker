import Boiler from '../src/Boiler';

describe('Boiler', function() {
    let boiler;

    beforeEach(function() {
        boiler = new Boiler();
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

    it('should indicate if is empty', function() {
        let result = boiler.isEmpty();

        expect(result).toBeFalsy();
    });
});
