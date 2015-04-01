'use strict';

module.exports = {
	rules: {
		'no-var-on-same-line': function(context) {
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
		},
		
		'no-full-name-lambda-params': function(context) {
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
		}
	}
};
