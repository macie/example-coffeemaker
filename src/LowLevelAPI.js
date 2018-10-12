/*
    Low-level coffee machine API.

    Based on Listing 20-1 from book:
        Martin, Robert C., and Micah Martin. Agile principles, patterns,
        and practices in C. Upper Saddle River, NJ: Prentice Hall, 2007. Print.

    Attributes:
        boilerState: A string with current boiler state.
            Default 'OFF'.
        warmerState: A string with current warmer state.
            Default 'OFF'.
        indicatorState: A string with current indicator state.
            Default 'OFF'.
        reliefValveState: A string with current relief valve state.
            Default 'OPEN'.
*/
function LowLevelAPI() {
    this.boilerState = 'OFF';
    this.warmerState = 'OFF';
    this.indicatorState = 'OFF';
    this.reliefValveState = 'OPEN';
}

/*
    "This function returns the status of the warmer-plate
    sensor. This sensor detects the presence of the pot
    and whether it has coffee in it."

    Returns:
        A string with random valid boiler plate status.
*/
LowLevelAPI.prototype.GetWarmerPlateStatus = function() {
    const validStatuses = ['WARMER_EMPTY', 'POT_EMPTY', 'POT_NOT_EMPTY'];
    let randomStatus = validStatuses[
        Math.floor(Math.random() * validStatuses.length)
    ];

    return randomStatus;
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

    Args:
        state: A string with valid boiler state.

    Returns:
        Itself.
*/
LowLevelAPI.prototype.SetBoilerState = function(state) {
    const validStates = ['ON', 'OFF'];
    if (validStates.includes(state)) {
        this.boilerState = state;
    }

    return this;
};

/*
    "This function turns the heating element in the warmer
    plate on or off."

    Args:
        state: A string with valid warmer state.

    Returns:
        Itself.
*/
LowLevelAPI.prototype.SetWarmerState = function(state) {
    const validStates = ['ON', 'OFF'];
    if (validStates.includes(state)) {
        this.warmerState = state;
    }

    return this;
};

/*
    "This function turns the indicator light on or off.
    The indicator light should be turned on at the end
    of the brewing cycle. It should be turned off when
    the user presses the brew button."

    Args:
        state: A string with valid indicator state.

    Returns:
        Itself.
*/
LowLevelAPI.prototype.SetIndicatorState = function(state) {
    const validStates = ['ON', 'OFF'];
    if (validStates.includes(state)) {
        this.indicatorState = state;
    }

    return this;
};

/*
    "This function opens and closes the pressure-relief
    valve. When this valve is closed, steam pressure in
    the boiler will force hot water to spray out over
    the coffee filter. When the valve is open, the steam
    in the boiler escapes into the environment, and the
    water in the boiler will not spray out over the filter."

    Args:
        state: A string with valid valve state.

    Returns:
        Itself.
*/
LowLevelAPI.prototype.SetReliefValveState = function(state) {
    const validStates = ['OPEN', 'CLOSED'];
    if (validStates.includes(state)) {
        this.reliefValveState = state;
    }

    return this;
};

export default LowLevelAPI;
