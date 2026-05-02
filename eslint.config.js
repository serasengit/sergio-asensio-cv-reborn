const tseslint = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');
const prettierPlugin = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
    {
        ignores: ['node_modules/**', 'dist/**', '.angular/**', 'eslint.config.js', 'karma.conf.js'],
    },
    ...tseslint.configs['flat/recommended'],
    {
        files: ['**/*.{ts,tsx,mts,cts,js,cjs,mjs}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        plugins: {
            import: importPlugin,
            prettier: prettierPlugin,
        },
        settings: {
            'import/resolver': {
                typescript: {},
                node: {
                    extensions: ['.ts', '.json', '.js'],
                },
            },
        },
        rules: {
            ...importPlugin.configs.errors.rules,
            ...importPlugin.configs.warnings.rules,
            ...importPlugin.configs.typescript.rules,
            ...prettierConfig.rules,
            'import/no-unresolved': 'error',
            'import/namespace': 'off',
            'import/no-named-as-default': 'off',
            'prettier/prettier': 'off',
            '@typescript-eslint/no-inferrable-types': 'off',
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-function-return-type': 'error',
        },
    },
];
