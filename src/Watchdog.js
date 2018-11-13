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

export default Watchdog;
