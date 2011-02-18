
var Controller_Extend = function () {
}

// extend the class
// -- note that utils.inherits sets the prototype property
//    so this has to be before you start adding stuff to the prototype.
var util = require('util'),
// if you put hmvc.js in ~/node_modules/hmvc.js, you don't need to specify the path to hmvc.js... see Modules in node.js docs.
    Hmvc = require('../../../../../index.js');
util.inherits(Controller_Extend, Hmvc.load('Controller_Base'));

Controller_Extend.prototype.run = function() {
   console.log("Controller_Extend from testmodule2.");
};
Controller_Extend.prototype.run_parent = function() {
   // run the parent function
   Controller_Extend.super_.prototype.run();
};

module.exports = Controller_Extend;