import Signal from './Signal';
import LowLevelAPI from './LowLevelAPI';

/*
    A pot warmer model.

    Attributes:
        api: An interface of coffee machine low-level API.
        isOn: A boolean indicating if warmer is on.
        overheatingCheckLoop: An ID of currently running check loop.
        signal: A dictionary with pot warmer signals.
*/
function Warmer() {
    this.api = new LowLevelAPI();
    this.isOn = false;
    this.overheatingCheckLoop;
    this.signal = {
        potWasRemoved: new Signal(),
        potWasReturned: new Signal()
    };
}

/*
    Reset pot warmer model.
    
    Returns:
        Itself.
*/
Warmer.prototype.initialize = function() {
    this.turnOff();
    for (let name in this.signal) {
        this.signal[name].drop();
    }

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

    if (this.overheatingCheckLoop) {
        this.turnOff();
    }

    this.overheatingCheckLoop = setInterval(() => {
        const isEmpty = this.isEmpty();
        const isOn = !this.hasEmptyPot() && !isEmpty;  // beware: order matters (short-circuit evaluation)
        const stateChanged = (this.isOn !== isOn);

        if (stateChanged) {
            this.api.SetWarmerState(isOn ? 'ON' : 'OFF');

            if (isEmpty) {
                this.signal.potWasRemoved.emit();
            } else {
                this.signal.potWasReturned.emit();
            }
        }

        this.isOn = isOn;
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

    this.isOn = false;
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

/*
    Indicate if pot was already removed.

    Returns:
        True if pot was already removed; false - otherwise.
*/
Warmer.prototype.hasPotBeenRemoved = function() {
    return this.isOn && this.isEmpty();
};

/*
    Indicate if non-empty pot was already returned.

    Returns:
        True if non-empty pot was already returned; false - otherwise.
*/
Warmer.prototype.hasPotBeenReturned = function() {
    return !this.isOn && !this.isEmpty() && !this.hasEmptyPot();
};

export default Warmer;
