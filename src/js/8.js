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
    "media":"http://www.w3.org/TR/mediaont-10/",
    "pathwayElements": {
      "@id": "http://www.example.com/pathwayElements/",
      "@container": "@list"
    },
    "points": {
      "@id": "gpml:Point",
      "@container": "@list"
    }
  },
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
    "pathwayElements":[
      {
        "@id": "wpid:2341#e95ec",
        "wp:DatasourceReference": "ChEBI:9533",
        "@type": "wp:Metabolite",
        "wp:Label": "thiamine monophosphate"
      },
      {
        "@id": "wpid:2341#d494c",
        "wp:DatasourceReference": "ChEBI:26948",
        "@type": "wp:Metabolite",
        "wp:Label": "thiamine"
      },
      {
        "@id": "wpid:2341#f4d55",
        "wp:DatasourceReference": "MaizeGDB:GRMZM2G057140",
        "@type": "wp:GeneProduct",
        "wp:Label": "thiamine monophosphate phosphatase (ThMPase)"
      },
      {
        "@id": "wpid:2341#c8917",
        "wp:DatasourceReference": "ChEBI:15377",
        "@type": "wp:Metabolite",
        "wp:Label": "water"
      },
      {
        "@id": "wpid:2341#a65cf",
        "wp:DatasourceReference": "ChEBI:26078",
        "@type": "wp:Metabolite",
        "wp:Label": "phosphoric acid"
      },
      {
        "@id": "wpid:2341#d7d46",
        "@type": "wp:Metabolite",
        "wp:Label": "Metabolite"
      },
      {
        "@id": "wpid:2341#b7019",
        "@type": "wp:Metabolite",
        "wp:Label": "substrate1"
      },
      {
        "@id": "wpid:2341#a3369",
        "@type": "wp:Metabolite",
        "wp:Label": "product1"
      },
      {
        "@id": "wpid:2341#a11de",
        "@type": "wp:Interaction",
        "gpml:connectorType": "gpml:Straight",
        "points":
        [
          {
            "@id": "wpid:2341#e95ec",
            "sourcePosition":{
              "gpml:relX": 0,
              "gpml:relY": 1
            },
            "wp:Activity": "wpid:2341#d494c",
            "targetPosition":{
              "gpml:relX": 0,
              "gpml:relY": -1
            }
          }
        ]
      },
      {
        "@id": "wpid:2341#e9026",
        "@type": "gpml:ReactionAnchor",
        "position":{
          "target": "wpid:2341#a11de",
          "gpml:anchorPosition": 0.4
        }
      },
      {
        "@id": "wpid:2341#edf60",
        "@type": "wp:Interaction",
        "gpml:connectorType": "gpml:Straight",
        "points":
        [
          {
            "@id": "wpid:2341#f4d55",
            "sourcePosition":{
              "gpml:relX": 1,
              "gpml:relY": 0
            },
            "wp:mim-catalysis": "wpid:2341#e9026",
            "targetPosition":{
              "gpml:relX": 0,
              "gpml:relY": 0
            }
          }
        ]
      },
      {
        "@id": "wpid:2341#e9df8",
        "@type": "wp:Interaction",
        "gpml:connectorType": "gpml:Straight",
        "points":
        [
          {
            "@id": "wpid:2341#c8917",
            "sourcePosition":{
              "gpml:relX": -1,
              "gpml:relY": 0
            },
            "wp:Interaction": "wpid:2341#e9026",
            "targetPosition":{
              "gpml:relX": 0,
              "gpml:relY": 0
            }
          }
        ]
      },
      {
        "@id": "wpid:2341#id3e7e4362",
        "@type": "wp:Interaction",
        "gpml:connectorType": "gpml:Straight",
        "points":
        [
          {
            "@id": "wpid:2341#d7d46",
            "sourcePosition":{
              "gpml:relX": 0,
              "gpml:relY": 1
            },
            "wp:InhibitoryActivity": "wpid:2341#edf60",
            "targetPosition":{
              "gpml:anchorPosition": 0.15
            }
          }
        ]
      },
      {
        "@id": "wpid:2341#abb2a",
        "@type": "wp:Interaction",
        "interactionType": "wp:Activity",
        "gpml:connectorType": "gpml:Straight",
        "points":
        [
          {
            "source": "wpid:2341#e9026",
            "sourcePosition":{
              "gpml:relX": 0,
              "gpml:relY": 0
            },
            "target": "wpid:2341#a65cf",
            "targetPosition":{
              "gpml:relX": -1,
              "gpml:relY": 0
            }
          }
        ]
      },
      {
        "@id": "wpid:2341#id3e7e4362",
        "@type": "wp:Interaction",
        "interactionType": "wp:Activity",
        "gpml:connectorType": "gpml:Segmented",
        "points":
        [
          {
            "source": "wpid:2341#b7019",
            "sourcePosition":{
              "gpml:relX": 0,
              "gpml:relY": 1
            },
            "target": "wpid:2341#e9026",
            "targetPosition":{
              "gpml:relX": 0,
              "gpml:relY": 0
            }
          },
          {
            "source": "wpid:2341#e9026",
            "sourcePosition":{
              "gpml:relX": 0,
              "gpml:relY": 0
            },
            "target": "wpid:2341#a3369",
            "targetPosition":{
              "gpml:relX": 0,
              "gpml:relY": -1
            }
          }
        ]
      }
    ]
  }
}

