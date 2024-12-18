'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true,
})

const config = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'plugin:import/typescript', 'plugin:unicorn/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import-helpers', 'promise', 'unicorn'],
  settings: {
    'import/resolver': {
      node: true,
      typescript: true,
    },
  },
  rules: {
    /**********************/
    /*    General Rules   */
    /**********************/
    /*
     * const x = Math.pow(2, 3) <- error. use 2 ** 3 instead.
     */
    'prefer-exponentiation-operator': 'error',
    /*
     * (a) => a <- warned. remove parens on single parameter.
     * ([a, b]) => console.log(a, b) <- allowed.
     */
    'arrow-parens': ['warn', 'as-needed', {
      requireForBlockBody: false,
    }],
    /*
     * debugger <- warned.
     */
    'no-debugger': 'warn',
    /*
     * console.log('something') <- warned.
     *
     * console.error('someting') <- allowed.
     * console.info('warn') <- allowed.
     */
    'no-console': ['warn', {
      allow: ['warn', 'error', 'time', 'timeEnd', 'table'],
    }],
    /*
     * const a = async () => { <- error. async function is used without await.
     *   console.log('error')
     * }
     */
    'require-await': 'error',
    /*
     * var a = 'a' <- error. use const or let.
     */
    'no-var': 'error',
    /*
     * const bad = {
     *   fn: function() {} <- error.
     * }
     *
     * const good = {
     *   fn() {} <- allowed.
     * }
     */
    'object-shorthand': 'error',
    /*
     * import { foo as foo } from 'bar' <- error. useless rename.
     * const { foo: foo } = bar <- error. useless rename.
     */
    'no-useless-rename': 'error',
    /*
     * Object.assign({}, foo) <- warned.
     * Object.assign({ foo: 'bar'}, baz) <- warned.
     *
     * Object.assign(foo, { bar: baz }) <- allowed. first argument is not an object literal.
     */
    'prefer-object-spread': 'warn',
    /*
     * const hasBarProperty = foo.hasOwnProperty('bar') <- warned.
     *
     * const hasBarProperty = Object.prototype.hasOwnProperty.call(foo, 'bar') <- allowed.
     */
    'no-prototype-builtins': 'warn',
    /*
     * const foo = a && b || c || d <- erorr.
     *
     * const foo = (a && b) || c || d <- allowed.
     * const foo = a && (b || c || d) <- allowed.
     */
    'no-mixed-operators': 'error',
    /*
     * const x = foo['bar'] <- warned.
     *
     * const x = foo[bar] <- allowed. since it's variable.
     */
    'dot-notation': 'warn',
    /*
     * function foo() {return true} <- error. spaces are needed after opening and closing blocks.
     */
    'block-spacing': 'error',
    /*
     * foo( 'bar' ) <- error. remove spaces inside parentheses.
     */
    'space-in-parens': 'error',
    /*
     * var foo = 1
     *     , bar = 2 <- error. put the comma at the end of the line.
     */
    'comma-style': ['error', 'last'],
    /*
     * const obj = { foo : 42 } <- error. delete the space before colon.
     */
    'key-spacing': 'error',
    /*
     * var foo_ <- warned. don't use underscore.
     * foo._bar() <- warned. don't use underscore.
     *
     * var a = this.foo_ <- allowed. because of "this".
     * this._bar() <- allowed. because of "this".
     */
    'no-underscore-dangle': ['warn', {
      allowAfterThis: true,
    }],
    /*************************/
    /*   Typescript Rules    */
    /*************************/
    /**
     * const a: any <- warned.
     *
     * If the type is known, describing it in an "interface" or "type"
     * If the type is not known, using the safer "unknown" type
     */
    '@typescript-eslint/no-explicit-any': ['warn', {
      ignoreRestArgs: true,
    }],
    /*
     * // @ts-ignore <- warned.
     */
    '@typescript-eslint/ban-ts-comment': 'warn',
    /*
     * interface Foo { <- allowed.
     *   name: string
     *   greet(): string
     * }
     *
     * interface Foo { name: string; greet(): string } <- allowed.
     */
    '@typescript-eslint/member-delimiter-style': ['warn', {
      multiline: {
        delimiter: 'none',
        // 'none' or 'semi' or 'comma'
      },

      singleline: {
        delimiter: 'semi',
        // 'semi' or 'comma' (dont use 'comma', because it conflicts with prettier rule)
        requireLast: false,
      },
    }],
    /*
     * const a = 'a'; <- error. remove semi-colon.
     */
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'never'],
    /*
     * const foo = {
     *   bar: 'baz',
     *   qux: 'quux' <- error. put comma here.
     * }
     */
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
    }],
    /*
     * const arr = [1 , 2] <- error. delete the space before comma.
     */
    'comma-spacing': 'off',
    '@typescript-eslint/comma-spacing': 'error',
    /*
     * Enforce Case Convention for Variables, parameters, types/interfaces, and methods/properties
     * Special for private methods, use _camelCase
     */
    camelcase: 'off',
    '@typescript-eslint/naming-convention': ['error', {
      selector: 'variableLike',
      format: ['camelCase'],
    }, {
      selector: 'variable',
      format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
    }, {
      selector: 'memberLike',
      modifiers: ['private'],
      format: ['camelCase'],
      leadingUnderscore: 'require',
    }, {
      selector: 'parameter',
      format: ['camelCase'],
      leadingUnderscore: 'allow',
    }, {
      selector: 'typeLike',
      format: ['PascalCase'],
    }],
    /*
     * const obj = {key: 'name'} <- error. add spaces after opening and closing brackets.
     */
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    /*
     * const a = "a" <- error. use single quote.
     */
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single', {
      allowTemplateLiterals: true,
    }],
    /*
     * function fn () { } <- error. remove the space before parens.
     * function() { } <- error. add space before parens.
     * async() => { } <- error. add space before parens.
     */
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'never',
      asyncArrow: 'always',
    }],
    /*
     * function fn() {
     *   const a = 'unused' <- error. unused variable.
     * }
     */
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    /*
     * a && b() <- error. expresion is unused.
     * (function anIncompleteIIFE() {}) <- error. expresion is unused.
     */
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    /*
     * fn () <- error. remove space.
     * fn
     * () <- error. remove newline.
     */
    'func-call-spacing': 'off',
    '@typescript-eslint/func-call-spacing': ['error', 'never'],
    /*
     * a+b <- error. add space between operator.
     * a?b:c <- error. add space between operator.
     */
    'space-infix-ops': 'off',
    '@typescript-eslint/space-infix-ops': ['error', {
      int32Hint: false,
    }],
    /**********************/
    /*    Import Rules    */
    /**********************/
    /*
     * Handled by import-helpers/order-imports
     */
    'import/order': 'off',
    /*
     * import foo from './foo'
     *
     * // some module-level initializer
     * initWith(foo)
     *
     * import bar from './bar' // <- error. reorder before initWith(foo).
     */
    'import/first': 'error',
    /*
     * export var a = 'a' <- error. use const.
     * export let b = 'b' <- error. use const.
     *
     * let c = 'c'
     * export { c } <- error. use const.
     */
    'import/no-mutable-exports': 'error',
    /*
     * // lib.ts
     * export default 'foo'
     * export const bar = 'baz'
     *
     * // main.ts
     * import foo from './foo.js'
     * const bar = foo.bar <- allowed.
     *
     */
    'import/no-named-as-default-member': 'off',
    // 'import/no-unresolved': 'off',
    // 'import/namespace': [2, { allowComputed: true }],
    /**********************/
    /*   Import Helpers   */
    /**********************/
    /*
     * import { ESLint } from 'eslint'
     * import baseConfig from './base.js'
     * import lodash from 'lodash' <- warned. reorder before './base'.
     *
     */
    'import-helpers/order-imports': ['warn', {
      newlinesBetween: 'ignore',
      groups: ['module', '/^~/', ['parent', 'sibling', 'index']],
      alphabetize: {
        order: 'asc',
        ignoreCase: true,
      },
    }],
    /**********************/
    /*    Promise Rules   */
    /**********************/
    /*
     * myPromise.then((result) => {
     *   if (result) {
     *     return 'yes'
     *   } else {
     *     forgotToReturn() <- allowed.
     *   }
     * })
     *
     */
    'promise/always-return': 'off',
    /*
     * myPromise.then(function (val) {
     *   return Promise.resolve(val * 2) <- error. don't wrap inside Promise.resolve. return the value directly.
     * })
     */
    'promise/no-return-wrap': 'error',
    /*
     * new Promise(function (reject, resolve) { ... }) <- error. incorrect order.
     * new Promise(function (ok, fail) { ... }) <- error. non-standard parameter names.
     * new Promise(function (_, reject) { ... }) <- error. a simple underscore is not allowed. use _resolve instead.
     */
    'promise/param-names': 'error',
    /*
     * myPromise.then(doSomething) <- error. add catch on un-returned promises.
     * myPromise.then(doSomething, catchErrors) // <- error. catch() may be a little better.
     */
    'promise/catch-or-return': 'error',
    /*
     * const x = Promise.resolve('bad') <- allowed. no need to import 'bluebird'.
     */
    'promise/no-native': 'off',
    /*
     * myPromise.then((val) => doSomething(val).then(doSomethingElse)) <- warned. use chaining instead of nesting.
     */
    'promise/no-nesting': 'warn',
    // 'promise/no-promise-in-callback': 'warn',
    // 'promise/no-callback-in-promise': 'warn',
    /*
     * const a = new Promise((resolve) => resolve(1))
     */
    'promise/avoid-new': 'off',
    /*
     * new Promise.resolve(value) <- error. remove "new" keyword.
     * new Promise.reject(error) <- error. remove "new" keyword.
     * new Promise.race([p1, p2]) <- error. remove "new" keyword.
     * new Promise.all([p1, p2]) <- error. remove "new" keyword.
     */
    'promise/no-new-statics': 'error',
    /*
     * myPromise.finally(function (val) {
     *  return val <- error. remove return since nothing would consume what's returned.
     * })
     */
    'promise/no-return-in-finally': 'error',
    /*
     * somePromise().catch(() => { <- warned. Promise.catch() requires 1 argument.
     *   handleError()
     * })
     */
    'promise/valid-params': 'warn',
    /**********************/
    /*   Unicorn Rules    */
    /**********************/
    /*
     * const regex = /^(a?){25}(a){25}$/ <- warned. unsafe.
     * const regex = /(x+x+)+y/ <- warned. unsafe.
     * const regex = /foo|(x+x+)+y/ <- warned. unsafe.
     * const regex = /(a+){10}y/ <- warned. unsafe.
     * const regex = /(a+){2}y/ <- warned. unsafe.
     * const regex = /(.*){1,32000}[bc]/ <- warned. unsafe.
     */
    'unicorn/no-unsafe-regex': 'warn',
    /*
     * string.replace(/This has no special regex symbols/g, '') <- error. use .replaceAll.
     * string.replace(/\(It also checks for escaped regex symbols\)/g, '') <- error. use .replaceAll.
     * string.replace(/Works for u flag too/gu, '') <- error. use .replaceAll.
     */
    'unicorn/prefer-string-replace-all': 'error',
    /*
     * const e = new Error() <- allowed. no need to use "error".
     * const e = document.createEvent('Event') <- allowed. no need to use "event".
     * class Btn {} <- allowed. no need to use Button.
     */
    'unicorn/prevent-abbreviations': 'off',
    /*
     * const myobj = {
     *   used: 1,
     *   unused: 2 // <- error. Property `unused` is defined but never used.
     * }
     *
     * console.log(myobj.used)
     */
    'unicorn/no-unused-properties': 'error',
    /*
     * Allow CommonJS module.
     */
    'unicorn/prefer-module': 'off',
    /*
     * const a = null <- warned. use undefined if possible.
     */
    'unicorn/no-null': 'warn',
    /*
     * ;(async () => { <- allowed on top level.
     *   // code
     * })()
     *
     * somePromise.then(() => { <- allowed on top level.
     *   // code
     * })
     */
    'unicorn/prefer-top-level-await': 'off',
    /**
     * Force filename to be case to any convention as long as its consistent (except snake_case)
     * ignores test files
     *
     * some-name.ts <- allowed
     * someName.ts <- allowed
     * SomeVue.vue <- allowed
     * script_some.ts <- disallowed
     * dir_path_script.test.ts <- ignored
     */
    'unicorn/filename-case': ['error', {
      ignore: ['\\.test\\.ts$', '\\.md$'],
      cases: {
        kebabCase: true,
        pascalCase: true,
        camelCase: true,
        snakeCase: false,
      },
    }],
  },
}
module.exports = config
