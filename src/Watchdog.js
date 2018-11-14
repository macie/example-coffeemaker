/*
    A watchdog timer.

    Attributes:
        failSafeCheck: A function with fail-safe action.
        timeout: A watchdog timer interval (in ms). Default: 1 second.
        pid: A watchdog process ID.
*/
function Watchdog() {
    this.failSafeCheck = () => {};
    this.timeout = 1000;
    this.pid;
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
    Start watchdog timer.

    Returns:
        Itself.
*/
Watchdog.prototype.start = function() {
    if (this.pid) {
        this.stop();
    }

    this.pid = setInterval(this.failSafeCheck, this.timeout);

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
