jest.mock('../src/Signal.js');
jest.mock('../src/LowLevelAPI.js');
import ControlPanel from '../src/ControlPanel';

describe('Control panel', () => {
    let controlPanel;

    beforeEach(() => {
        controlPanel = new ControlPanel();
    });

    it('should be able to reset itself', () => {
        controlPanel.lightOff = jest.fn();

        controlPanel.initialize();

        expect(controlPanel.lightOff).toHaveBeenCalled();
        expect(controlPanel.signal.turnedOn.drop).toHaveBeenCalled();
        expect(controlPanel.signal.turnedOff.drop).toHaveBeenCalled();
    });

    it('should be able to turn on', () => {
        controlPanel.turnOn();

        expect(controlPanel.api.SetIndicatorState).toHaveBeenCalledWith('ON');
    });

    it('should be able to inform about turning on', () => {
        controlPanel.turnOn();

        expect(controlPanel.signal.turnedOn.emit).toHaveBeenCalled();
    });

    it('should be able to turn off', () => {
        controlPanel.lightOff = jest.fn();

        controlPanel.turnOff();

        expect(controlPanel.lightOff).toHaveBeenCalled();
    });

    it('should be able to inform about turning off', () => {
        controlPanel.turnOff();

        expect(controlPanel.signal.turnedOff.emit).toHaveBeenCalled();
    });

    it('should be able to turn off light', () => {
        controlPanel.lightOff();

        expect(controlPanel.api.SetIndicatorState).toHaveBeenCalledWith('OFF');
    });
});
