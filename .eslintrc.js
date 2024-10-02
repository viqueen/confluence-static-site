// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            modules: true,
        },
        warnOnUnsupportedTypeScriptVersion: false,
    },
    plugins: ['@typescript-eslint', 'import', 'react', 'license-notice'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:react/recommended',
    ],
    env: {
        browser: true,
        node: true,
    },
    rules: {
        'license-notice/include': [
            'error',
            {
                license: 'Apache-2.0',
                copyRightYear: '2024',
                copyRightName: 'Hasnae Rehioui',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '_',
            },
        ],
        'import/order': [
            'error',
            {
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
                pathGroupsExcludedImportTypes: ['builtin'],
                pathGroups: [
                    {
                        pattern: '{react,react-*}',
                        group: 'external',
                        position: 'before',
                    },
                ],
            },
        ],
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.tsx'],
            },
        },
        react: {
            version: '18.2.0',
        },
    },
};
