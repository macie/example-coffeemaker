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
        it('should be able to evaluate callback', () => {
            const test = () => true;
            const action = jest.fn();
            watchdog.specification(test, action);

            watchdog.failSafeCheck();

            expect(action).toHaveBeenCalled();
        });

        it('should evaluate callbacks in queue', () => {
            const test1 = () => true;
            const action1 = jest.fn();
            const test2 = () => false;
            const action2 = jest.fn();
            const test3 = () => true;
            const action3 = jest.fn();
            watchdog
                .specification(test1, action1)
                .specification(test2, action2)
                .specification(test3, action3);

            watchdog.failSafeCheck();

            expect(action1).toHaveBeenCalled();
            expect(action2).not.toHaveBeenCalled();
            expect(action3).not.toHaveBeenCalled();
        });

        it('should not evaluate callbacks when test is not fulfilled', () => {
            const test = () => false;
            const action = jest.fn();
            watchdog.specification(test, action);

            watchdog.failSafeCheck();

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
