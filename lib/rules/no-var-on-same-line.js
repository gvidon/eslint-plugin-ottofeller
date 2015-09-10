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
		'Program': function(node) {
			var
				src = context.getSource(),
				re = new RegExp('var[^\n]+$', 'mg'),
				match,
				lines;

			while((match = re.exec(src)) !== null) {
				lines = src.slice(0, re.lastIndex).split(/\r?\n/g);

				context.report(node, {
					line: lines.length,
					column: lines[lines.length - 1].length - match[0].length + 1
				}, 'var statement required to take the whole line');
			}
		}
	}
};