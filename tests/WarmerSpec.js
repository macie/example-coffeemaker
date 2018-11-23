jest.mock('../src/Signal.js');
jest.mock('../src/LowLevelAPI.js');
import Warmer from '../src/Warmer';

jest.useFakeTimers();

describe('Warmer', () => {
    let warmer;

    beforeEach(() => {
        warmer = new Warmer();
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

    it('should protect itself against overheating ', () => {
        warmer.isEmpty = jest.fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true)
            .mockReturnValueOnce(false)
            .mockReturnValue(true);

        warmer.hasEmptyPot = jest.fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true)
            .mockReturnValue(true);

        warmer.turnOn();
        jest.advanceTimersByTime(10000);

        expect(warmer.api.SetWarmerState).toHaveBeenCalledWith('OFF');
    });

    it('should maintain only one overheating check', () => {
        warmer.turnOff = jest.fn(warmer.turnOff);
        warmer.isEmpty = jest.fn().mockReturnValue(false);
        warmer.hasEmptyPot = jest.fn().mockReturnValue(false);
        warmer.turnOn();

        warmer.turnOn();
        jest.advanceTimersByTime(10000);

        expect(warmer.turnOff).toHaveBeenCalledTimes(1);
    });

    it('should be able to inform about removed pot', () => {
        warmer.isEmpty = jest.fn()
            .mockReturnValueOnce(false)
            .mockReturnValue(true);
        warmer.hasEmptyPot = jest.fn()
            .mockReturnValue(false);

        warmer.turnOn();
        jest.advanceTimersByTime(5000);

        expect(warmer.signal.potWasRemoved.emit).toHaveBeenCalledTimes(1);
        expect(warmer.isEmpty).toHaveBeenCalledTimes(5);
    });

    it('should be able to inform about returned pot', () => {
        warmer.isEmpty = jest.fn()
            .mockReturnValueOnce(true)
            .mockReturnValue(false);
        warmer.hasEmptyPot = jest.fn()
            .mockReturnValueOnce(false)
            .mockReturnValueOnce(true)
            .mockReturnValue(false);

        warmer.turnOn();
        jest.advanceTimersByTime(5000);

        expect(warmer.signal.potWasReturned.emit).toHaveBeenCalledTimes(1);
        expect(warmer.isEmpty).toHaveBeenCalledTimes(5);
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
