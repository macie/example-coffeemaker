/*
    A watchdog timer.

    Attributes:
        timeout: A watchdog timer interval (in ms).
        pid: A watchdog process ID.
*/
function Watchdog() {
    this.timeout;
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
    Disable watchdog timer.

    Returns:
        Itself.
*/
Watchdog.prototype.disable = function() {
    clearInterval(this.pid);
    this.pid = null;

    return this;
};

export default Watchdog;
