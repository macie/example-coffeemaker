import CoffeeMaker from '../src/CoffeeMaker';

describe('CoffeeMaker', function() {
    let coffeeMaker;

    beforeEach(function() {
        coffeeMaker = new CoffeeMaker();
        coffeeMaker.controlPanel.initialize = jest.fn();
        coffeeMaker.controlPanel.turnOff = jest.fn();
        coffeeMaker.boiler.initialize = jest.fn();
        coffeeMaker.boiler.turnOff = jest.fn();
        coffeeMaker.warmer.initialize = jest.fn();
        coffeeMaker.warmer.turnOff = jest.fn();
    });

    describe('while power on should initialize', function() {
        it('control panel', function() {
            coffeeMaker.powerOn();

            expect(coffeeMaker.controlPanel.initialize).toHaveBeenCalled();
        });

        it('water boiler', function() {
            coffeeMaker.powerOn();

            expect(coffeeMaker.boiler.initialize).toHaveBeenCalled();
        });

        it('pot warmer', function() {
            coffeeMaker.powerOn();

            expect(coffeeMaker.warmer.initialize).toHaveBeenCalled();
        });
    });

    describe('while power off should turn off', function() {
        it('control panel', function() {
            coffeeMaker.powerOff();

            expect(coffeeMaker.controlPanel.turnOff).toHaveBeenCalled();
        });

        it('water boiler', function() {
            coffeeMaker.powerOff();

            expect(coffeeMaker.boiler.turnOff).toHaveBeenCalled();
        });

        it('pot warmer', function() {
            coffeeMaker.powerOff();

            expect(coffeeMaker.warmer.turnOff).toHaveBeenCalled();
        });
    });

    describe('while receive signal', function() {
        it('turned off should turned off boiler and warmer', function() {
            coffeeMaker.powerOn();

            coffeeMaker.controlPanel.signal.turnedOff.emit();

            expect(coffeeMaker.boiler.turnOff).toHaveBeenCalled();
            expect(coffeeMaker.warmer.turnOff).toHaveBeenCalled();
        });
    });
});
