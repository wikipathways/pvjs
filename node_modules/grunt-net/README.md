# grunt-net

> Run grunt tasks over a network using [dnode](https://github.com/substack/dnode).

*Compatible with Grunt >= 0.4*

## Getting Started
Install this grunt plugin next to your project's
[Gruntfile][getting_started] with: `npm install grunt-net`

Then add this line to your project's Gruntfile:

```javascript
grunt.loadNpmTasks('grunt-net');
```

## Example
In our example, we want to run `jshint` on a remote server. On the server, setup
the following in a `Gruntfile.js`:

```javascript
grunt.initConfig({
  net: {
    server: {
      host: 'example.com',
      port: 5004
    }
  },
  jshint: {
    files: ['Gruntfile.js', 'tasks/*.js'],
    options: { jshintrc: '.jshintrc' }
  }
});
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-net');
```

Now start the server by running: `grunt net`.

On a client, setup the following in a `Gruntfile.js`:

```javascript
grunt.initConfig({
  net: {
    example_server: {
      host: 'example.com',
      port: 5004,
      tasks: ['jshint']
    }
  }
});
grunt.loadNpmTasks('grunt-net');
```

Now when you run `grunt net`, the `jshint` task on the remote server will be ran
and the output will be streamed to your local terminal.

## Example Output

```
$ grunt net
Running "net:devserver" (net) task
Connected to server [localhost:5004], running tasks: jshint...
--------------------------------------------------------------------------------
  Running "jshint:files" (jshint) task
  >> 2 files lint free.

  Done, without errors.
--------------------------------------------------------------------------------

Done, without errors.
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Lint and test your code using [grunt][grunt].

## Release History
* 0.1.2 - Grunt v0.4 support.
* 0.1.1 - Pass client cli args along to server
* 0.1.0 - Initial release

## License
Copyright (c) 2012 Kyle Robinson Young
Licensed under the MIT license.


[grunt]: https://github.com/gruntjs/grunt
[getting_started]: https://github.com/gruntjs/grunt/wiki/Getting-started
