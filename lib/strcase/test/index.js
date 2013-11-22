var incase = require('..')
  , assert = require('assert');

describe('serverTest', function(){
  var cases = {
      camelCase:      'fooBar'
    , snakeCase:      'foo_bar'
    , constantCase:   'FOO_BAR'
    , classCase:      'FooBar'
    , namespaceCase:  'Foo.Bar'
    , titleCase:      'Foo Bar'
    , paramCase:      'foo-bar'
    , pathCase:       'foo/bar'
    , dotCase:        'foo.bar'
  }

  function testStringCase(type, initialValue, expectedValue) {
    it(type + '("' + initialValue + '") == ' + expectedValue, function(){
      assert.equal(incase[type](initialValue), expectedValue);
    });
  }

  function testStringCases(type, value) {
    for (caseName in cases) {
      testStringCase(type, cases[caseName], value);
    }
  }

  testStringCases('camelCase', 'fooBar');
  testStringCases('snakeCase', 'foo_bar');
  testStringCases('constantCase', 'FOO_BAR');
  testStringCases('classCase', 'FooBar');
  testStringCases('namespaceCase', 'Foo.Bar');
  testStringCases('titleCase', 'Foo Bar');
  testStringCases('paramCase', 'foo-bar');
  testStringCases('pathCase', 'foo/bar');
  testStringCases('dotCase', 'foo.bar');

  it('should handle non code characters', function(){
    assert.equal(incase.camelCase('Node.js!'), 'nodeJs');
    assert.equal(incase.camelCase('asdf asdf ^#! asdf'), 'asdfAsdfAsdf');
    assert.equal(incase.namespaceCase('asdf asdf ^#! asdf'), 'Asdf.Asdf.Asdf');
  });
});
