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

    Returns:
        Itself.
*/
CoffeeMaker.prototype.powerOff = function() {
    return this;
};

export default CoffeeMaker;
