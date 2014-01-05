# Jasmine Commandline Tool
I've been working with jasmine a bit for client side BDD. I like it but didn't like the gem too much so I decided to give a try at rolling my own tool written for node.js. Will publish to npm soon.

## Installation instructions
This module is available for installation via npm. To install it simply type
	npm install jasmine-runner

## Usage

### jasmine init
Will create a new project structure in the current working directory with a few sample specs and source object

### jasmine run
Starts up the jasmine server to run specs from. Navigate to the url specified on the command line after running this command to manually run specs.

### jasmine mon
Starts the jasmine spec server up and monitors for file changes. Navigate to the url specified on the commandline to "capture" a browser. Now any file changes to specs or javascript files in the src_dir will make the browser automatically reload and rerun specs.

### jasmine ci
Fires up the server, spawns a browser pointed to the test server, captures the resutls and shuts down. Ideal for CI systems.

(This feature may be fuzzy until it gets reworked... the current implementation is inflexible)

## Configuration
{project dir}/spec/support/jasmine.json is a configuration file that can be used to configure the runner. Here are a break down of the fields that the runner pays attention to:

### src_dir
Specifies where to load source files from

### spec_dir
Specifies where to load specs from

### externals
An array of miscelanious scripts to include, like jquery

### sever
configuration details for the server, such as port


## Missing a Feature?
Let me know! You can see my current backlog at https://www.pivotaltracker.com/projects/156137

