'use strict';

var wrappedHeader;
var tk = require('rocambole-token');
var br = require('rocambole-linebreak');

exports.setOptions = function(opts) {
  if (opts.header) {
    wrappedHeader = '\n' + opts.header + '\n';
  }
};

exports.stringAfter = function(value) {
  if (!wrappedHeader) {
    return value;
  }

  var linebreak = '\n\n';
  var headerBlockComment = '/*' + wrappedHeader + '*/';

  return headerBlockComment + linebreak + value;
};

exports.tokenBefore = function(token) {
  if (isHeaderComment(token)) {
    br.limitAfter(token, 0);
    tk.remove(token);
  }
};

function isHeaderComment(token) {
  return (token.type === 'BlockComment'
          && token.prev === undefined
          && token.value === wrappedHeader);
}
