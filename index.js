var Hmvc = (function() {
   var fs = require('fs');
   var app_path = fs.realpathSync('./application/')+'/';
   var sys_path = fs.realpathSync('./system/')+'/';
   var _cache = {};
   var paths = [ app_path, sys_path ];
   /**
    * Check if the file exists and is not a directory (taken from node.js core lib Modules.load)
    * @param requestPath string Path to check.
    * @private
    */
   function _try_file(requestPath) {
     var stats = false;
     try {
       stats = fs.statSync(requestPath);
     } catch (ex) {}
     if (stats && !stats.isDirectory()) {
       return fs.realpathSync(requestPath);
     }
     return false;
   }
   /**
    * Set modules to search in find_file.
    */
   function modules(modules) {
      if(!modules) {
         return;
      }
      paths = [ app_path ]
      for(var i in modules) {
         paths.push(fs.realpathSync(modules[i])+'/');
      }
      paths.push(sys_path);
   }
   /**
    * Searches for a file in the Cascading Filesystem, and returns the path to the file that has the highest precedence, so that it can be included.
    * @param dir string required - Directory name (views, classes etc.)
    * @param file string required - Filename with subdirectory
    * @param ext string - Extension to search for (e.g. .css, .js)
    */
   function find_file(dir, file, ext) {
      // default extension
      if(ext == undefined) {
         ext = '.js';
      }
      // lookup from cache
      var lookup = dir+'/'+file+ext;
      if(_cache[lookup]) {
         return _cache[lookup];
      }
      var fn = false;
      for(var i in paths) {
         fn = _try_file(paths[i]+dir+'/'+file+ext);
         if(fn) {
            _cache[lookup] = fn;
            break;
         }
      }
      return fn;
   }
   /**
    * Returns the raw result from require(...) e.g. for extending a class. Note: underscores in class name are mapped to subdirectories.
    * @param class_name string Name of the class
    */
   function load(class_name) {
      var file = class_name.replace('_', '/').toLowerCase();
      var fn = Hmvc.find_file('classes', file);
      if(fn) {
         // we rely on caching in require (a.k.a Modules.load())
         return require(fn);
      }
      return false;
   }
   /**
    * Returns a new instance of the given class. Note: underscores in class name are mapped to subdirectories.
    * @param class_name string Name of the class
    */
   function factory(class_name) {
      return new (load(class_name));
   }
   return {
      modules: modules,
      find_file: find_file,
      factory: factory,
      load: load
  };
})();
module.exports = Hmvc;