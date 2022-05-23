module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'eslint:recommended', 
        'plugin:@typescript-eslint/recommended', 
        'prettier'
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        '@typescript-eslint', 
        'prettier'
    ],
    "rules": {
        '@typescript-eslint/ban-ts-ignore': "off",
        'prettier/prettier': 2,
        semi: ['error', 'never'],
        quotes: ['error', 'single']
    }
}
