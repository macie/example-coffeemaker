import Signal from './Signal';
import Watchdog from './Watchdog';
import LowLevelAPI from './LowLevelAPI';

/*
    A pot warmer model.

    Attributes:
        api: An interface of coffee machine low-level API.
        isOn: A boolean indicating if warmer is on.
        overheatingCheckLoop: A watchdog object.
        signal: A dictionary with pot warmer signals.
*/
function Warmer() {
    this.api = new LowLevelAPI();
    this.isOn = false;
    this.overheatingCheckLoop = new Watchdog();
    this.signal = {
        potWasRemoved: new Signal(),
        potWasReturned: new Signal()
    };
}

/*
    Reset pot warmer model.
    
    Warmer in operational mode should have turned on heater when has non-empty
    pot.

    Returns:
        Itself.
*/
Warmer.prototype.initialize = function() {
    this.turnOff();
    for (let name in this.signal) {
        this.signal[name].drop();
    }

    this.overheatingCheckLoop
        .specification(this.hasPotBeenRemoved, () => {
            this.api.SetWarmerState('OFF');
            this.isOn = false;
            this.signal.potWasRemoved.emit();
        })
        .specification(this.hasPotBeenReturned, () => {
            this.api.SetWarmerState('ON');
            this.isOn = true;
            this.signal.potWasReturned.emit();
        })
        .specification(this.hasEmptyPotBeenReturned,
            this.signal.potWasReturned.emit);

    return this;
};

/*
    Turn on pot warmer.

    Returns:
        Itself.
*/
Warmer.prototype.turnOn = function() {
    this.isOn = true;
    this.api.SetWarmerState('ON');

    this.overheatingCheckLoop.start();

    return this;
};

/*
    Turn off pot warmer.

    Pot warmer in idle mode should have turned off heater.

    Returns:
        Itself.
*/
Warmer.prototype.turnOff = function() {
    this.overheatingCheckLoop.stop();

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

/*
    Indicate if empty pot was already returned.

    Returns:
        True if empty pot was already returned; false - otherwise.
*/
Warmer.prototype.hasEmptyPotBeenReturned = function() {
    return !this.isOn && !this.isEmpty() && this.hasEmptyPot();
};

export default Warmer;
