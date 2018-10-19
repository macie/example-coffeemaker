import Signal from './Signal';
import LowLevelAPI from './LowLevelAPI';

/*
    A water boiler model.

    Attributes:
        api: An interface of coffee machine low-level API.
        overheatingCheckLoop: An ID of currently running check loop.
        signal: A dictionary with boiler signals.
*/
function Boiler() {
    this.api = new LowLevelAPI();
    this.overheatingCheckLoop;
    this.signal = {
        drained: new Signal()
    };
}

/*
    Reset water boiler model.
    
    Returns:
        Itself.
*/
Boiler.prototype.initialize = function() {
    this.turnOff();

    return this;
};

/*
    Turn on water boiler.

    Boiler in operational mode should:
     - have turned on heater and closed relief valve,
     - protect itself against overheating,
     - inform when it has no more water.
    
    Returns:
        Itself.
*/
Boiler.prototype.turnOn = function() {
    const REFRESH_RATE = 1000;  // in ms

    this.api.SetBoilerState('ON');
    this.api.SetReliefValveState('CLOSED');

    this.overheatingCheckLoop = setInterval(() => {
        if (this.isEmpty()) {
            this.turnOff();
            this.signal.drained.emit();
        }
    }, REFRESH_RATE);

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
    clearInterval(this.overheatingCheckLoop);
    this.overheatingCheckLoop = null;

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
