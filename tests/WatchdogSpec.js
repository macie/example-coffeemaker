import Watchdog from '../src/Watchdog';

jest.useFakeTimers();

describe('Watchdog', () => {
    let watchdog;

    beforeEach(() => {
        watchdog = new Watchdog();
    });

    it('should be able to disable itself', () => {
        const processId = 123;
        watchdog.pid = processId;

        watchdog.disable();

        expect(clearInterval).toHaveBeenCalledWith(processId);
        expect(watchdog.pid).toBeNull();
    });
});
