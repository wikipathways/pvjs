var incase = require('..')
  , assert = require('assert');

describe('serverTest', function(){
  var cases = [
    'camelCase',
    'snakeCase',
    'constantCase',
    'classCase',
    'namespaceCase',
    'titleCase',
    'paramCase',
    'pathCase',
    'dotCase'
  ];

  var testStringObjArrays = [
    {
      camelCase:'fooBar',
      snakeCase:'foo_bar',
      constantCase:'FOO_BAR',
      classCase:'FooBar',
      namespaceCase:'Foo.Bar',
      titleCase:'Foo Bar',
      paramCase:'foo-bar',
      pathCase:'foo/bar',
      dotCase:'foo.bar'
    },
    {
      camelCase:'fBar',
      snakeCase:'f_bar',
      constantCase:'F_BAR',
      classCase:'FBar',
      namespaceCase:'F.Bar',
      titleCase:'F Bar',
      paramCase:'f-bar',
      pathCase:'f/bar',
      dotCase:'f.bar'
    }
  ];

  function testStringCase(type, initialValue, expectedValue) {
    it(type + '("' + initialValue + '") == ' + expectedValue, function(){
      assert.equal(incase[type](initialValue), expectedValue);
    });
  }

  function testStringCases() {
    testStringObjArrays.forEach(function(testStringObj) {
      for (type in testStringObj) {
        cases.forEach(function(expectedOutputName) {
          testStringCase(type, testStringObj[expectedOutputName], testStringObj[type]);
        });
      };
    })
  }

  testStringCases();

  it('should handle non-code characters', function(){
    assert.equal(incase.camelCase('Node.js!'), 'nodeJs');
    assert.equal(incase.camelCase('asdf asdf ^#! asdf'), 'asdfAsdfAsdf');
    assert.equal(incase.namespaceCase('asdf asdf ^#! asdf'), 'Asdf.Asdf.Asdf');
  });
});
