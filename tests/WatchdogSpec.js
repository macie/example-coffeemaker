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

    it('should be able to start itself', () => {
        watchdog.start();

        expect(setInterval).toHaveBeenCalledWith(
            watchdog.failSafeCheck, watchdog.timeout);
    });

    it('should be able to disable itself', () => {
        const processId = 123;
        watchdog.pid = processId;

        watchdog.disable();

        expect(clearInterval).toHaveBeenCalledWith(processId);
        expect(watchdog.pid).toBeNull();
    });
});
