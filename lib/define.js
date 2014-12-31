/**
 * @author Raghavendra raghavendra.ravikumar@gmail.com
 */
'use strict';
var fs = require('fs');
var path = require('path');

/**
 * Creates a define object to configure and load modules
 * @constructor
 */
function Define() {
	this.filesConfig = {};
}

/**
 * Saves json configuration file into a property as a object
 * @param {string} configfilePath - path of the configuration json
 */
Define.prototype.config = function config(configfilePath) {
	var filesConfigJson = fs.readFileSync(configfilePath, {encoding : 'utf8'});
	this.filesConfig = JSON.parse(filesConfigJson);	
};

/**
 * Load module names into module objects in the callback
 * @param {Array} modules - names of modules as an array of strings
 * @param {function} callback - contains module objects
 */
Define.prototype.load = function load(modules, callback) {
	var moduleArray = [];
	if (typeof callback !== 'function') {
		callback = function() {};
	}
	
	if (!Array.isArray(modules)) {
		throw new Error('Modules should be injected as array');
	}
	
	for (var module in modules) {
		if (modules.hasOwnProperty(module)) {
			if (typeof modules[module] !== 'string') {
				var errorString = modules[module] + ' is not of type string';
				throw new Error(errorString);			
			}
			var relativePath = path.relative(__dirname, process.cwd());
			var modulePath = this.filesConfig[modules[module]];
			var requirePath = (modulePath && (relativePath.replace(/\\/g,"/") + '/' + modulePath)) || modules[module];
			moduleArray.push(require(requirePath));
		}		
	}
	callback.apply(null, moduleArray);
};

module.exports = Define;