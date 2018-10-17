jest.mock('../src/ControlPanel.js');
jest.mock('../src/Boiler.js');
jest.mock('../src/Warmer.js');
import CoffeeMaker from '../src/CoffeeMaker';

describe('CoffeeMaker', function() {
    let coffeeMaker;

    beforeEach(function() {
        coffeeMaker = new CoffeeMaker();
    });

    it('should be able to power on', function() {
        let result = coffeeMaker.powerOn();

        expect(result).toEqual(coffeeMaker);
    });

    it('should be able to power off', function() {
        let result = coffeeMaker.powerOff();

        expect(result).toEqual(coffeeMaker);
    });
});
