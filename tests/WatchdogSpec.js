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

    it('should be able to start', () => {
        watchdog.start();

        expect(setInterval).toHaveBeenCalledWith(
            watchdog.failSafeCheck, watchdog.timeout);
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