'use strict';

module.exports = {
	rules: {
		'newline-around-multiline-blocks': function(context) {
			return _.object(_.map([
				'ArrayExpression',
				'BlockStatement',
				'ObjectExpression'
			], function(R) { return [R, function(node) {
				if(node.loc.start.line === node.loc.end.line)
					return;

				_.each(node.body || node.elements || node.properties, function(N, I, L) {
					var
						isMultiline = Boolean(N.loc.end.line - N.loc.start.line),
						next = L[I + 1],
						nextCommentsLength = 0,
						nextIsMultiline;

					if(!next)
						return;

					nextIsMultiline = Boolean(next.loc.end.line - next.loc.start.line);

					// Keep in mind that next node may lead by multiple comments nodes
					if(next.leadingComments)
						nextCommentsLength = _.last(next.leadingComments).loc.end.line - _.first(next.leadingComments).loc.start.line + 1;

					if(isMultiline && (next.loc.start.line - N.loc.end.line) !== (2 + nextCommentsLength))
						context.report(N, {line: N.loc.end.line}, 'Multiline node should have trailing new line');

					if(isMultiline)
						return;

					if(nextIsMultiline && next.loc.start.line !== N.loc.end.line && (next.loc.start.line - N.loc.end.line) != (2 + nextCommentsLength))
						context.report(N, {line: N.loc.end.line}, 'Singleline node prior to multiline should have trailing new line');

					if(!N.leadingComments && !nextIsMultiline && !nextCommentsLength && (next.loc.start.line - N.loc.end.line) > 1)
						context.report(N, {line: N.loc.end.line + 1}, 'There should not be new line between singleline nodes');
				});
			}]; }));
		},

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
