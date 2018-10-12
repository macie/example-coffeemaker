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
    this.api.SetWarmerState('ON');

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

/*
    Indicate if pot warmer is empty.

    Returns:
        True if pot warmer is empty; false - otherwise.
*/
Warmer.prototype.isEmpty = function() {
    return this.api.GetWarmerPlateStatus() == 'WARMER_EMPTY';
};

/*
    Indicate if pot warmer has empty pot.

    Returns:
        True if pot warmer has empty pot; false - otherwise.
*/
Warmer.prototype.hasEmptyPot = function() {
    return this.api.GetWarmerPlateStatus() == 'POT_EMPTY';
};

export default Warmer;
