/*
    Emit and dispatch signals (events).

    Attributes:
        receivers: A collection of unique signal receivers.
*/
function Signal() {
    this.receivers = new Set();
}

/*
    Emit signal to all receivers.

    Returns:
        Itself.
*/
Signal.prototype.emit = function() {
    for (var targetAction of this.receivers) {
        targetAction();
    }

    return this;
};

/*
    Subscribe to all future signal emissions.

    Args:
        receivers: A list of functions.

    Returns:
        Itself.
*/
Signal.prototype.receiveWith = function(...receivers) {
    for (var targetAction of receivers) {
        this.receivers.add(targetAction);
    }

    return this;
};

/*
    Remove all signal receivers.

    Returns:
        Itself.
*/
Signal.prototype.drop = function() {
    this.receivers = new Set();

    return this;
};

export default Signal;
