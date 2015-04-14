var esformatter = require('esformatter');
var plugin = require('./');
var assert = require('assert');

var settings = {
    banner: '* jQuery Release Note Generator '
};
var code = 'function foo() { console.log("hi"); }';

esformatter.register(plugin);

describe('esformatter-header', function() {
  it('adds the header value', function() {
    var result = esformatter.format(code, settings);

    assert.equal(result, '/*\n* jQuery Release Note Generator \n*/\n\nfunction foo() {\n  console.log(\"hi\");\n}');
  });

  it('preserves non-header comments', function() {
    var commentedCode = '/* some comment block */\n' + code;
    var result = esformatter.format(commentedCode, settings);

    assert.equal(result, '/*\n* jQuery Release Note Generator \n*/\n\n/* some comment block */\nfunction foo() {\n  console.log(\"hi\");\n}');
  });

  it('won\'t duplicate header', function() {
    var headerCode = '/*\n* jQuery Release Note Generator \n*/\n\nfunction foo() {\n  console.log(\"hi\");\n}';
    var result = esformatter.format(headerCode, settings);

    assert.equal(headerCode, result);
  });
});
