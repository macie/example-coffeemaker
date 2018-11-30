import Watchdog from '../src/Watchdog';

jest.useFakeTimers();

describe('Watchdog', () => {
    let watchdog;

    beforeEach(() => {
        watchdog = new Watchdog();
    });

    it('should be able to set timeout', () => {
        const time = 1410;

        watchdog.timerInterval(time);

        expect(watchdog.timeout).toEqual(time);
    });

    it('should be able to add specification', () => {
        const test = () => {true;};
        const action = () => {};

        watchdog.specification(test, action);

        expect(watchdog.rules.size).toEqual(1);
    });

    describe('for rules', () => {
        it('should be able to evaluate callbacks', () => {
            const test = () => true;
            const action = jest.fn();
            watchdog.specification(test, action);

            watchdog.failSafeCheck(test, action);

            expect(action).toHaveBeenCalled();
        });

        it('should not evaluate callbacks when test is not fulfilled', () => {
            const test = () => false;
            const action = jest.fn();
            watchdog.specification(test, action);

            watchdog.failSafeCheck(test, action);

            expect(action).not.toHaveBeenCalled();
        });
    });

    it('should be able to start', () => {
        watchdog.start();

        expect(setInterval).toHaveBeenCalledWith(
            expect.any(Function), watchdog.timeout);
    });

    it('should maintain only one check loop', () => {
        watchdog.failSafeCheck = jest.fn();
        watchdog.start();

        watchdog.start();
        jest.advanceTimersByTime(3000);

        expect(watchdog.failSafeCheck).toHaveBeenCalledTimes(3);
    });

    it('should be able to stop', () => {
        const processId = 123;
        watchdog.pid = processId;

        watchdog.stop();

        expect(clearInterval).toHaveBeenCalledWith(processId);
        expect(watchdog.pid).toBeNull();
    });
});
