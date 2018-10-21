import ControlPanel from './ControlPanel';
import Boiler from './Boiler';
import Warmer from './Warmer';

/*
    A coffee maker model.

    Attributes:
        controlPanel: An object with control panel model.
        boiler: An object with water boiler model.
        warmer: An object with pot warmer model.
*/
function CoffeeMaker() {
    this.controlPanel = new ControlPanel();
    this.boiler = new Boiler();
    this.warmer = new Warmer();
}

/*
    Power on coffee maker.

    Switching power on should initialize all components.

    Returns:
        Itself.
*/
CoffeeMaker.prototype.powerOn = function() {
    this.controlPanel.initialize();
    this.boiler.initialize();
    this.warmer.initialize();

    return this;
};

/*
    Power off coffee maker.

    Switching power off should turn off all components.

    Returns:
        Itself.
*/
CoffeeMaker.prototype.powerOff = function() {
    this.controlPanel.turnOff();
    this.boiler.turnOff();
    this.warmer.turnOff();

    return this;
};

export default CoffeeMaker;