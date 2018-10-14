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
    return this;
};

/*
    Press button on.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.turnOn = function () {
    return this;
};

/*
    Press button off.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.turnOff = function () {
    return this;
};

/*
    Light indicator off.
    
    Returns:
        Itself.
*/
ControlPanel.prototype.lightOff = function () {
    return this;
};

export default ControlPanel;
