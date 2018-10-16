jest.mock('../src/LowLevelAPI.js');
import ControlPanel from '../src/ControlPanel';

describe('Control panel', function() {
    let controlPanel;

    beforeEach(function() {
        controlPanel = new ControlPanel();
    });

    it('should be able to reset itself', function() {
        controlPanel.lightOff = jest.fn();

        controlPanel.initialize();

        expect(controlPanel.lightOff).toHaveBeenCalled();
    });

    it('should be able to turn on', function() {
        controlPanel.turnOn();

        expect(controlPanel.api.SetIndicatorState).toHaveBeenCalledWith('ON');
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
