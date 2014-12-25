/**
 * @author Raghavendra raghavendra.ravikumar@gmail.com
 */
var should = require('chai').should(),
	define = require('../index');

describe('Define modules test', function(){
	before(function(){
		define.config('./test/pathsConfig.json');
	});
	
	it('should load and verify what is exported',function(done){
		define.load(['test'], function(test){
			test.should.have.property('example');
			test.example.should.be.instanceof(Function);
			done();			
		});		
	});
});


