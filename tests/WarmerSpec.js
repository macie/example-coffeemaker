jest.mock('../src/Signal.js');
jest.mock('../src/LowLevelAPI.js');
import Warmer from '../src/Warmer';

jest.useFakeTimers();

describe('Warmer', function() {
    let warmer;

    beforeEach(function() {
        warmer = new Warmer();
    });

    it('should be able to reset itself', function() {
        warmer.turnOff = jest.fn();

        warmer.initialize();

        expect(warmer.turnOff).toHaveBeenCalled();
    });

    it('should be able to turn on', function() {
        warmer.isEmpty = jest.fn().mockReturnValue(false);
        warmer.hasEmptyPot = jest.fn().mockReturnValue(false);

        warmer.turnOn();
        jest.advanceTimersByTime(2000);

        expect(warmer.api.SetWarmerState).toHaveBeenCalledWith('ON');
    });

    it('should protect itself against overheating ', function() {
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

    it('should be able to inform about empty pot', function() {
        warmer.isEmpty = jest.fn()
            .mockReturnValue(false);
        warmer.hasEmptyPot = jest.fn()
            .mockReturnValue(true);

        warmer.turnOn();
        jest.advanceTimersByTime(1000);

        expect(warmer.signal.potDrained.emit).toHaveBeenCalled();
    });

    it('should be able to turn off', function() {
        warmer.turnOff();

        expect(warmer.api.SetWarmerState).toHaveBeenCalledWith('OFF');
    });

    describe('should indicate if pot warmer', function() {
        it('is empty', function() {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('WARMER_EMPTY');

            let result = warmer.isEmpty();

            expect(result).toBeTruthy();
        });

        it('is not empty', function() {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_EMPTY');

            let result = warmer.isEmpty();

            expect(result).toBeFalsy();
        });
    });

    describe('should indicate if pot warmer', function() {
        it('has filled pot', function() {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_NOT_EMPTY');

            let result = warmer.hasEmptyPot();

            expect(result).toBeFalsy();
        });

        it('has empty pot', function() {
            warmer.api.GetWarmerPlateStatus.mockReturnValue('POT_EMPTY');

            let result = warmer.hasEmptyPot();

            expect(result).toBeTruthy();
        });
    });
});
