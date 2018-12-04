import Watchdog from './Watchdog';
import LowLevelAPI from './LowLevelAPI';

/*
    A water boiler model.

    Attributes:
        api: An interface of coffee machine low-level API.
        overheatingCheckLoop: An ID of currently running check loop.
*/
function Boiler() {
    this.api = new LowLevelAPI();
    this.overheatingCheckLoop = new Watchdog();
}

/*
    Reset water boiler model.
    
    Returns:
        Itself.
*/
Boiler.prototype.initialize = function() {
    this.turnOff();

    this.overheatingCheckLoop
        .specification(this.isEmpty, this.turnOff);

    return this;
};

/*
    Turn on water boiler.

    Boiler in operational mode should:
     - have turned on heater and closed relief valve,
     - protect itself against overheating.
    
    Returns:
        Itself.
*/
Boiler.prototype.turnOn = function() {
    this.api.SetBoilerState('ON');
    this.api.SetReliefValveState('CLOSED');

    this.overheatingCheckLoop.start();

    return this;
};

/*
    Turn off water boiler.
    
    Boiler in idle mode should have turned off heater and
    opened relief valve.

    Returns:
        Itself.
*/
Boiler.prototype.turnOff = function() {
    this.overheatingCheckLoop.stop();

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
