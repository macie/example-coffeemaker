import Signal from '../src/Signal';

describe('Signal', () => {
    let signal;

    beforeEach(() => {
        signal = new Signal();
    });

    it('should be able to register one receiver', () => {
        let emptyAction = () => {};

        signal.receiveWith(emptyAction);

        expect(signal.receivers.size).toEqual(1);
    });

    it('should be able to register many receivers', () => {
        let emptyAction = () => {};
        let someAction = () => {return 1;};

        signal.receiveWith(emptyAction, someAction);

        expect(signal.receivers.size).toEqual(2);
    });

    it('should ignore registering duplicated receivers', () => {
        let emptyAction = () => {};
        let someAction = () => {return 1;};

        signal.receiveWith(emptyAction, someAction, emptyAction);

        expect(signal.receivers.size).toEqual(2);
    });

    it('should be able to disconnect all receivers', () => {
        let emptyAction = () => {};
        signal.receivers.add(emptyAction);

        signal.drop();

        expect(signal.receivers.size).toEqual(0);
    });

    it('should be able to emit signals', () => {
        let callTracker = '';
        let someAction = () => {callTracker += 'x';};
        let anotherAction = () => {callTracker += 'y';};
        signal.receiveWith(someAction, anotherAction);

        signal.emit();

        expect(callTracker).toEqual('xy');
    });
});
