jest.mock('../src/Signal.js');
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
        expect(controlPanel.signal.turnedOn.drop).toHaveBeenCalled();
        expect(controlPanel.signal.turnedOff.drop).toHaveBeenCalled();
    });

    it('should be able to turn on', function() {
        controlPanel.turnOn();

        expect(controlPanel.api.SetIndicatorState).toHaveBeenCalledWith('ON');
    });

    it('should be able to inform about turning on', function() {
        controlPanel.turnOn();

        expect(controlPanel.signal.turnedOn.emit).toHaveBeenCalled();
    });

    it('should be able to turn off', function() {
        controlPanel.lightOff = jest.fn();

        controlPanel.turnOff();

        expect(controlPanel.lightOff).toHaveBeenCalled();
    });

    it('should be able to inform about turning off', function() {
        controlPanel.turnOff();

        expect(controlPanel.signal.turnedOff.emit).toHaveBeenCalled();
    });

    it('should be able to turn off light', function() {
        controlPanel.lightOff();

        expect(controlPanel.api.SetIndicatorState).toHaveBeenCalledWith('OFF');
    });
});
