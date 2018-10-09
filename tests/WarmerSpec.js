import Warmer from '../src/Warmer';

describe('Warmer', function() {
    let warmer;

    beforeEach(function() {
        warmer = new Warmer();
    });

    it('should be able to reset itself', function() {
        let result = warmer.initialize();

        expect(result).toEqual(warmer);
    });

    it('should be able to turn on', function() {
        let result = warmer.turnOn();

        expect(result).toEqual(warmer);
    });

    it('should be able to turn off', function() {
        let result = warmer.turnOff();

        expect(result).toEqual(warmer);
    });
});
