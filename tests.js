'use strict';

var
	eslint = require('eslint'),
	ESLintTester = require('eslint-tester');

var
	eslintTester = new ESLintTester(eslint);

eslintTester.addRuleTest('newline-around-multiline-blocks', {
	valid: [
		'someCall(param);\nobject.method(objectParam);\nreturn this;',
		'tryThisone(param).andChainCall(here);\n\n# This is comment\ncommented.call();',
		'object.method(objectParam);\nanotherObject(anotherParam);\n\nif(1 > 0)\n\tcall();',
		'call.method();\n\ndictionary = {\n\tanother_key: V\n}',
		'dictionary = {\n\tanother_key: V,\n\tbb: value,\n\n\tlargeValue: [\n\t\t1,\n\t\t2,\n\t\t3,\n\t\t4\n\t],\n\n\tzz: 333};'
	],

	invalid: [
		{
			code: 'someCall(param);\nobject.method(objectParam);\n\nreturn this;',
			errors: [{message: 'There should not be new line between singleline nodes', type: 'BlockStatement'}]
		},

		{
			code: 'object.method(objectParam);\nanotherObject(anotherParam);\nif(1 > 0)\n\tcall();',
			errors: [{message: 'Multiline node should have trailing new line', type: 'BlockStatement'}]
		},

		{
			code: 'call.method();\ndictionary = {\n\tanother_key: V\n}',
			errors: [{message: 'Singleline node prior to multiline should have trailing new line', type: 'BlockStatement'}]
		},

		{
			code: '[\n\t2,\n\t{\n\t\tkey: value,\n\t\tanotherKey: anotherValue\n\t}\n]',
			errors: [{message: 'Singleline node prior to multiline should have trailing new line', type: 'ArrayExpression'}]
		},

		{
			code: '{\n\tkey: 2,\n\tanotherKey: {\n\t\tkey: value,\n\t\tanotherKey: anotherValue\n\t}\n}',
			errors: [{message: 'Singleline node prior to multiline should have trailing new line', type: 'ObjectExpression'}]
		}
	]
});

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
