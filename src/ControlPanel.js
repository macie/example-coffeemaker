import Signal from './Signal';
import LowLevelAPI from './LowLevelAPI';

/*
    A control panel model.

    Attributes:
        api: An interface of coffee machine low-level API.
        signal: A dictionary with control panel signals.
*/
function ControlPanel() {
    this.api = new LowLevelAPI();
    this.signal = {
        startBrewing: new Signal(),
        stopBrewing: new Signal()
    };
}

/*
    Reset control panel object.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.initialize = function() {
    this.lightOff();
    this.signal.startBrewing.drop();
    this.signal.stopBrewing.drop();

    return this;
};

/*
    Turn on brew process.

    Brew indicator should be turn on.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.turnOn = function() {
    this.api.SetIndicatorState('ON');
    this.signal.startBrewing.emit();

    return this;
};

/*
    Turn off brew process.

    Brew indicator should be turn off.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.turnOff = function() {
    this.lightOff();
    this.signal.stopBrewing.emit();

    return this;
};

/*
    Turn off brew indicator light.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.lightOff = function() {
    this.api.SetIndicatorState('OFF');

    return this;
};

export default ControlPanel;
