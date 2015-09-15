'use strict';

module.exports = {
	rules: {
		'newline-around-multiline-blocks': require('./lib/rules/newline-around-multiline-blocks'),
		'no-var-on-same-line': require('./lib/rules/no-var-on-same-line'),
		'no-full-name-lambda-params': require('./lib/rules/no-full-name-lambda-params)
	}
};
