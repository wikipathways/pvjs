/* generated javascript */
var skin = 'wikipathways';
var stylepath = '/skins';

/* MediaWiki:Common.js */
/* Any JavaScript here will be loaded for all users on every page load. */

/*
* Collapsible tables
*/
var toggleRows_hide= new Object();
function toggleRows(tableId, tag, msgCollapsed, msgExpanded, nrows, initHide) {
	if(typeof toggleRows_hide[tableId] == 'undefined') {
		toggleRows_hide[tableId] = !initHide;
	}
	
	tbl = document.getElementById(tableId);
	var len = tbl.rows.length;
	
	var hide = toggleRows_hide[tableId];
	var vStyle = (hide)? "none":"";
	for(i=nrows; i<len; i++){
		 tbl.rows[i].style.display = vStyle;
	}

	if(hide)
		tag.innerHTML = msgCollapsed;
	else
		tag.innerHTML = msgExpanded;
	toggleRows_hide[tableId]=!hide;
}

/* hide heading on [[WikiPathways]] */
   var mpTitle = "WikiPathways";
   var isMainPage = (document.title.substr(0, document.title.lastIndexOf(" - ")) == mpTitle);
   var isDiff = (document.location.search && (document.location.search.indexOf("diff=") != -1 || document.location.search.indexOf("oldid=") != -1));

   if (isMainPage && !isDiff) {
      document.write('<style type="text/css">/*<![CDATA[*/ #lastmod, #siteSub, #contentSub, h1.firstHeading { display: none !important; } /*]]>*/</style>');
   }

/* Customize toolbox */
function ModifySidebar(action, section, name, link) {
    try {
        switch (section) {
          case "languages":
            var target = "p-lang";
            break;
          case "toolbox":
            var target = "p-tb";
            break;
          case "navigation":
            var target = "p-navigation";
            break;
          default:
            var target = "p-" + section;
            break;
        }
 
        if (action == "add") {
            var node = document.getElementById(target)
                               .getElementsByTagName('div')[0]
                               .getElementsByTagName('ul')[0];
 
            var aNode = document.createElement('a');
            var liNode = document.createElement('li');
 
            aNode.appendChild(document.createTextNode(name));
            aNode.setAttribute('href', link);
            liNode.appendChild(aNode);
            liNode.className='plainlinks';
            node.appendChild(liNode);
        }
 
        if (action == "remove") {
            var list = document.getElementById(target)
                               .getElementsByTagName('div')[0]
                               .getElementsByTagName('ul')[0];
 
            var listelements = list.getElementsByTagName('li');
 
            for (var i = 0; i < listelements.length; i++) {
                if (listelements[i].getElementsByTagName('a')[0].innerHTML == name ||
                    listelements[i].getElementsByTagName('a')[0].href == link) {
 
                    list.removeChild(listelements[i]);
                }
            }
        }
 
    } catch(e) {
      // lets just ignore what's happened
      return;
    }
}
 
function CustomizeModificationsOfSidebar() {
    //removes [[Special:Upload]] from toolbox
    ModifySidebar("remove", "toolbox", "Special pages", "http://www.wikipathways.org/index.php/Special:SpecialPages");
}
 
addOnloadHook(CustomizeModificationsOfSidebar);

/* Quick fix */
function toggleList(listId, tag, msgCollapsed, msgExpanded, nrows, initHide) {
	if(typeof toggleList_hide[listId] == 'undefined') {
		toggleList_hide[listId] = !initHide;
	}
	
	var list = document.getElementById(listId);
	var len = list.childNodes.length;
	
	var hide = toggleList_hide[listId];
	var vStyle = (hide)? "none":"";
	for(i=nrows; i<len; i++){
		 list.childNodes[i].style.display = vStyle;
	}

	if(hide)
		tag.innerHTML = msgCollapsed;
	else
		tag.innerHTML = msgExpanded;
	toggleList_hide[listId]=!hide;
}

/* MediaWiki:Wikipathways.js */
