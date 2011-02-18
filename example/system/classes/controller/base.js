var sys = require('sys');

var Controller_Base = function () {

}

Controller_Base.prototype = {
  run: function() {
     sys.puts("Controller_Base from system.");
  }
};

module.exports = Controller_Base;