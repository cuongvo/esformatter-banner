'use strict';

var wrappedBanner;
var tk = require('rocambole-token');
var br = require('rocambole-linebreak');

exports.setOptions = function(opts) {
  if (opts.banner) {
    wrappedBanner = '\n' + opts.banner + '\n';
  }
};

exports.stringAfter = function(value) {
  if (!wrappedBanner) {
    return value;
  }

  var linebreak = '\n\n';
  var bannerBlockComment = '/*' + wrappedBanner + '*/';

  return bannerBlockComment + linebreak + value;
};

exports.tokenBefore = function(token) {
  if (isBannerComment(token)) {
    br.limitAfter(token, 0);
    tk.remove(token);
  }
};

function isBannerComment(token) {
  return (token.type === 'BlockComment'
          && token.prev === undefined
          && token.value === wrappedBanner);
}
