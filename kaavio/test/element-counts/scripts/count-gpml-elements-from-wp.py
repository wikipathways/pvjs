import StringIO, json
from lxml import etree
from json import dumps, load

data = {}
fails = {}

pathwayListXml = etree.parse("./listPathways.xml")
allPathways = pathwayListXml.xpath('/ns1:listPathwaysResponse//ns1:pathways', namespaces={'ns1': 'http://www.wso2.org/php/xsd','ns2': 'http://www.wikipathways.org/webservice'})[0]

pathwayIdElements = allPathways.xpath('//ns2:id', namespaces={'ns1': 'http://www.wso2.org/php/xsd','ns2': 'http://www.wikipathways.org/webservice'})
#pathwayIdElements = pathwayIdElements[:10]

#pathways = ['anchors', 'citations', 'curves', 'elbows', 'fill-and-stroke', 'gpml-data-nodes', 'gpml-labels', 'graphical-lines', 'groups', 'interactions', 'shapes', 'size-and-proportion', 'text', 'z-index']
for pathwayIdElement in pathwayIdElements:
	try:
		pathwayId = pathwayIdElement.text
		print pathwayId
		data[pathwayId] = {}

		tree = etree.parse("http://www.wikipathways.org/wpi/webservice/webservice.php/getPathway?pwId=" + pathwayId)
		apiResponse = tree.xpath('/ns1:getPathwayResponse/ns1:pathway/ns2:gpml', namespaces={'ns1': 'http://www.wso2.org/php/xsd','ns2': 'http://www.wikipathways.org/webservice'})
		pathwayXml = StringIO.StringIO(apiResponse[0].text)
		pathwayTree = etree.parse(pathwayXml)

		elementTags = ['DataNode', 'Label', 'Shape', 'Interaction', 'GraphicalLine']
		for elementTag in elementTags:
			elements = pathwayTree.xpath('//foo:' + elementTag, namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
			elementCount = len(elements)
			data[pathwayId][elementTag + 'Count'] = elementCount

		groups = pathwayTree.xpath('//foo:Group', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		GroupCount = 0
		for group in groups:
			groupId = group.attrib['GroupId']
			groupContainsCount = pathwayTree.xpath('//foo:*[@GroupRef="' + groupId + '"]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
			if len( groupContainsCount ) > 0:
				GroupCount = GroupCount + 1
		data[pathwayId]['GroupCount'] = GroupCount

		DataNodeUnknownCount = data[pathwayId]['DataNodeCount']
		dataNodeTypes = ['GeneProduct', 'Metabolite', 'Protein', 'Pathway', 'Rna']
		for dataNodeType in dataNodeTypes:
			dataNodeTypes = pathwayTree.xpath('//foo:DataNode[@Type="' + dataNodeType + '"]', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
			dataNodeTypeCount = len(dataNodeTypes)
			data[pathwayId]['DataNode' + dataNodeType + 'Count'] = dataNodeTypeCount
			DataNodeUnknownCount = DataNodeUnknownCount - dataNodeTypeCount

		data[pathwayId]['DataNodeUnknownCount'] = DataNodeUnknownCount

		edgeCount = data[pathwayId]['InteractionCount'] + data[pathwayId]['GraphicalLineCount'] 
		data[pathwayId]['EdgeCount'] = edgeCount

		edgeAnchors = pathwayTree.xpath('//foo:Anchor', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
		edgeAnchorCount = len(edgeAnchors)
		data[pathwayId]['EdgeAnchorCount'] = edgeAnchorCount

		nodeCount = data[pathwayId]['DataNodeCount'] + data[pathwayId]['ShapeCount'] + data[pathwayId]['LabelCount'] + data[pathwayId]['GroupCount']
		data[pathwayId]['NodeCount'] = nodeCount

		nodeAnchorCount = nodeCount * 12
		data[pathwayId]['NodeAnchorCount'] = nodeAnchorCount

		data[pathwayId]['AnchorCount'] = nodeAnchorCount + edgeAnchorCount

		data[pathwayId]['InfoBoxCount'] = 1
	except Exception:
		pass
		fails[pathwayId] = {}

with open('../data/protocol/wp-counts.json', 'w') as outfile:
	json.dump(data, outfile, indent = 4)
with open('../data/protocol/wp-fails.json', 'w') as outfile:
	json.dump(fails, outfile, indent = 4)
