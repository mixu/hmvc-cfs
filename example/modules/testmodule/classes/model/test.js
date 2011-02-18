var sys = require('sys');

var Model_Test = function () {

}

Model_Test.prototype = {
  run: function() {
     sys.puts("Model_Test from testmodule.");
  }
};

module.exports = Model_Test;