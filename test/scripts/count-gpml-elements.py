from lxml import etree
import StringIO
tree = etree.parse("http://localhost:3000/test/data/protocol/elbows.gpml.xml")
species = tree.xpath('/foo:Pathway/@Organism', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
dataNodes = tree.xpath('//foo:DataNode', namespaces={'foo': 'http://pathvisio.org/GPML/2013a'})
print(species)
print( len( dataNodes ) )
