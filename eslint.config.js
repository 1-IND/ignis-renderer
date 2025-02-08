import antfu from '@antfu/eslint-config';

export default antfu({
	unocss: true,
	solid: true,
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: true,
	},
	typescript: {
		tsconfigPath: 'tsconfig.json',
	},
	rules: {
		'no-console': 'off',

		'eslint-comments/no-unlimited-disable': 'off',

		'style/jsx-quotes': ['warn', 'prefer-single'],

		'antfu/if-newline': 'off',

		'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],

		'import/order': 'off', // handled by perfectionist
		'sort-imports': 'off', // handled by perfectionist
		'perfectionist/sort-imports': [
			'error',
			{
				type: 'natural',
				order: 'asc',
				groups: [
					['type', 'builtin', 'external'],
					['internal-type', 'internal'],
					['parent-type', 'sibling-type', 'index-type', 'parent', 'sibling', 'index'],
					'side-effect',
					'style',
					'object',
					'unknown',
				],
				newlinesBetween: 'always',
			},
		],
		'perfectionist/sort-named-imports': 'error',
		'perfectionist/sort-exports': 'error',
	},
});
