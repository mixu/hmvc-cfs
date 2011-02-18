// additional modules for this example
var sys = require('sys'),
    fs = require('fs');
    
// if you put hmvc.js in ~/node_modules/hmvc.js, you don't need to specify the path to hmvc.js... see Modules in node.js docs.
var Hmvc = require('../index.js');

// set modules
// -- note that lookups are cached so if you set modules, then use find_file, then set modules again, you may get cached results.
// -- in short, don't use Hmvc.modules() twice since caching means that stat() calls are not repeated if the find_file call has already been done once.
Hmvc.modules([
         "./modules/testmodule/",
         "./modules/testmodule2/",
         ]);

// test find file 
console.log(Hmvc.find_file('classes', 'test'));

// test class loading
var t = Hmvc.factory('test');
t.run();

// test view loading
fs.readFile(Hmvc.find_file('views', 'user/index', '.html'), function (err, data) {
  if (err) throw err;
  sys.puts(data);
});

// test class loading from testmodule
var t2 = Hmvc.factory('Model_Test');
t2.run();

// test view loading from testmodule2
fs.readFile(Hmvc.find_file('views', 'user/login', '.html'), function (err, data) {
  if (err) throw err;
  sys.puts(data);
});

// test extending class (see code in /application/classes/controller/extend.js to see how extension is achieved)
var t3 = Hmvc.factory('Controller_Extend');
t3.run();
t3.run_parent();

