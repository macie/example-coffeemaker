jest.mock('../src/ControlPanel.js');
jest.mock('../src/Boiler.js');
jest.mock('../src/Warmer.js');
import CoffeeMaker from '../src/CoffeeMaker';

describe('CoffeeMaker', function() {
    let coffeeMaker;

    beforeEach(function() {
        coffeeMaker = new CoffeeMaker();
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
});
