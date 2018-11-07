import CoffeeMaker from '../src/CoffeeMaker';

describe('CoffeeMaker', () => {
    let coffeeMaker;

    beforeEach(() => {
        coffeeMaker = new CoffeeMaker();
        coffeeMaker.controlPanel.initialize = jest.fn();
        coffeeMaker.controlPanel.turnOff = jest.fn();
        coffeeMaker.boiler.initialize = jest.fn();
        coffeeMaker.boiler.turnOn = jest.fn();
        coffeeMaker.boiler.turnOff = jest.fn();
        coffeeMaker.warmer.initialize = jest.fn();
        coffeeMaker.warmer.turnOn = jest.fn();
        coffeeMaker.warmer.turnOff = jest.fn();
    });

    describe('while power on should initialize', () => {
        it('control panel', () => {
            coffeeMaker.powerOn();

            expect(coffeeMaker.controlPanel.initialize).toHaveBeenCalledTimes(1);
        });

        it('water boiler', () => {
            coffeeMaker.powerOn();

            expect(coffeeMaker.boiler.initialize).toHaveBeenCalledTimes(1);
        });

        it('pot warmer', () => {
            coffeeMaker.powerOn();

            expect(coffeeMaker.warmer.initialize).toHaveBeenCalledTimes(1);
        });
    });

    describe('while power off should turn off', () => {
        it('control panel', () => {
            coffeeMaker.powerOff();

            expect(coffeeMaker.controlPanel.turnOff).toHaveBeenCalledTimes(1);
        });

        it('water boiler', () => {
            coffeeMaker.powerOff();

            expect(coffeeMaker.boiler.turnOff).toHaveBeenCalledTimes(1);
        });

        it('pot warmer', () => {
            coffeeMaker.powerOff();

            expect(coffeeMaker.warmer.turnOff).toHaveBeenCalledTimes(1);
        });
    });

    describe('after receive signal', () => {
        describe('turnedOn - should turn on', () => {
            it('boiler', () => {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOn.emit();

                expect(coffeeMaker.boiler.turnOn).toHaveBeenCalledTimes(1);
            });

            it('warmer', () => {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOn.emit();

                expect(coffeeMaker.warmer.turnOn).toHaveBeenCalledTimes(1);
            });
        });

        describe('turnedOff - should turn off', () => {
            it('boiler', () => {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOff.emit();

                expect(coffeeMaker.boiler.turnOff).toHaveBeenCalledTimes(1);
            });

            it('warmer', () => {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOff.emit();

                expect(coffeeMaker.warmer.turnOff).toHaveBeenCalledTimes(1);
            });
        });

        it('potRemoved - should turn off boiler', () => {
            coffeeMaker.powerOn();

            coffeeMaker.warmer.signal.potRemoved.emit();

            expect(coffeeMaker.boiler.turnOff).toHaveBeenCalledTimes(1);
        });
    });
});
