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

    it('should be able to power off', function() {
        let result = coffeeMaker.powerOff();

        expect(result).toEqual(coffeeMaker);
    });
});
