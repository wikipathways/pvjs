import StringIO, json
from lxml import etree
from json import dumps, load

data = {}

pathways = ['anchors', 'citations', 'curves', 'elbows', 'fill-and-stroke', 'gpml-data-nodes', 'gpml-labels', 'graphical-lines', 'groups', 'interactions', 'shapes', 'size-and-proportion', 'text', 'z-index']
for pathway in pathways:
	data[pathway] = {}
	tree = etree.parse("http://localhost:3000/test/data/protocol/" + pathway + ".gpml.xml")

	elementTags = ['DataNode', 'Label', 'Shape', 'Interaction', 'GraphicalLine']
	for elementTag in elementTags:
		elements = tree.xpath('//foo:' + elementTag, namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		elementCount = len(elements)
		data[pathway][elementTag + 'Count'] = elementCount

	groups = tree.xpath('//foo:Group', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
	GroupCount = 0
	for group in groups:
		groupId = group.attrib['GroupId']
		groupContainsCount = tree.xpath('//foo:*[@GroupRef="' + groupId + '"]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		if len( groupContainsCount ) > 0:
			GroupCount = GroupCount + 1
	data[pathway]['GroupCount'] = GroupCount

	DataNodeUnknownCount = data[pathway]['DataNodeCount']
	dataNodeTypes = ['GeneProduct', 'Metabolite', 'Protein', 'Pathway', 'Rna']
	for dataNodeType in dataNodeTypes:
		dataNodeTypes = tree.xpath('//foo:DataNode[@Type="' + dataNodeType + '"]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		dataNodeTypeCount = len(dataNodeTypes)
		data[pathway]['DataNode' + dataNodeType + 'Count'] = dataNodeTypeCount
		DataNodeUnknownCount = DataNodeUnknownCount - dataNodeTypeCount

	data[pathway]['DataNodeUnknownCount'] = DataNodeUnknownCount

	edgeCount = data[pathway]['InteractionCount'] + data[pathway]['GraphicalLineCount'] 
	data[pathway]['EdgeCount'] = edgeCount

	edgeAnchors = tree.xpath('//foo:Anchor', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
	edgeAnchorCount = len(edgeAnchors)
	data[pathway]['EdgeAnchorCount'] = edgeAnchorCount

	nodeCount = data[pathway]['DataNodeCount'] + data[pathway]['ShapeCount'] + data[pathway]['LabelCount'] + data[pathway]['GroupCount']
	data[pathway]['NodeCount'] = nodeCount

	nodeAnchorCount = nodeCount * 12
	data[pathway]['NodeAnchorCount'] = nodeAnchorCount

	data[pathway]['AnchorCount'] = nodeAnchorCount + edgeAnchorCount

	data[pathway]['InfoBoxCount'] = 1

with open('../data/protocol/counts.json', 'w') as outfile:
	json.dump(data, outfile, indent = 4)
