declare module 'tower-strcase' {
  export function camelCase(string): string;      // "fooBar" 
  export function snakeCase(string): string;      // "foo_bar" 
  export function constantCase(string): string;   // "FOO_BAR" 
  export function classCase(string): string;      // "FooBar" 
  export function namespaceCase(string): string;  // "Foo.Bar" 
  export function titleCase(string): string;      // "Foo Bar" 
  export function paramCase(string): string;      // "foo-bar" 
  export function pathCase(string): string;       // "foo/bar" 
  export function dotCase(string): string;        // "foo.bar" 
}
