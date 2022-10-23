module.exports = {
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
      "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
   },
   "plugins": [
      // ...
      "react-hooks"
   ],
}
