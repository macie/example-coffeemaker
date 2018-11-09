import Signal from './Signal';
import LowLevelAPI from './LowLevelAPI';

/*
    A pot warmer model.

    Attributes:
        api: An interface of coffee machine low-level API.
        overheatingCheckLoop: An ID of currently running check loop.
        signal: A dictionary with pot warmer signals.
*/
function Warmer() {
    this.api = new LowLevelAPI();
    this.overheatingCheckLoop;
    this.signal = {
        potRemoved: new Signal(),
        potReturned: new Signal()
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
    let wasOn = false;

    if (this.overheatingCheckLoop) {
        this.turnOff();
    }

    this.overheatingCheckLoop = setInterval(() => {
        const isEmpty = this.isEmpty();
        const isOn = !this.hasEmptyPot() && !isEmpty;  // beware: order matters (short-circuit evaluation)
        const stateChanged = (wasOn !== isOn);

        if (stateChanged) {
            this.api.SetWarmerState(isOn ? 'ON' : 'OFF');

            if (isEmpty) {
                this.signal.potRemoved.emit();
            } else {
                this.signal.potReturned.emit();
            }
        }

        wasOn = isOn;
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
