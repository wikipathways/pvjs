import StringIO, json, os
from lxml import etree
from json import dumps, load

data = {}
targetDirectory = "../data/troublesome-pathways/"
#targetDirectory = "../data/protocol/"

for file in os.listdir(targetDirectory):
    if file.endswith("ml"):
        print file

	data[file] = {}
	tree = etree.parse(targetDirectory + file)

        totalPathwayChildElementCountExpected = 0
	elementTags = ['DataNode', 'Label', 'Shape', 'State', 'Interaction', 'GraphicalLine', 'Comment', 'Biopax', 'BiopaxRef', 'Graphics', 'InfoBox', 'Legend']
	for elementTag in elementTags:
		elements = tree.xpath('foo:' + elementTag, namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		elementCount = len(elements)
		data[file][elementTag + 'Count'] = elementCount
                totalPathwayChildElementCountExpected = totalPathwayChildElementCountExpected + elementCount

        # Getting group counts separately, because empty groups should not be counted.
	groups = tree.xpath('foo:Group', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
	GroupCount = 0
	for group in groups:
		groupId = group.attrib['GroupId']
		groupContainsCount = tree.xpath('//foo:*[@GroupRef="' + groupId + '"]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		if len( groupContainsCount ) > 0:
			GroupCount = GroupCount + 1
                        totalPathwayChildElementCountExpected = totalPathwayChildElementCountExpected + 1
	data[file]['GroupCount'] = GroupCount

	DataNodeUnknownCount = data[file]['DataNodeCount']
	dataNodeTypes = ['GeneProduct', 'Metabolite', 'Protein', 'Pathway', 'Rna']
	for dataNodeType in dataNodeTypes:
		dataNodeTypes = tree.xpath('//foo:DataNode[@Type="' + dataNodeType + '"]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		dataNodeTypeCount = len(dataNodeTypes)
		data[file]['DataNode' + dataNodeType + 'Count'] = dataNodeTypeCount
		DataNodeUnknownCount = DataNodeUnknownCount - dataNodeTypeCount
	data[file]['DataNodeUnknownCount'] = DataNodeUnknownCount

	edgeCount = data[file]['InteractionCount'] + data[file]['GraphicalLineCount'] 
	data[file]['EdgeCount'] = edgeCount

	edgeAnchors = tree.xpath('//foo:Anchor', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
	edgeAnchorCount = len(edgeAnchors)
	data[file]['EdgeAnchorCount'] = edgeAnchorCount

	nodeCount = data[file]['DataNodeCount'] + data[file]['StateCount'] + data[file]['ShapeCount'] + data[file]['LabelCount'] + data[file]['GroupCount']
	data[file]['NodeCount'] = nodeCount

	nodeAnchorCount = nodeCount * 12
	data[file]['NodeAnchorCount'] = nodeAnchorCount

	data[file]['AnchorCount'] = nodeAnchorCount + edgeAnchorCount

        # This is a test for the tester to see whether there are any element types that we're not considering.
        pathwayChildren = tree.xpath('//foo:Pathway/child::*', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
        totalPathwayChildElementCountObserved = len(pathwayChildren)
        if totalPathwayChildElementCountExpected != totalPathwayChildElementCountObserved:
            print "Wrong number of elements for "
            print file
            print "Not being counted: "
            print tree.xpath('*[not(self::foo:DataNode) and not(self::foo:Label) and not(self::foo:Shape) and not(self::foo:State) and not(self::foo:Interaction) and not(self::foo:GraphicalLine) and not(self::foo:Comment) and not(self::foo:Biopax) and not(self::foo:BiopaxRef) and not(self::foo:Graphics) and not(self::foo:InfoBox) and not(self::foo:Group)]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})

splitTargetDirectoryName = targetDirectory.split("/")
directoryName = splitTargetDirectoryName[len(splitTargetDirectoryName) - 2]
countFileName = directoryName + "-element-counts"
with open('../data/' + countFileName + '.json', 'w') as outfile:
	json.dump(data, outfile, indent = 4)
