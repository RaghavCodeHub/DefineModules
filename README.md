DefineModules
=============

A module that simplifies injecting module dependencies into a file through a configuration json that contains the paths of the project files aliased to a unique name.

## Installation

  npm install define-modules --save
  
## Usage
* Creating a JSON configuration file.

  If the folder structure is as follows (example of an auto generated express application):
  ```
  Express/
  	     routes/
  	            index.js
  	            user.js
  	     public
  	     views
  	     app.js
  ```
  The server side javascript files should be configured in a json as follows:
  ```json
  {
  	"app":"../../../app",
  	"routes":"../../../routes",
  	"user":"../../../routes/user"
  } 
  ```
  You can call it pathsconfig.json or whatever name you prefer and save it in your main project root.
  
* Invoking the code.

  If you want to invoke the code in app.js which is in the main project root, the syntax is as follows:
  ```javascript
  var define = require('define-modules');
  
  define.config('./pathsconfig.json');
  
  //if both routes and user needs to be required, use this instead
  define.load(['routes','user'], function(routes, user) {
  	//functions exported by user and routes can be used here 
  });
  ```
  
### Summary  
That is all. You just needed to specify the file paths in a json file once and instead of writing multiple require statements, use syntax similar to requirejs define to invoke the modules inside whatever files you want in your project.
   
## Tests
  
  npm test








