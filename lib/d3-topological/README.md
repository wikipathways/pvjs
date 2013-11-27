# D3 Topological Sort

A demo with explanation and usage example can be found [here](http://davidstutz.github.com/d3-topological/).

## Usage

For details see the demo.

The data should be given as follows:

	[
		{
			"label": "choosing clothes",
			"dependencies": [8]
		}, {
			"label": "dress",
			"dependencies": [0, 7]
		}, {
			"label": "eat breakfast",
			"dependencies": [4, 5, 6]
		}, {
			"label": "leave",
			"dependencies": [1, 2]
		}, {
			"label": "make office",
			"dependencies": [8]
		}, {
			"label": "make toast",
			"dependencies": [8]
		}, {
			"label": "pour juice",
			"dependencies": [8]
		}, {
			"label": "shower",
			"dependencies": [8]
		}, {
			"label": "wake up",
			"dependencies": []
		}
	]

Include d3.topological.js and:

	d3.json('data.json', function(nodes) {
		// The data is given as shown above.
		// The algorithm adds a number property to each node.
		// The number represents the position of the node in the topological sort.
		var topological = d3.topological()
			.nodes(nodes)
			.sort();
			
		// The nodes can now be sorted using their number.
		d3.ascending(nodes, function(a, b){ return a.number - b.number; })
	});

## License

Copyright (c) 2013, David Stutz
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
* Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
