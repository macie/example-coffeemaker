import LowLevelAPI from './LowLevelAPI';

/*
    A control panel model.

    Attributes:
        api: An interface of coffee machine low-level API.
*/
function ControlPanel() {
    this.api = new LowLevelAPI();
}

/*
    Reset control panel object.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.initialize = function() {
    this.turnOff();

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
