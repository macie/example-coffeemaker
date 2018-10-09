import Warmer from '../src/Warmer';

describe('Warmer', function() {
    let warmer;

    beforeEach(function() {
        let lowLevelAPIFake = {
            SetWarmerState: () => {}
        };
        warmer = new Warmer();
        warmer.api = lowLevelAPIFake;
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
        spyOn(warmer.api, 'SetWarmerState');

        warmer.turnOff();

        expect(warmer.api.SetWarmerState).toHaveBeenCalledWith('OFF');
    });
});
