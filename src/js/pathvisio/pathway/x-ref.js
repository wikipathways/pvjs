pathvisio.pathway.xRef = function(){ 

  var dataSources = [{"database":"Affy","id":"X","url":"https://www.affymetrix.com/LinkServlet?probeset=$id","name":"Affymetrix Probeset"},
    {"database":"Agilent","id":"Ag","url":"","name":"Agilent"},
    {"database":"BIND","id":"Bi","url":"http://www.bind.ca/Action?identifier=bindid&idsearch=$id","name":"BIND"},
    {"database":"BioCyc","id":"Bc","url":"http://biocyc.org/getid?id=$id","name":"BioCyc"},
    {"database":"BioGrid","id":"Bg","url":"http://thebiogrid.org/$id","name":"BioGRID"},
    {"database":"BioModels Database","id":"Bm","url":"http://www.ebi.ac.uk/biomodels-main/$id","name":"BioModels Database"},
    {"database":"BioSystems","id":"Bs","url":"http://www.ncbi.nlm.nih.gov/biosystems/$id","name":"BioSystems"},
    {"database":"BRENDA","id":"Br","url":"http://www.brenda-enzymes.org/php/result_flat.php4?ecno=$id","name":"BRENDA"},
    {"database":"CAS","id":"Ca","url":"http://commonchemistry.org/ChemicalDetail.aspx?ref=$id","name":"CAS"},
    {"database":"CCDS","id":"Cc","url":"http://www.ncbi.nlm.nih.gov/CCDS/CcdsBrowse.cgi?REQUEST=ALLFIELDS&DATA=$id","name":"CCDS"},
    {"database":"ChEBI","id":"Ce","url":"http://www.ebi.ac.uk/chebi/searchId.do?chebiId=$id","name":"ChEBI"},
    {"database":"Chemspider","id":"Cs","url":"http://www.chemspider.com/Chemical-Structure.$id.html","name":"ChemSpider"},
    {"database":"CodeLink","id":"Ge","url":"","name":"CodeLink"},
    {"database":"Database of Interacting Proteins","id":"Dip","url":"http://dip.doe-mbi.ucla.edu/dip/DIPview.cgi?ID=$id","name":"Database of Interacting Proteins"},
    {"database":"dbSNP","id":"Sn","url":"http://www.ncbi.nlm.nih.gov/projects/SNP/snp_ref.cgi?rs=$id","name":"dbSNP"},
    {"database":"DrugBank","id":"Dr","url":"http://www.drugbank.ca/drugs/$id","name":"DrugBank"},
    {"database":"EcoCyc","id":"Eco","url":"http://ecocyc.org/ECOLI/NEW-IMAGE?type=NIL&object=$id","name":"EcoCyc"},
    {"database":"EcoGene","id":"Ec","url":"http://ecogene.org/geneInfo.php?eg_id=$id","name":"EcoGene"},
    {"database":"EMBL","id":"Em","url":"http://www.ebi.ac.uk/ena/data/view/$id","name":"European Nucleotide Archive"},
    {"database":"Ensembl","id":"En","url":"http://www.ensembl.org/id/$id","name":"Ensembl"},
    {"database":"Ensembl B. subtilis","id":"EnBs","url":"http://bacteria.ensembl.org/Bacillus/B_subtilis/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl C. elegans","id":"EnCe","url":"http://www.ensembl.org/Caenorhabditis_elegans/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Chicken","id":"EnGg","url":"http://www.ensembl.org/Gallus_gallus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Chimp","id":"EnPt","url":"http://www.ensembl.org/Pan_troglodytes/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Cow","id":"EnBt","url":"http://www.ensembl.org/Bos_taurus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Dog","id":"EnCf","url":"http://www.ensembl.org/Canis_familiaris/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl E. coli","id":"EnEc","url":"http://bacteria.ensembl.org/Escherichia_Shigella/E_coli_K12/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Fruitfly","id":"EnDm","url":"http://www.ensembl.org/Drosophila_melanogaster/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Horse","id":"EnQc","url":"http://www.ensembl.org/Equus_caballus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Human","id":"EnHs","url":"http://www.ensembl.org/Homo_sapiens/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl M. tuberculosis","id":"EnMx","url":"http://bacteria.ensembl.org/Mycobacterium/M_tuberculosis_H37Rv/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Mosquito","id":"EnAg","url":"http://www.ensembl.org/Anopheles_gambiae/Gene/Summary?_q=$id","name":"Ensembl"},
    {"database":"Ensembl Mouse","id":"EnMm","url":"http://www.ensembl.org/Mus_musculus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Pig","id":"EnSs","url":"http://www.ensembl.org/Sus_scrofa/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Plants","id":"EP","url":"http://plants.ensembl.org/id/$id","name":"Ensembl Plants"},
    {"database":"Ensembl Rat","id":"EnRn","url":"http://www.ensembl.org/Rattus_norvegicus/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Xenopus","id":"EnXt","url":"http://www.ensembl.org/Xenopus_tropicalis/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Yeast","id":"EnSc","url":"http://www.ensembl.org/Saccharomyces_cerevisiae/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Ensembl Zebrafish","id":"EnDr","url":"http://www.ensembl.org/Danio_rerio/Gene/Summary?g=$id","name":"Ensembl"},
    {"database":"Entrez Gene","id":"L","url":"http://www.ncbi.nlm.nih.gov/gene/$id","name":"Entrez Gene"},
    {"database":"Enzyme Nomenclature","id":"E","url":"http://www.ebi.ac.uk/intenz/query?cmd=SearchEC&ec=$id","name":"Enzyme Nomenclature"},
    {"database":"FlyBase","id":"F","url":"http://flybase.org/reports/$id.html","name":"FlyBase"},
    {"database":"GenBank","id":"G","url":"http://www.ncbi.nlm.nih.gov/nuccore/$id","name":"GenBank"},
    {"database":"Gene Wiki","id":"Gw","url":"http://plugins.biogps.org/cgi-bin/wp.cgi?id=$id","name":"Gene Wiki"},
    {"database":"GeneOntology","id":"T","url":"http://www.ebi.ac.uk/QuickGO/GTerm?id=$id","name":"Gene Ontology"},
    {"database":"Gramene Arabidopsis","id":"EnAt","url":"http://www.gramene.org/Arabidopsis_thaliana/Gene/Summary?g=$id","name":"Grameen Arabidopsis"},
    {"database":"Gramene Genes DB","id":"Gg","url":"http://www.gramene.org/db/genes/search_gene?acc=$id","name":"Gramene Genes"},
    {"database":"Gramene Literature","id":"Gl","url":"http://www.gramene.org/db/literature/pub_search?ref_id=$id","name":"Gramene Literature"},
    {"database":"Gramene Maize","id":"EnZm","url":"http://www.maizesequence.org/Zea_mays/Gene/Summary?g=$id","name":"Gramene Maize"},
    {"database":"Gramene Pathway","id":"Gp","url":"","name":"Gramene Pathway"},
    {"database":"Gramene Rice","id":"EnOj","url":"http://www.gramene.org/Oryza_sativa/Gene/Summary?db=core;g=$id","name":"Gramene Rice"},
    {"database":"HGNC","id":"H","url":"http://www.genenames.org/data/hgnc_data.php?match=$id","name":"HGNC Symbol"},
    {"database":"HGNC Accession number","id":"Hac","url":"http://www.genenames.org/data/hgnc_data.php?hgnc_id=$id","name":"HGNC"},
    {"database":"HMDB","id":"Ch","url":"http://www.hmdb.ca/metabolites/$id","name":"HMDB"},
    {"database":"HomoloGene","id":"Hg","url":"http://www.ncbi.nlm.nih.gov/homologene/$id","name":"HomoloGene"},
    {"database":"HPRD","id":"Hp","url":"","name":"HPRD"},
    {"database":"Illumina","id":"Il","url":"","name":"Illumina"},
    {"database":"IntAct","id":"Ia","url":"http://www.ebi.ac.uk/intact/pages/details/details.xhtml?interactionAc=$id","name":"IntAct"},
    {"database":"InterPro","id":"I","url":"http://www.ebi.ac.uk/interpro/DisplayIproEntry?ac=$id","name":"InterPro"},
    {"database":"IPI","id":"Ip","url":"http://www.ebi.ac.uk/cgi-bin/dbfetch?db=IPI&id=$id&format=default","name":"IPI"},
    {"database":"IRGSP Gene","id":"Ir","url":"","name":"IRGSP Gene"},
    {"database":"Kegg Compound","id":"Ck","url":"http://www.genome.jp/dbget-bin/www_bget?cpd:$id","name":"KEGG Compound"},
    {"database":"KEGG Drug","id":"Kd","url":"http://www.genome.jp/dbget-bin/www_bget?dr:$id","name":"KEGG Drug"},
    {"database":"KEGG Genes","id":"Kg","url":"http://www.genome.jp/dbget-bin/www_bget?$id","name":"KEGG Genes"},
    {"database":"KEGG Glycan","id":"Kgl","url":"http://www.genome.jp/dbget-bin/www_bget?gl:$id","name":"KEGG Glycan"},
    {"database":"KEGG Pathway","id":"Kp","url":"http://www.genome.jp/dbget-bin/www_bget?pathway+$id","name":"KEGG Pathway"},
    {"database":"KEGG Reaction","id":"Kr","url":"http://www.genome.jp/dbget-bin/www_bget?rn:$id","name":"KEGG Reaction"},
    {"database":"LIPID MAPS","id":"Lm","url":"http://www.lipidmaps.org/data/get_lm_lipids_dbgif.php?LM_ID=$id","name":"LIPID MAPS"},
    {"database":"LipidBank","id":"Lb","url":"http://lipidbank.jp/cgi-bin/detail.cgi?id=$id","name":"LipidBank"},
    {"database":"MACiE","id":"Ma","url":"http://www.ebi.ac.uk/thornton-srv/databases/cgi-bin/MACiE/entry/getPage.pl?id=$id","name":"MACiE"},
    {"database":"MaizeGDB","id":"Mg","url":"http://www.maizegdb.org/cgi-bin/displaylocusresults.cgi?term=$id","name":"MaizeGDB"},
    {"database":"MatrixDB","id":"Md","url":"http://matrixdb.ibcp.fr/cgi-bin/model/report/default?name=$id&class=Association","name":"MatrixDB"},
    {"database":"MetaCyc","id":"Mc","url":"http://www.metacyc.org/META/NEW-IMAGE?type=NIL&object=$id","name":"MetaCyc"},
    {"database":"MGI","id":"M","url":"http://www.informatics.jax.org/marker/$id","name":"Mouse Genome Database"},
    {"database":"MINT","id":"Mi","url":"http://mint.bio.uniroma2.it/mint/search/inFrameInteraction.do?interactionAc=$id","name":"MINT"},
    {"database":"miRBase mature sequence","id":"Mbm","url":"http://www.mirbase.org/cgi-bin/mature.pl?mature_acc=$id","name":"miRBase mature sequence"},
    {"database":"miRBase Sequence","id":"Mb","url":"http://microrna.sanger.ac.uk/cgi-bin/sequences/mirna_entry.pl?acc=$id","name":"miRBase Sequence"},
    {"database":"NASC Gene","id":"N","url":"","name":"NASC Gene"},
    {"database":"NCBI Protein","id":"Np","url":"http://www.ncbi.nlm.nih.gov/protein/$id","name":"NCBI Protein"},
    {"database":"NCI Pathway Interaction Database","id":"Pid","url":"http://pid.nci.nih.gov/search/pathway_landing.shtml?what=graphic&jpg=on&pathway_id=$id","name":"NCI Pathway Interaction Database"},
    {"database":"NuGO wiki","id":"Nw","url":"http://wiki.nugo.org/index.php/$id","name":"NuGO wiki"},
    {"database":"OMIM","id":"Om","url":"http://omim.org/entry/$id","name":"OMIM"},
    {"database":"Oryzabase","id":"Ob","url":"http://www.shigen.nig.ac.jp/rice/oryzabase/gateway/gatewayAction.do?target=symbol&id=$id","name":"Oryzabase"},
    {"database":"Other","id":"O","url":"","name":"Other"},
    {"database":"Pathway Commons","id":"Pc","url":"http://www.pathwaycommons.org/pc/record2.do?id=$id","name":"Pathway Commons"},
    {"database":"PDB","id":"Pd","url":"http://www.rcsb.org/pdb/explore/explore.do?structureId=$id","name":"Protein Data Bank"},
    {"database":"Pfam","id":"Pf","url":"http://pfam.sanger.ac.uk/family/$id/","name":"Pfam"},
    {"database":"PharmGKB Drug","id":"Pgd","url":"http://www.pharmgkb.org/drug/$id","name":"PharmGKB Drug"},
    {"database":"PharmGKB Gene","id":"Pgg","url":"http://www.pharmgkb.org/gene/$id","name":"PharmGKB Gene"},
    {"database":"PharmGKB Pathways","id":"Pgp","url":"http://www.pharmgkb.org/pathway/$id","name":"PharmGKB Pathways"},
    {"database":"PhosphoSite Protein","id":"Pp","url":"http://www.phosphosite.org/proteinAction.do?id=$id","name":"PhosphoSite Protein"},
    {"database":"PINA","id":"Pi","url":"http://cbg.garvan.unsw.edu.au/pina/interactome.oneP.do?ac=$id&showExtend=null","name":"PINA"},
    {"database":"PlantGDB","id":"Pl","url":"","name":"PlantGDB"},
    {"database":"PubChem-bioassay","id":"Cpb","url":"http://pubchem.ncbi.nlm.nih.gov/assay/assay.cgi?aid=$id","name":"PubChem-bioassay"},
    {"database":"PubChem-compound","id":"Cpc","url":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?cid=$id","name":"PubChem-compound"},
    {"database":"PubChem-substance","id":"Cps","url":"http://pubchem.ncbi.nlm.nih.gov/summary/summary.cgi?sid=$id","name":"PubChem-substance"},
    {"database":"Reactome","id":"Re","url":"http://www.reactome.org/cgi-bin/eventbrowser_st_id?FROM_REACTOME=1&ST_ID=$id","name":"Reactome"},
    {"database":"RefSeq","id":"Q","url":"http://www.ncbi.nlm.nih.gov/entrez/viewer.fcgi?val=$id","name":"RefSeq"},
    {"database":"RESID","id":"Res","url":"http://srs.ebi.ac.uk/srsbin/cgi-bin/wgetz?-id+6JSUg1NA6u4+-e+[RESID:'$id']","name":"RESID"},
    {"database":"Rfam","id":"Rf","url":"http://www.sanger.ac.uk/cgi-bin/Rfam/getacc?$id","name":"RFAM"},
    {"database":"RGD","id":"R","url":"http://rgd.mcw.edu/tools/genes/genes_view.cgi?id=$id","name":"Rat Genome Database"},
    {"database":"Rhea","id":"Rh","url":"http://www.ebi.ac.uk/rhea/reaction.xhtml?id=$id","name":"Rhea"},
    {"database":"Rice Ensembl Gene","id":"Os","url":"http://www.gramene.org/Oryza_sativa/geneview?gene=$id","name":"Rice Ensembl Gene"},
    {"database":"SGD","id":"D","url":"http://www.yeastgenome.org/cgi-bin/locus.fpl?dbid=$id","name":"SGD"},
    {"database":"Small Molecule Pathway Database","id":"Sm","url":"http://pathman.smpdb.ca/pathways/$id/pathway","name":"Small Molecule Pathway Database"},
    {"database":"SMART","id":"Sma","url":"http://smart.embl-heidelberg.de/smart/do_annotation.pl?DOMAIN=$id","name":"SMART"},
    {"database":"SPIKE","id":"Sk","url":"http://www.cs.tau.ac.il/~spike/maps/$id.html","name":"SPIKE Map"},
    {"database":"SPRINT","id":"Spr","url":"http://www.bioinf.manchester.ac.uk/cgi-bin/dbbrowser/sprint/searchprintss.cgi?prints_accn=$id&display_opts=Prints&category=None&queryform=false&regexpr=off","name":"SPRINT"},
    {"database":"STRING","id":"Str","url":"http://string.embl.de/interactions/$id","name":"STRING"},
    {"database":"SubstrateDB","id":"Sdb","url":"http://substrate.burnham.org/protein/annotation/$id/html","name":"SubstrateDB"},
    {"database":"SubtiWiki","id":"Sw","url":"http://www.subtiwiki.uni-goettingen.de/wiki/index.php/$id","name":"SubtiWiki"},
    {"database":"SUPFAM","id":"Sf","url":"http://supfam.org/SUPERFAMILY/cgi-bin/scop.cgi?ipid=$id","name":"SUPFAM"},
    {"database":"SWISS-MODEL","id":"Sw","url":"http://swissmodel.expasy.org/repository/smr.php?sptr_ac=$id","name":"SWISS-MODEL"},
    {"database":"Systems Biology Ontology","id":"Sbo","url":"http://www.ebi.ac.uk/sbo/main/$id","name":"Systems Biology Ontology"},
    {"database":"TAIR","id":"A","url":"http://arabidopsis.org/servlets/TairObject?type=locus&name=$id","name":"TAIR Locus"},
    {"database":"TIGR","id":"Ti","url":"","name":"TIGR"},
    {"database":"TTD Drug","id":"Td","url":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDRUG.asp?ID=$id","name":"TTD Drug"},
    {"database":"TTD Target","id":"Tt","url":"http://bidd.nus.edu.sg/group/cjttd/ZFTTDDetail.asp?ID=$id","name":"TTD Target"},
    {"database":"TubercuList","id":"Tb","url":"http://tuberculist.epfl.ch/quicksearch.php?gene+name=$id","name":"TubercuList"},
    {"database":"UCSC Genome Browser","id":"Uc","url":"http://genome.ucsc.edu/cgi-bin/hgTracks?position=$id","name":"UCSC Genome Browser"},
    {"database":"UniGene","id":"U","url":"http://www.ncbi.nlm.nih.gov/UniGene/clust.cgi?UGID=1548618&SEARCH=$id","name":"UniGene"},
    {"database":"Unipathway","id":"Up","url":"http://www.grenoble.prabi.fr/obiwarehouse/unipathway/upa?upid=$id","name":"Unipathway"},
    {"database":"Uniprot-TrEMBL","id":"S","url":"http://www.uniprot.org/uniprot/$id","name":"UniProtKB/TrEMBL"},
    {"database":"Uniprot-SwissProt","id":"Sp","url":"http://www.uniprot.org/uniprot/$id","name":"UniProtKB/Swiss-Prot"},
    {"database":"Wheat gene names","id":"Wn","url":"http://wheat.pw.usda.gov/report?class=gene;name=$id","name":"Wheat gene names"},
    {"database":"Wheat gene refs","id":"Wr","url":"http://wheat.pw.usda.gov/cgi-bin/graingenes/report.cgi?class=reference&name=$id","name":"Wheat gene refs"},
    {"database":"WikiGenes","id":"Wg","url":"http://www.wikigenes.org/e/gene/e/$id.html","name":"WikiGenes"},
    {"database":"WikiPathways","id":"Wp","url":"http://www.wikipathways.org/index.php/Pathway:$id","name":"WikiPathways"},
    {"database":"Wikipedia","id":"Wi","url":"http://en.wikipedia.org/wiki/$id","name":"Wikipedia"},
    {"database":"WormBase","id":"W","url":"http://www.wormbase.org/db/gene/gene?name=$id;class=Gene","name":"WormBase"},
    {"database":"ZFIN","id":"Z","url":"http://zfin.org/action/marker/view/$id","name":"ZFIN Gene"}];

    function getData(species, database, id, callback) {
      var databaseId = dataSources.filter(function(element) {return element.database === database})[0].id;
      var url = '../data/xrefs.php?species=' + encodeURIComponent(species) + '&database=' + encodeURIComponent(databaseId) + '&id=' + encodeURIComponent(id);
      console.log('url');
      console.log(url);
      $.ajax({
        url: url,
        dataType: "text",
        success: function(data) {console.log(data); self.data = data; callback(data);}
      });
    };

    function displayData(id) {
      var pathway = pathvisio.data.pathways[pathvisio.data.current.svgSelector];
      var node = pathway.nodes.filter(function(element) {return element.graphId == id })[0];
      var xRefData = getData(pathway.organism, node.xRef.database, node.xRef.id, function(data) {
        var parser = CSVParser.parse(data, true, ' ', false, false, '.');
        var parsed = DataGridRenderer.json(parser.dataGrid, parser.headerNames, parser.headerTypes,'\t','\n');
        var xRefDataParsed = self.xRefDataParsed = JSON.parse(parsed);
        console.log(xRefDataParsed);
        var features = {
          "id": node.dataNodeType + ' ' + node.textLabel.text,
          "description": node.xRef.database + ' ' + node.xRef.id
        };

        xRefDataParsed.forEach(function(element) {
          features[element.database] = element.id;
        });

        var detailsFrame = d3.select('#detailsFrame');
        detailsFrame[0][0].style.visibility = 'visible';

        if (!Biojs.DetailsFrame.set) {
          Biojs.DetailsFrame.set = true;
          Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
            target: "detailsFrame",
            features: features 
          });
        }
        else {

          // hack for making this work in IE8.
          // Biojs.detailsFrame.instance.updateFeatures() did not appear to work in IE8,
          // so I am just emptying the detailsFrame div and building a new one.

          detailsFrame.selectAll('*').remove();
          Biojs.DetailsFrame.instance = new Biojs.DetailsFrame({
            target: "detailsFrame",
            features: features 
          });
          /*
             Biojs.DetailsFrame.instance.updateFeatures({id: this.getAttribute('id'),
description:"new description",
newFeature:"its value",
otherFeature:"another value"});
*/
        };
      });
    };

    return { 
      getData:getData,
      displayData:displayData, 
    } 
}();
