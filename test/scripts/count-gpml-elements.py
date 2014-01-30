import StringIO, json
from lxml import etree
from json import dumps, load

data = {}

pathways = ['anchors', 'citations', 'curves', 'elbows', 'fill-and-stroke', 'gpml-data-nodes', 'gpml-labels', 'graphical-lines', 'groups', 'interactions', 'shapes', 'size-and-proportion', 'text', 'z-index']
for pathway in pathways:
	data[pathway] = {}
	tree = etree.parse("http://localhost:3000/test/data/protocol/" + pathway + ".gpml.xml")
	elementTags = ['DataNode', 'Label', 'Shape', 'Interaction', 'GraphicalLine', 'Group']
	for elementTag in elementTags:
		elements = tree.xpath('//foo:' + elementTag, namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		elementCount = len(elements)
		data[pathway][elementTag + 'Count'] = elementCount

	dataNodeTypes = ['GeneProduct', 'Metabolite', 'Protein', 'Unknown', 'Pathway']
	for dataNodeType in dataNodeTypes:
		dataNodeTypes = tree.xpath('//foo:DataNode[@Type="' + dataNodeType + '"]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		dataNodeTypeCount = len(dataNodeTypes)
		data[pathway][dataNodeType + 'Count'] = dataNodeTypeCount

with open('../data/protocol/counts.json', 'w') as outfile:
	json.dump(data, outfile, indent = 4)
