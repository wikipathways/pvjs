caseConverter = function(){ 

/**
 * "dot.case"
 */

var dotCase = function(string) {
  return separatorCase(string, '.');
}

/**
 * "ClassCase"
 */

var classCase = function(string) {
  return separatorCase(string, '_').replace(/(?:^|_|\-|\/)(.)/g, function(match, c) {
    return c.toUpperCase();
  });
}

/**
 * "Namespace.Case"
 */

var namespaceCase = function(string) {
  return separatorCase(string, '.').replace(/(^|_|\.|\-|\/)(.)/g, function(match, p, c) {
    return p + c.toUpperCase();
  });
}

/**
 * "CONSTANT_CASE"
 */

var constantCase = function(string) {
  return separatorCase(string, '_').replace(/[a-z]/g, function(c) {
    return c.toUpperCase();
  });
}

/**
 * "camelCase"
 */

var camelCase = function(string) {
  return separatorCase(string, '_').replace(/[-_\.\/\s]+(.)?/g, function(match, c) {
    return c.toUpperCase();
  });
}

/**
 * "Title Case"
 */

var titleCase = function(string) {
  return separatorCase(string, ' ').replace(/(?:^|\s)\S/g, function(c) {
    return c.toUpperCase();
  });
}

/**
 * "snake_case"
 */

var snakeCase = function(string) {
  return separatorCase(string, '_');
}

/**
 * "path/case"
 */

var pathCase = function(string) {
  return separatorCase(string, '/');
}

/**
 * "param-case"
 */

var paramCase = function(string) {
  return separatorCase(string, '-');
}

/**
 * Generic string transform.
 */

var separatorCase = function(string, separator) {
  return clean(trim(string), separator).replace(/([a-z\d])([A-Z]+)/g, '$1' + separator + '$2').replace(/([A-Z](?=[A-Z]))/g, '$1' + separator).replace(/[-\.\/\_\s]+/g, separator).toLowerCase();
}

/**
 * Remove non-word characters.
 */

var clean = function(string, separator) {
  return string.replace(/\W+/g, separator || ' ');
}

/**
 * Remove non-word from the start/end of the string only.
 */

var trim = function(string) {
  return string.replace(/^\W+|\W+$/g, '');
}

return { 
  dotCase:dotCase,
  classCase:classCase,
  namespaceCase:namespaceCase,
  constantCase:constantCase,
  camelCase:camelCase,
  titleCase:titleCase,
  snakeCase:snakeCase,
  pathCase:pathCase,
  paramCase:paramCase
} 
}();
