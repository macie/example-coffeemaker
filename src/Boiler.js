/*
    A water boiler model.
*/
function Boiler() {}

/*
    Reset water boiler model.
    
    Returns:
        Itself.
*/
Boiler.prototype.initialize = function() {
    return this;
};

/*
    Turn on water boiler.
    
    Returns:
        Itself.
*/
Boiler.prototype.turnOn = function() {
    return this;
};

/*
    Turn off water boiler.
    
    Returns:
        Itself.
*/
Boiler.prototype.turnOff = function() {
    return this;
};

/*
    Indicate if water boiler is empty.
    
    Returns:
        True if water boiler is empty; false - otherwise.
*/
Boiler.prototype.isEmpty = function() {
    return false;
};

export default Boiler;
