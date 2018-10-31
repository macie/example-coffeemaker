import CoffeeMaker from '../src/CoffeeMaker';

describe('CoffeeMaker', function() {
    let coffeeMaker;

    beforeEach(function() {
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

    describe('while power on should initialize', function() {
        it('control panel', function() {
            coffeeMaker.powerOn();

            expect(coffeeMaker.controlPanel.initialize).toHaveBeenCalledTimes(1);
        });

        it('water boiler', function() {
            coffeeMaker.powerOn();

            expect(coffeeMaker.boiler.initialize).toHaveBeenCalledTimes(1);
        });

        it('pot warmer', function() {
            coffeeMaker.powerOn();

            expect(coffeeMaker.warmer.initialize).toHaveBeenCalledTimes(1);
        });
    });

    describe('while power off should turn off', function() {
        it('control panel', function() {
            coffeeMaker.powerOff();

            expect(coffeeMaker.controlPanel.turnOff).toHaveBeenCalledTimes(1);
        });

        it('water boiler', function() {
            coffeeMaker.powerOff();

            expect(coffeeMaker.boiler.turnOff).toHaveBeenCalledTimes(1);
        });

        it('pot warmer', function() {
            coffeeMaker.powerOff();

            expect(coffeeMaker.warmer.turnOff).toHaveBeenCalledTimes(1);
        });
    });

    describe('after receive signal', function() {
        describe('turnedOn - should turn on', function() {
            it('boiler', function() {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOn.emit();

                expect(coffeeMaker.boiler.turnOn).toHaveBeenCalledTimes(1);
            });

            it('warmer', function() {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOn.emit();

                expect(coffeeMaker.warmer.turnOn).toHaveBeenCalledTimes(1);
            });
        });

        describe('turnedOff - should turn off', function() {
            it('boiler', function() {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOff.emit();

                expect(coffeeMaker.boiler.turnOff).toHaveBeenCalledTimes(1);
            });

            it('warmer', function() {
                coffeeMaker.powerOn();

                coffeeMaker.controlPanel.signal.turnedOff.emit();

                expect(coffeeMaker.warmer.turnOff).toHaveBeenCalledTimes(1);
            });
        });

        it('missingPot - should turn off boiler', function() {
            coffeeMaker.powerOn();

            coffeeMaker.warmer.signal.missingPot.emit();

            expect(coffeeMaker.boiler.turnOff).toHaveBeenCalledTimes(1);
        });
    });
});
