/*
    Low-level coffee machine API.

    Based on Listing 20-1 from book:
        Martin, Robert C., and Micah Martin. Agile principles, patterns, and practices in C. Upper Saddle River, NJ: Prentice Hall, 2007. Print.
*/
function LowLevelAPI() {}

/*
    "This function returns the status of the warmer-plate
    sensor. This sensor detects the presence of the pot
    and whether it has coffee in it."
*/
LowLevelAPI.prototype.GetWarmerPlateStatus = function() {
    // const status = ['WARMER_EMPTY', 'POT_EMPTY', 'POT_NOT_EMPTY'];
    return this;
};

/*
    "This function returns the status of the boiler switch.
    The boiler switch is a float switch that detects if
    there is more than 1/2 cup of water in the boiler."
*/
LowLevelAPI.prototype.GetBoilerStatus = function() {
    // const status = ['EMPTY', 'NOT_EMPTY'];
    return this;
};

/*
    "This function returns the status of the brew button.
    The brew button is a momentary switch that remembers
    its state. Each call to this function returns the
    remembered state and then resets that state to
    NOT_PUSHED.

    Thus, even if this function is polled at a very slow
    rate, it will still detect when the brew button is
    pushed."
*/
LowLevelAPI.prototype.GetBrewButtonStatus = function() {
    // const status = ['PUSHED', 'NOT_PUSHED'];
    return this;
};

/*
    "This function turns the heating element in the boiler
    on or off."
*/
LowLevelAPI.prototype.SetBoilerState = function(/* state */) {
    // const validStates = ['ON', 'OFF'];
    return this;
};

/*
    "This function turns the heating element in the warmer
    plate on or off."
*/
LowLevelAPI.prototype.SetWarmerState = function(/* state */) {
    // const validStates = ['ON', 'OFF'];
    return this;
};

/*
    "This function turns the indicator light on or off.
    The indicator light should be turned on at the end
    of the brewing cycle. It should be turned off when
    the user presses the brew button."
*/
LowLevelAPI.prototype.SetIndicatorState = function(/* state */) {
    // const validStates = ['ON', 'OFF'];
    return this;
};

/*
    "This function opens and closes the pressure-relief
    valve. When this valve is closed, steam pressure in
    the boiler will force hot water to spray out over
    the coffee filter. When the valve is open, the steam
    in the boiler escapes into the environment, and the
    water in the boiler will not spray out over the filter."
*/
LowLevelAPI.prototype.SetReliefValveState = function(/* state */) {
    // const validStates = ['OPEN', 'CLOSED'];
    return this;
};

export default LowLevelAPI;