jest.mock('../src/LowLevelAPI.js');
import ControlPanel from '../src/ControlPanel';

describe('Control panel', function() {
    let controlPanel;

    beforeEach(function() {
        controlPanel = new ControlPanel();
    });

    it('should be able to reset itself', function() {
        let result = controlPanel.initialize();

        expect(result).toEqual(controlPanel);
    });

    it('should be able to turn on', function() {
        let result = controlPanel.turnOn();

        expect(result).toEqual(controlPanel);
    });

    it('should be able to turn off', function() {
        controlPanel.lightOff = jest.fn();

        controlPanel.turnOff();

        expect(controlPanel.lightOff).toHaveBeenCalled();
    });

    it('should be able to turn off light', function() {
        controlPanel.lightOff();

        expect(controlPanel.api.SetIndicatorState).toHaveBeenCalledWith('OFF');
    });
});
