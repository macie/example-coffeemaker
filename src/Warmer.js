import LowLevelAPI from './LowLevelAPI';

/*
    A pot warmer model.

    Attributes:
        api: An interface of coffee machine low-level API.
        overheatingCheckLoop: An ID of currently running check loop.
*/
function Warmer() {
    this.api = new LowLevelAPI();
    this.overheatingCheckLoop;
}

/*
    Reset pot warmer model.
    
    Returns:
        Itself.
*/
Warmer.prototype.initialize = function() {
    this.turnOff();

    return this;
};

/*
    Turn on pot warmer.

    Warmer in operational mode should have turned on heater when has non-empty
    pot.

    Returns:
        Itself.
*/
Warmer.prototype.turnOn = function() {
    const REFRESH_RATE = 1000;  // in ms

    this.overheatingCheckLoop = setInterval(() => {
        if (this.isEmpty() || this.hasEmptyPot()) {
            this.api.SetWarmerState('OFF');
        } else {
            this.api.SetWarmerState('ON');
        }
    }, REFRESH_RATE);

    return this;
};

/*
    Turn off pot warmer.

    Pot warmer in idle mode should have turned off heater.

    Returns:
        Itself.
*/
Warmer.prototype.turnOff = function() {
    clearInterval(this.overheatingCheckLoop);
    this.overheatingCheckLoop = null;

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
