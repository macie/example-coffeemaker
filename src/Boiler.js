import LowLevelAPI from './LowLevelAPI';

/*
    A water boiler model.
*/
function Boiler() {
    this.api = new LowLevelAPI();
}

/*
    Reset water boiler model.
    
    Returns:
        Itself.
*/
Boiler.prototype.initialize = function() {
    return this;
};

/*
    Turn on water boiler.

    Boiler in operational mode should have turned on heater and
    closed relief valve.
    
    Returns:
        Itself.
*/
Boiler.prototype.turnOn = function() {
    this.api.SetBoilerState('ON');
    this.api.SetReliefValveState('CLOSED');

    return this;
};

/*
    Turn off water boiler.
    
    Returns:
        Itself.
*/
Boiler.prototype.turnOff = function() {
    this.api.SetBoilerState('OFF');
    this.api.SetReliefValveState('OPEN');

    return this;
};

/*
    Indicate if water boiler is empty.
    
    Returns:
        True if water boiler is empty; false - otherwise.
*/
Boiler.prototype.isEmpty = function() {
    return this.api.GetBoilerStatus() === 'EMPTY';
};

export default Boiler;
