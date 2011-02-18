var sys = require('sys');

var Test = function () {

}

Test.prototype = {
  run: function() {
     sys.puts("Test from application directory.");
  }
};

module.exports = Test;