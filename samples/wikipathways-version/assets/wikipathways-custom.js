/*
* Collapsible tables
*/
var toggleRows_hide= new Object();
function toggleRows(tableId, tag, msgCollapsed, msgExpanded, nrows, initHide) {
	if(typeof toggleRows_hide[tableId] == 'undefined') {
		toggleRows_hide[tableId] = !initHide;
	}
	
	var tbl = document.getElementById(tableId);
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

var toggleList_hide= new Object();
function toggleList(listId, tag, msgCollapsed, msgExpanded, nrows, initHide) {
	if(typeof toggleList_hide[listId] == 'undefined') {
		toggleList_hide[listId] = !initHide;
	}
	
	var list = document.getElementById(listId);
	var len = list.childElements().length;
	
	var hide = toggleList_hide[listId];
	var vStyle = (hide)? "none":"";
	for(i=nrows; i<len; i++){
		 list.childElements()[i].style.display = vStyle;
	}

	if(hide)
		tag.innerHTML = msgCollapsed;
	else
		tag.innerHTML = msgExpanded;
	toggleList_hide[listId]=!hide;
}
