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
