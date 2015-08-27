/**
 * @fileoverview
 * @author
 */

"use strict";

var
	_ = require('underscore');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function(context) {
	return {
		'FunctionExpression': function(node) {
			var
				lambdaParamRE = new RegExp('^[A-Z]{1,2}$')

			// Allow full name params in object properties
			if(node.parent.type !== 'CallExpression' || node.id)
				return;

			if(node.params.map(function(P) {
				return P.type === 'Identifier' && lambdaParamRE.exec(P.name) === null && P.name;
			}).filter(Boolean).length)
				context.report(node,'Only 1-2 capital letters names allowed for lambda params');
		}
	}
};

module.exports.schema = [];