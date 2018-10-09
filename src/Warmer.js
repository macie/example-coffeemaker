import LowLevelAPI from './LowLevelAPI';

/*
    A pot warmer model.
*/
function Warmer() {
    this.api = new LowLevelAPI();
}

/*
    Reset pot warmer model.
    
    Returns:
        Itself.
*/
Warmer.prototype.initialize = function() {
    return this;
};

/*
    Turn on pot warmer.

    Returns:
        Itself.
*/
Warmer.prototype.turnOn = function() {
    return this;
};

/*
    Turn off pot warmer.

    Pot warmer in idle mode should have turned off heater.

    Returns:
        Itself.
*/
Warmer.prototype.turnOff = function() {
    this.api.SetWarmerState('OFF');

    return this;
};

export default Warmer;
