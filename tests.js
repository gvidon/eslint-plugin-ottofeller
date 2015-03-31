'use strict';

var
	eslint = require('eslint'),
	ESLintTester = require('eslint-tester');

var
	eslintTester = new ESLintTester(eslint);

eslintTester.addRuleTest('no-var-on-same-line', {
	valid: [
		'callFoo();\nvar\n\tvariable = 1',
		'callFoo();\nvar\n\tvariable = \'value\'',
		'anotherVariable = 1;\nvar\n\tvariable = 1',
		'anotherVariable = 1;\nvar\n\tvariable = \'value\'',
		'var\n\tvariable = 1',
		'var\n\tvariable = \'value\'',
		'var\nvariable = 1',
		'var\nvariable = \'value\'',
		'function() {\nvar\n\tvariable = 1; }',
		'function() {\nvar\n\tvariable = \'value\'; }'
	],

	invalid: [
		{
			code  : 'callFoo(); var\nvariable = 1;',
			errors: [{message: 'var statement required to take the whole line', type: 'Program'}]
		},
		
		{
			code  : 'callFoo();\nvar variable = 1;',
			errors: [{message: 'var statement required to take the whole line', type: 'Program'}]
		}
	]
});

eslintTester.addRuleTest('no-full-name-lambda-params', {
	valid: [
		'this.setCallback(function(E) { return E })',
		'setTimeout(function(E) { return E }, 1000)',
		'this.setCallback(function(EV) { return EV })',
		'setTimeout(function(EV) { return EV }, 1000)',
		'{someProperty: function(someParam) { return someParam }}',
	],

	invalid: [
		{
			code  : 'this.setCallback(function(event) { return event })',
			errors: [{message: 'Only 1-2 capital letters names allowed for lambda params', type: 'FunctionExpression'}]
		},
		
		{
			code  : 'setTimeout(function(EVE) { return EVE }, 300)',
			errors: [{message: 'Only 1-2 capital letters names allowed for lambda params', type: 'FunctionExpression'}]
		}
	]
});
