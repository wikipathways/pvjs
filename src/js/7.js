{
  "@context":{
    "wp":"http://vocabularies.wikipathways.org/wp#",
    "wpid":"http://wikipathways.org/index.php/Pathway:WP",
    "gpml":"http://vocabularies.wikipathways.org/gpml#",
    "name":"http://xmlns.com/foaf/0.1/name",
    "dcterms":"http://purl.org/dc/terms/",
    "hMDB":"http://www.hmdb.ca/metabolites/HMDB",
    "entrezGene":"http://www.ncbi.nlm.nih.gov/gene/",
    "ChEBI":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=",
    "media":"http://www.w3.org/TR/mediaont-10/"
  },
  "@list":{
    "wpid:2341":{
      "@id":"wpid:528",
      "wp:Author":
      [
        {"@id":"Khanspers"},
        {"@id":"Pjaiswal"},
        {"@id":"Ariutta"}
      ],
      "media:frameSize":{
        "media:width":100,
        "media:height":50
      },
      "@graph":
      [
        {
          "@id": "wpid:2341#e95ec",
          "wp:DatasourceReference": "ChEBI:9533",
          "@type": "wp:Metabolite",
          "wp:Activity": "wpid:2341#d494c",
          "gpml:relX": 0,
          "gpml:relY": 1,
          "wp:Label": "thiamine monophosphate"
        },
        {
          "@id": "wpid:2341#d494c",
          "wp:DatasourceReference": "ChEBI:26948",
          "@type": "wp:Metabolite",
          "gpml:relX": 0,
          "gpml:relY": -1,
          "wp:Label": "thiamine"
        },





        {
          "@id": "hMDB:60501",
          "@type": "wp:Metabolite",
          "wp:Label": "Phosphatidylethanolamine",
          "wp:Stimulation": "entrezGene:10400"
        },
        {
          "@id": "entrezGene:10400",
          "@type": "wp:GeneProduct",
          "wp:Label": "PEMT"
        }
      ]
    },
    "wpid:528":{
      "@id":"wpid:528",
      "wp:Author":"Khanspers",
      "@graph":
      [
        {
          "@id": "hMDB:01413",
          "@type": "wp:Metabolite",
          "wp:Label": "Cytidine diphosphate choline",
          "wp:Stimulation": "hMDB:60501"
        },
        {
          "@id": "hMDB:60501",
          "@type": "wp:Metabolite",
          "wp:Label": "Phosphatidylethanolamine",
          "wp:Stimulation": "entrezGene:10400"
        },
        {
          "@id": "entrezGene:10400",
          "@type": "wp:GeneProduct",
          "wp:Label": "PEMT"
        }
      ]
    }
  }
}

