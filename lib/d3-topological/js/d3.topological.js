d3.topological = function() {
  	var topological = {},
  		nodes = {};

	topological.nodes = function(_) {
		if (!arguments.length) return nodes;
		nodes = _;
		return topological;
	};

	topological.sort = function() {
		var number = {
			value: 0,
		};
		
		nodes.forEach(function(node) {
			node.color = 'white';
		});
		
		nodes.forEach(function(node) {
			if (node.color == 'white') {
				topologicalDFS(node, number)
			}
		});
		
		return topological;
	};
	
	function topologicalDFS(node, number) {
		node.color = 'gray';
		node.dependencies.forEach(function(key) {
			if (nodes[key].color == 'white') {
				topologicalDFS(nodes[key], number);
			}
		});
		node.number = number.value++;
		node.color = 'black';
	}

	return topological;
};
