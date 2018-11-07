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
        expect(warmer.signal.potDrained.drop).toHaveBeenCalled();
        expect(warmer.signal.potRemoved.drop).toHaveBeenCalled();
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

    it('should be able to inform about empty pot', () => {
        warmer.isEmpty = jest.fn()
            .mockReturnValue(false);
        warmer.hasEmptyPot = jest.fn()
            .mockReturnValue(true);

        warmer.turnOn();
        jest.advanceTimersByTime(1000);

        expect(warmer.signal.potDrained.emit).toHaveBeenCalled();
    });

    it('should be able to inform about missing pot', () => {
        warmer.isEmpty = jest.fn()
            .mockReturnValue(true);
        warmer.hasEmptyPot = jest.fn()
            .mockReturnValue(false);

        warmer.turnOn();
        jest.advanceTimersByTime(1000);

        expect(warmer.signal.potRemoved.emit).toHaveBeenCalled();
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
});
