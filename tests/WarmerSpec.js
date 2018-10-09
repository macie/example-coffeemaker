import Warmer from '../src/Warmer';

describe('Warmer', function() {
    let warmer;

    beforeEach(function() {
        let lowLevelAPIFake = {
            GetWarmerPlateStatus: () => {},
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

    describe('should indicate if pot warmer', function() {
        it('is empty', function() {
            warmer.api.GetWarmerPlateStatus = () => {return 'WARMER_EMPTY';};

            let result = warmer.isEmpty();

            expect(result).toBeTruthy();
        });

        it('is not empty', function() {
            warmer.api.GetWarmerPlateStatus = () => {return 'POT_EMPTY';};

            let result = warmer.isEmpty();

            expect(result).toBeFalsy();
        });
    });

    describe('should indicate if pot warmer', function() {
        it('has filled pot', function() {
            warmer.api.GetWarmerPlateStatus = () => {return 'POT_NOT_EMPTY';};

            let result = warmer.hasEmptyPot();

            expect(result).toBeFalsy();
        });

        it('has empty pot', function() {
            warmer.api.GetWarmerPlateStatus = () => {return 'POT_EMPTY';};

            let result = warmer.hasEmptyPot();

            expect(result).toBeTruthy();
        });
    });
});
