module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
    rules: {
        'at-rule-no-unknown': null,
        indentation: 4,
        'value-keyword-case': [
            'lower',
            {
                ignoreProperties: ['composes'],
            },
        ],
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['global', 'local'],
            },
        ],
    },
};
