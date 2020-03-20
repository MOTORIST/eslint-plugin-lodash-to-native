/**
 * @fileoverview Description rule
 * @author map
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Replace the lodash map method to the native javascript method',
      category: 'Fill me in',
      recommended: false,
    },
    fixable: 'code', // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create(context) {
    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    return {
      CallExpression: node => {
        const firstMapArgument = node.arguments[0];
        const firstMapArgumentName = node.arguments[0].name;
        const callbackArgumentMap = node.arguments[1];
        const sourceCode = context.getSourceCode();

        if (node.callee.type === 'MemberExpression' && node.callee.object.name === '_') {
          const ancestors = context.getAncestors(node);
          const originalText = sourceCode.getText(node);
          const codeCallback = sourceCode.getText(callbackArgumentMap);
          const condition = `Array.isArray(${firstMapArgumentName})`;

          if (firstMapArgument.type === 'ObjectExpression') {
            return;
          }

          const isArrayCondition = ancestors.some(
            parent =>
              (parent.type === 'IfStatement' || parent.type === 'ConditionalExpression') &&
              sourceCode.getText(parent.test) === condition
          );

          if (isArrayCondition) {
            return;
          }

          if (firstMapArgument.type === 'ArrayExpression') {
            context.report({
              node,
              message: 'Replace the lodash "map" method to the js "map" method',
              fix(fixer) {
                return fixer.replaceText(
                  node,
                  `${sourceCode.getText(firstMapArgument)}.map(${codeCallback})`.toString()
                );
              },
            });

            return;
          }

          const replacementCode = `${condition} ? ${firstMapArgumentName}.map(${codeCallback}) : ${originalText}`;

          context.report({
            node,
            message: 'Replace the lodash "map" method to the js "map" method',
            fix(fixer) {
              return fixer.replaceText(node, replacementCode.toString());
            },
          });
        }
      },
    };
  },
};
