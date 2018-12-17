jest.mock('../src/Signal.js');
jest.mock('../src/Watchdog.js');
jest.mock('../src/LowLevelAPI.js');
import Warmer from '../src/Warmer';

jest.useFakeTimers();

describe('Warmer', () => {
    let warmer;

    beforeEach(() => {
        warmer = new Warmer();
        warmer.overheatingCheckLoop.specification
            .mockReturnValue(warmer.overheatingCheckLoop);
    });

    it('should be able to reset itself', () => {
        warmer.turnOff = jest.fn();

        warmer.initialize();

        expect(warmer.turnOff).toHaveBeenCalled();
        expect(warmer.signal.potWasRemoved.drop).toHaveBeenCalled();
        expect(warmer.signal.potWasReturned.drop).toHaveBeenCalled();
    });

    it('should be able to turn on', () => {
        warmer.isEmpty = jest.fn().mockReturnValue(false);
        warmer.hasEmptyPot = jest.fn().mockReturnValue(false);

        warmer.turnOn();
        jest.advanceTimersByTime(2000);

        expect(warmer.api.SetWarmerState).toHaveBeenCalledWith('ON');
    });

    it('should be able to inform about removed pot', () => {
        warmer.hasPotBeenRemoved = jest.fn();
        warmer.signal.potWasReturned.emit = jest.fn();

        warmer.initialize();

        expect(warmer.overheatingCheckLoop.specification)
            .toHaveBeenCalledWith(warmer.hasPotBeenRemoved, expect.anything());
    });

    it('should be able to inform about returned empty pot', () => {
        warmer.hasEmptyPotBeenReturned = jest.fn();
        warmer.signal.potWasReturned.emit = jest.fn();

        warmer.initialize();

        expect(warmer.overheatingCheckLoop.specification)
            .toHaveBeenCalledWith(warmer.hasEmptyPotBeenReturned,
                warmer.signal.potWasReturned.emit);
    });

    it('should be able to inform about returned pot', () => {
        warmer.hasPotBeenReturned = jest.fn();

        warmer.initialize();

        expect(warmer.overheatingCheckLoop.specification)
            .toHaveBeenCalledWith(warmer.hasPotBeenReturned,
                expect.anything());
    });

    it('should be able to turn off', () => {
        warmer.turnOff();

        expect(warmer.api.SetWarmerState).toHaveBeenCalledWith('OFF');
    });

    describe('should indicate if pot warmer', () => {
        it('is empty', () => {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('WARMER_EMPTY');

            let result = warmer.isEmpty();

            expect(result).toBeTruthy();
        });

        it('is not empty', () => {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_EMPTY');

            let result = warmer.isEmpty();

            expect(result).toBeFalsy();
        });
    });

    describe('should indicate if pot warmer', () => {
        it('is on', () => {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_NOT_EMPTY');
            warmer.turnOn();
            jest.advanceTimersByTime(1000);

            let result = warmer.isOn;

            expect(result).toBeTruthy();
        });

        it('has filled pot', () => {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_NOT_EMPTY');

            let result = warmer.hasEmptyPot();

            expect(result).toBeFalsy();
        });

        it('has empty pot', () => {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_EMPTY');

            let result = warmer.hasEmptyPot();

            expect(result).toBeTruthy();
        });
    });

    describe('should indicate if', () => {
        it('pot was already removed', () => {
            warmer.isOn = true;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('WARMER_EMPTY');

            let result = warmer.hasPotBeenRemoved();

            expect(result).toBeTruthy();
        });

        it('pot was not already removed', () => {
            warmer.isOn = false;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('WARMER_EMPTY');

            let result = warmer.hasPotBeenRemoved();

            expect(result).toBeFalsy();
        });

        it('non-empty pot was already returned', () => {
            warmer.isOn = false;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_NOT_EMPTY');

            let result = warmer.hasPotBeenReturned();

            expect(result).toBeTruthy();
        });

        it('non-empty pot was not already returned', () => {
            warmer.isOn = false;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_EMPTY');

            let result = warmer.hasPotBeenReturned();

            expect(result).toBeFalsy();
        });

        it('non-empty pot was not already returned', () => {
            warmer.isOn = true;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_NOT_EMPTY');

            let result = warmer.hasPotBeenReturned();

            expect(result).toBeFalsy();
        });

        it('empty pot was already returned', () => {
            warmer.isOn = false;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_EMPTY');

            let result = warmer.hasEmptyPotBeenReturned();

            expect(result).toBeTruthy();
        });

        it('not empty pot was already returned', () => {
            warmer.isOn = false;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_NOT_EMPTY');

            let result = warmer.hasEmptyPotBeenReturned();

            expect(result).toBeFalsy();
        });

        it('empty pot was not already returned', () => {
            warmer.isOn = true;
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_EMPTY');

            let result = warmer.hasEmptyPotBeenReturned();

            expect(result).toBeFalsy();
        });
    });
});
