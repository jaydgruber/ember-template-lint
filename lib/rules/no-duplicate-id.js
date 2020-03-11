'use strict';

const Rule = require('./base');

const ERROR_MESSAGE = 'ID attribute values must be unique';

module.exports = class NoDuplicateId extends Rule {
  visitor() {
    let attrIdStack = [];
    return {
      AttrNode(node) {
        if (!(node.name === 'id')) {
          return;
        }

        if (node.value.type !== 'TextNode') {
          return;
        }

        attrIdStack.push(node.value.chars);

        let hasDuplicates = attrIdStack.some(
          idValue => attrIdStack.indexOf(idValue) !== attrIdStack.lastIndexOf(idValue)
        );

        if (hasDuplicates) {
          this.log({
            message: ERROR_MESSAGE,
            line: node.loc && node.loc.start.line,
            column: node.loc && node.loc.start.column,
            source: this.sourceForNode(node),
          });
        }
      },
    };
  }
};

module.exports.ERROR_MESSAGE = ERROR_MESSAGE;