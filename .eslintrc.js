module.exports =
// {
//    "env": {
//      "browser": true,
//      "jest": true,
//      "es6": true
//    },
//    "extends": [
//      "eslint:recommended",
//      "plugin:react/recommended",
//      "plugin:@typescript-eslint/recommended",
//      "prettier"
//    ],
//    "parser": "@typescript-eslint/parser",
//    "parserOptions": {
//      "ecmaFeatures": {
//        "jsx": true
//      },
//      "ecmaVersion": 6,
//      "sourceType": "module"
//    },
//    "plugins": ["react", "@typescript-eslint"],
//    "rules": {
//      "no-multiple-empty-lines": ["warn", { "max": 1 }],
//      "no-trailing-spaces": ["warn"],
//     "indent": [
//       "warn",
//       2, // 2 spaces
//       {
//         "SwitchCase": 1
//       }
//     ],
//     "linebreak-style": ["warn", "windows"],
//     "quotes": ["warn", "single"],
//     "semi": ["warn", "never"],
//     "react/react-in-jsx-scope": "off",
//     "react/display-name": ["warn"],
//     "@typescript-eslint/no-inferrable-types": ["warn"],
//     "@typescript-eslint/no-empty-function": ["warn"],
//     "@typescript-eslint/no-non-null-asserted-optional-chain": ["warn"],
//    }}
{
   root: true,
   env: {
      node: true
   },
   extends: [
   ],
   parserOptions: {
      ecmaVersion: 2020
   },
   rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies,
      "no-multiple-empty-lines": ["warn", { "max": 1 }],
       "no-trailing-spaces": ["warn"],
   },
   "plugins": [
      // ...
      "react-hooks"
   ],
}
