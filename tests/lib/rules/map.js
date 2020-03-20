/**
 * @fileoverview Description rule
 * @author map
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/map');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 6 } });

ruleTester.run('map', rule, {
  valid: [
    '[1, 2, 3, 4].map(function(el) {console.log(el)})',
    '_.map({ a: 1, b: 2, c: 2 }, i => console.log(i))',
    `if (Array.isArray(collection)) {
        collection.map(i => console.log(i));
    } else {
        _.map(collection, i => console.log(i));
    }`,
    'Array.isArray(collection) ? collection.map(i => console.log(i)) : _.map(collection, i => console.log(i))',
  ],
  invalid: [
    {
      code: '_.map(collection, i => console.log(i))',
      output:
        'Array.isArray(collection) ? collection.map(i => console.log(i)) : _.map(collection, i => console.log(i))',
      errors: [
        {
          message: 'Replace the lodash "map" method to the js "map" method',
        },
      ],
    },
    {
      code: '_.map([1, 2, 3], i => console.log(i))',
      output: '[1, 2, 3].map(i => console.log(i))',
      errors: [
        {
          message: 'Replace the lodash "map" method to the js "map" method',
        },
      ],
    },
    {
      code: 'if ( t > 10) {_.map(collection, i => console.log(i));}',
      output:
        'if ( t > 10) {Array.isArray(collection) ? collection.map(i => console.log(i)) : _.map(collection, i => console.log(i));}',
      errors: [
        {
          message: 'Replace the lodash "map" method to the js "map" method',
        },
      ],
    },
  ],
});
