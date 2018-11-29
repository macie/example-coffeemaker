/*
    A watchdog timer.

    Attributes:
        timeout: A watchdog timer interval (in ms). Default: 1 second.
        pid: A watchdog process ID.
        rules: A collection of tests and actions.
*/
function Watchdog() {
    this.timeout = 1000;
    this.pid;
    this.rules = new Map();
}

/*
    Set watchdog timer interval.

    Args:
        interval: A watchdog timer interval (in ms).

    Returns:
        Itself.
*/
Watchdog.prototype.timerInterval = function(interval) {
    this.timeout = interval;

    return this;
};

/*
    Add watchdog specification.

    Args:
        test: A function with test definition.
        action: A function with action definition.

    Returns:
        Itself.
*/
Watchdog.prototype.specification = function(test, action) {
    this.rules.set(test, action);

    return this;
};

/*
    Check specifications;

    Returns:
        Itself.
*/
Watchdog.prototype.failSafeCheck = function() {
    for (var [test, action] of this.rules) {
        if (test()) {
            action();
            return this;
        }
    }

    return this;
};

/*
    Start watchdog timer.

    Returns:
        Itself.
*/
Watchdog.prototype.start = function() {
    if (this.pid) {
        this.stop();
    }

    this.pid = setInterval(this.failSafeCheck.bind(this), this.timeout);

    return this;
};

/*
    Stop watchdog timer.

    Returns:
        Itself.
*/
Watchdog.prototype.stop = function() {
    clearInterval(this.pid);
    this.pid = null;

    return this;
};

export default Watchdog;
