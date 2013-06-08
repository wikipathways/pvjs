var CurationTags = {};

/**
 * Stores a div for each tag, used to display
 * the tag information
 */
CurationTags.tagElements = new Array();

/**
 * Stores tag definitions for available tags
 */
CurationTags.tagDefinitions = {};
/**
 * Stores tag values for available tags
 */
CurationTags.tagData = {};

CurationTags.insertDiv = function(elementId, pageId) {
	//Set the innerHTML of the given elementId to display the curation tags panel
	CurationTags.pageId = pageId;
	
	CurationTags.rootDiv = document.getElementById(elementId);
	CurationTags.rootDiv.className = "tagroot";
	CurationTags.rootDiv.innerHTML = ""; //Clear all existing content of the div
	
	//Container for hide link
	CurationTags.hideDiv = document.createElement("div");
	CurationTags.hideDiv.id = "tagHide"
	CurationTags.hideLink = document.createElement("a");
	CurationTags.hideLink.href = "javascript:CurationTags.toggleHide();";
	CurationTags.hideLink.innerHTML = "hide";
	CurationTags.hideDiv.appendChild(CurationTags.hideLink);
	CurationTags.hideDiv.className = "taghide";
	CurationTags.rootDiv.appendChild(CurationTags.hideDiv);
	
	//Container for content
	CurationTags.contentDiv = document.createElement("div");
	CurationTags.contentDiv.id = "tagContent";
	CurationTags.contentDiv.className = "tagcontent";
	CurationTags.rootDiv.appendChild(CurationTags.contentDiv);
	
	//Container to display tags
	CurationTags.displayDiv = document.createElement("div");
	CurationTags.displayDiv.id = "tagDisplay";
	CurationTags.contentDiv.appendChild(CurationTags.displayDiv);
	
	//Container to edit tags
	CurationTags.editDiv = document.createElement("div");
	CurationTags.editDiv.id = "tagEdit";
	CurationTags.editDiv.className = "tagedit";
	CurationTags.editDiv.style.display = "none";
	CurationTags.contentDiv.appendChild(CurationTags.editDiv);
	
	//Container to show history
	CurationTags.histDiv = document.createElement("div");
	CurationTags.histDiv.id = "tagHist";
	CurationTags.histDiv.className = "taghist";
	CurationTags.histDiv.style.display = "none";
	CurationTags.contentDiv.appendChild(CurationTags.histDiv);
	
	//Container to display toolbar
	CurationTags.toolDiv = document.createElement("div");
	CurationTags.toolDiv.className = "tagtool";
	CurationTags.contentDiv.appendChild(CurationTags.toolDiv);
	CurationTags.createToolDivContent();
	
	//Overlay div to show errors
	CurationTags.errorDiv = document.createElement("div");
	CurationTags.errorDiv.className = "tagoverlay tagerror";
	CurationTags.contentDiv.appendChild(CurationTags.errorDiv);
	
	//Overlay div to show progress
	CurationTags.progressDiv = document.createElement("div");
	CurationTags.progressDiv.className = "tagoverlay tagprogress";
	CurationTags.contentDiv.appendChild(CurationTags.progressDiv);
	
	CurationTags.refreshNoTagsMsg();

	CurationTags.showProgress();
	CurationTags.loadAvailableTags();
	CurationTags.refresh();
}

CurationTags.toggleHide = function() {
	if(CurationTags.contentDiv.style.display == "none") {
		CurationTags.hideLink.innerHTML = "hide";
		CurationTags.contentDiv.style.display = "";
	} else {
		CurationTags.contentDiv.style.display = "none";
		CurationTags.hideLink.innerHTML = "show";
	}
}

CurationTags.loadAvailableTags = function() {
	CurationTags.showProgress();
	sajax_do_call(
		"CurationTagsAjax::getAvailableTags",
		[],
		CurationTags.loadAvailableTagsCallback
	);
}

CurationTags.loadAvailableTagsCallback = function(xhr) {
	if(CurationTags.checkResponse(xhr)) {
		var xml = CurationTags.getRequestXML(xhr);
		var nodes = xml.getElementsByTagName("Tag");
		
		var rtn = 0;
		var gtn = 0;
		
		for(i=0;i<nodes.length;i++) {
			var n = nodes[i];
			var revision = n.getAttribute("useRevision");
			var shortName = n.getAttribute("shortName");
			var tagd = {};
			tagd.name = n.getAttribute("name");;
			tagd.displayName = n.getAttribute("displayName");
			revision == "true" ? tagd.revision = true : tagd.revision = false;
			shortName ? tagd.shortName = shortName : tagd.shortName = tagd.displayName;
			CurationTags.tagDefinitions[tagd.name] = tagd;
		}
	} else {
		CurationTags.showError("Unable to load available tags");
	}
}

CurationTags.createToolDivContent = function() {
	var helpTag = "<TD><A title='Show help page' " +
		"href='" + CurationTags.helpLink + "' target='_blank'>" +
		"<IMG src='" + CurationTags.extensionPath + "/help.png'/></A>";
	
	var histTag = "<TD><A title='Show history' id='showHistBtn'" +
		"href='javascript:CurationTags.showHistory()'>" +
		"<IMG src='" + CurationTags.extensionPath + "/history.png'/></A>";
		
	var newTag = "";
	var newRevisionTag = "";
	
	if(CurationTags.mayEdit) {
		newTag = "<TD><A title='New tag' " +
		"href='javascript:CurationTags.newTag()'>" +
		"<IMG src='" + CurationTags.extensionPath + "/new.png'/></A>";
	}
	CurationTags.toolDiv.innerHTML = 
	"<TABLE><TR>" + newTag + helpTag + histTag +
	"</TABLE>";
}

CurationTags.newTag = function() {
	CurationTags.showEditDiv();
}

CurationTags.applyNewTag = function() {
	var nameBox = document.getElementById("tag_name");
	var textBox = document.getElementById("tag_text");
	
	if(!nameBox || !textBox) {
		CurationTags.showError("Couldn't find edit elements");
		return;
	}
	
	var tagName = nameBox.value;
	var tagText = textBox.value;
	var tagRev = "";
	
	var tagDef = CurationTags.tagDefinitions[tagName];
	if(tagDef && tagDef.revision) {
		tagRev = CurationTags.pageRevision;
	}
		
	if(!tagName) {
		CurationTags.showError("Tag name is empty");
		return;
	}
	
	CurationTags.saveTag(tagName, tagText, tagRev);
	
	CurationTags.showProgress();
}

CurationTags.cancelNewTag = function(tagName) {
	CurationTags.hideEditDiv();
	if(tagName) {
		CurationTags.scrollToElement(CurationTags.tagElements[tagName]);
	}
}

CurationTags.removeTag = function(tagName) {
	CurationTags.showProgress();
	sajax_do_call(
		"CurationTagsAjax::removeTag",
		[tagName, CurationTags.pageId],
		CurationTags.removeTagCallback
	);
}

CurationTags.removeTagCallback = function(xhr) {
	if(CurationTags.checkResponse(xhr)) {
		var xml = CurationTags.getRequestXML(xhr);
		var tagName = xml.documentElement.firstChild.nodeValue;
		var elm = CurationTags.tagElements[tagName];
		if(elm) {
			CurationTags.displayDiv.removeChild(elm);
			CurationTags.tagElements[tagName] = false;
			CurationTags.tagData[tagName] = false;
		} else {
			CurationTags.showError("Element for tag '" + tagName + "' not found");
		}
		CurationTags.updatePageHistory(tagName);
	}
	CurationTags.hideProgress();
	CurationTags.refreshNoTagsMsg();
}

/**
 * Update the tag to the current page revision (forces save and keeps tag text unchanged).
 */
CurationTags.updateTag = function(tagName) {
	var tagData = CurationTags.tagData[tagName];
	if(tagData) {
		CurationTags.saveTag(tagName, tagData.text, CurationTags.pageRevision);
	}
}

CurationTags.saveTag = function(tagName, tagText, tagRev) {
	sajax_do_call(
		"CurationTagsAjax::saveTag", 
		[tagName, CurationTags.pageId, tagText, tagRev], 
		CurationTags.saveTagCallback
	);
}

CurationTags.saveTagCallback = function(xhr) {
	CurationTags.hideProgress();
	if(CurationTags.checkResponse(xhr)) {
		var xml = CurationTags.getRequestXML(xhr);
		var tagName = xml.documentElement.firstChild.nodeValue;
		CurationTags.hideEditDiv();
		CurationTags.refresh(tagName);
	}
}

CurationTags.hideEditDiv = function() {
	CurationTags.editDiv.innerHTML = "";
	CurationTags.editDiv.style.display = "none";
}

CurationTags.showHistory = function() {
	CurationTags.showProgress();
	sajax_do_call(
		"CurationTagsAjax::getTagHistory", 
		[CurationTags.pageId, "0"], 
		CurationTags.loadHistoryCallback
	);
}

CurationTags.hideHistory = function() {
	CurationTags.histDiv.style.display = "none";
}

CurationTags.loadHistoryCallback = function(xhr) {
	if(CurationTags.checkResponse(xhr)) {
		CurationTags.histDiv.innerHTML = ""; //Clear old contents
		
		var xml = CurationTags.getRequestXML(xhr);
		var nodes = xml.getElementsByTagName("HistoryRow");
		
		var tbl = "<B>Tag history</B>" +
			" - <A href='javascript:CurationTags.hideHistory();'>" +
			"close</A><DIV class='taghistscroll'>" + 
			"<TABLE class='taghisttable'><TBODY>";
		
		for(i=0;i<nodes.length;i++) {
			var tagName = nodes[i].getAttribute("tag_name");
			var displayName = tagName;
			var tagDef = CurationTags.tagDefinitions[tagName];
			if(tagDef) {
				displayName = tagDef.displayName;
			}
			var time = nodes[i].getAttribute("timeText");
			var user = nodes[i].getAttribute("userText");
			var action = nodes[i].getAttribute("action");
			tbl += "<TR><TD>" + time + ": <TD>" + user +
				" " + action + "d<I> " + displayName + "</I> tag";
		}
		tbl += "</TBODY></TABLE></DIV>";
		CurationTags.histDiv.innerHTML = tbl;
		CurationTags.histDiv.style.display = "";
		sortables_init();
	}
	
	CurationTags.hideProgress();
}

/**
 * Show to which revision a tag applies on the page history table (if this exists).
 * See wpi/extensions/pathwayHistory.php for details on the page history table.
 **/
CurationTags.updatePageHistory = function(tagName) {
	var tagDef = CurationTags.tagDefinitions[tagName];
	if(tagDef && tagDef.revision) {
		var tagData = CurationTags.tagData[tagName];
		var rev = tagData.revision;
		
		var id =  CurationTags.makeId('historyTag_' + tagName);
		
		//Remove old occurences
		var oldtd = document.getElementById(id);
		if(oldtd) {
			oldtd.parentNode.removeChild(oldtd);
		}
		
		//Find the revision row in the table and append tag name
		var td = document.getElementById('historyTable_' + rev + '_tag');
		if(td) {
			//Get the class/color from the tag
			var tag = document.getElementById(CurationTags.makeId(tagName + '_hover'));
			var cls = tag.className;
			var html = td.innerHTML;
			if(!html) html = '';
			td.innerHTML = html + '<div id="' + id + 
				'" style="padding: 0 0 0 3px; font-size: 9px; line-height: 11px" class="' + cls + 
				'">' + tagDef.shortName + '</div>';
		}
	}
}

CurationTags.showEditDiv = function(tagName) {
	//Remove old edit content
	CurationTags.hideEditDiv();
	
	var select = "<SELECT id='tag_name'>";
	select += "<OPTION value=''></OPTION>";
	
	var tagData = CurationTags.tagData[tagName];
	var tagText = "";
	if(tagData) {
		tagText = tagData.text;
	}
	
	var tagDefArray = CurationTags.tagDefinitions;
	var currTagDef = false;
	
	for(tn in tagDefArray) {
		var tagDef = tagDefArray[tn];
		//Skip the tag if we pressed the 'new' button
		//and it already exists
		if(!tagName && CurationTags.tagData[tn]) {
			continue;
		}
		var value = "value='" + tagDef.name + "'";
		var selected = "";
		if(String(tagDef.name) == String(tagName)) {
			selected = "selected='true'";
			currTagDef = tagDef;
		}
		var option = "<OPTION " + selected + value + ">" + 
			tagDef.displayName + "</OPTION>";
		select += option;
	}
	select += "</SELECT>";
	
	var useRev = currTagDef && currTagDef.revision;
		
	var nameBox = "<TR><TD>Select tag:<TD>" + select;
		
	var textBox = "<TR><TD>Tag text:" +
		"<TD><textarea id='tag_text' cols='40' rows='5'>" + tagText + "</textarea>";
	
	var buttons = "<TR align='right'><TD colspan='2'>" +
		"<A href='javascript:CurationTags.applyNewTag()' title='Apply'>" +
		"<IMG src='" + CurationTags.extensionPath + "/apply.png'/></A>" +
		"<A href='javascript:CurationTags.cancelNewTag(\"" + tagName + "\")' title='Cancel'>" +
		"<IMG src='" + CurationTags.extensionPath + "/cancel.png'/></A>";
	var html = "<TABLE>" + nameBox + textBox + buttons +"</TABLE>";
	CurationTags.editDiv.innerHTML = html;
	CurationTags.editDiv.style.display = "";
	if(tagName) {
		CurationTags.scrollToElement(CurationTags.editDiv);
	}
	
	document.getElementById("tag_name").onchange = CurationTags.refreshEditValues; 
}

CurationTags.refreshEditValues = function() {
	var select = document.getElementById("tag_name");
	if(select) {
		var tagName = select.value;
		var textBox = document.getElementById("tag_text");
		if(textBox) {
			var tagd = CurationTags.tagData[tagName];
			if(tagd) {
				textBox.value = tagd.text;
			} else {
				textBox.value = "";
			}
		} else {
			textBox.value = "";
		}
	}
}

/**
 * Reloads the information for the given tag.
 * If tagName is null, all tags will be refreshed.
 */
CurationTags.refresh = function(tagName) {
	if(tagName) {
		CurationTags.loadTag(tagName);
		CurationTags.scrollToElement(CurationTags.tagElements[tagName]);
		CurationTags.updatePageHistory(tagName);
	} else {
		CurationTags.displayDiv.innerHTML = "";
		CurationTags.loadTags();
	}
}

CurationTags.loadTags = function() {
	//Reset the tags display
	CurationTags.displayDiv.innerHTML = "";
	CurationTags.tagElements = new Array();
	
	//Get all tags and their info by calling the AJAX functions
	sajax_do_call(
		"CurationTagsAjax::getTags", 
		[CurationTags.pageId, CurationTags.pageRevision], 
		CurationTags.loadTagsCallback
	);
}

CurationTags.loadTagsCallback = function(xhr) {
	if(CurationTags.checkResponse(xhr)) {
		var xml = CurationTags.getRequestXML(xhr);
		var nodes = xml.documentElement.childNodes;
		for(i=0;i<nodes.length;i++) {
			var tagnode = nodes[i];
			if(tagnode) {
				CurationTags.parseTagXml(tagnode);
			}
		}
		CurationTags.refreshNoTagsMsg();
	}
	CurationTags.hideProgress();
}

CurationTags.loadTag = function(tagName) {
	sajax_do_call(
		"CurationTagsAjax::getTagData",
		[tagName, CurationTags.pageId, CurationTags.pageRevision],
		CurationTags.loadTagCallback
	);
}

CurationTags.parseTagXml = function(tagElm) {
	var tagName = tagElm.getAttribute("name");
	var tagRevision = tagElm.getAttribute("revision");
	
	if(!tagRevision) {
		tagRevision = false;
	}

	var html = tagElm.getElementsByTagName("Html")[0].firstChild.nodeValue;
	var tagText = "";
	var textNode = tagElm.getElementsByTagName("Text")[0];
	if(textNode.hasChildNodes()) {
		tagText = textNode.firstChild.nodeValue;
	}
	
	var elm = CurationTags.tagElements[tagName];
	var tagContent = document.getElementById( CurationTags.makeId("tagContent_" + tagName));
	
	if(!elm) { //New tag
		var elm = document.createElement("div");
		elm.id =  CurationTags.makeId("tagDiv_" + tagName);
		elm.className = "tagcontainer";
		
		//TODO: Only showing buttons on mouseover on tag works great under FF
		//but I can't get it to work under IE7
		//Fix is to make buttons semi-transparent by default, 
		//and solid on mouseover
		elm.onmouseover = function() { CurationTags.showTagButtons(tagName); }
		elm.onmouseout = function() { CurationTags.hideTagButtons(tagName); }
		
		//Store the element in the tagElements array
		CurationTags.tagElements[tagName] = elm;
		//Add to display panel
		CurationTags.displayDiv.appendChild(elm);
		
		if(CurationTags.mayEdit) {
			var btns = document.createElement("div");
			btns.id =  CurationTags.makeId("tagBtns_" + tagName);
			btns.className = "tagbuttons transparent";
			remove = "<A title='Remove' " +
				"href='javascript:CurationTags.removeTag(\"" + tagName + "\")'>" +
				"<IMG src='" + CurationTags.extensionPath + "/cancel.png'/></A>";
			edit = "<A title='Edit' " +
				"href='javascript:CurationTags.showEditDiv(\"" + tagName + "\")'>" +
				"<IMG src='" + CurationTags.extensionPath + "/edit.png'/></A>";
			btns.innerHTML = remove + edit;
			elm.appendChild(btns);
		}
		
		tagContent = document.createElement("div");
		tagContent.className = "tagcontents";
		tagContent.id =  CurationTags.makeId("tagContent_" + tagName);
	
		elm.appendChild(tagContent);
	}
	
	tagd = {};
	tagd.name = tagName;
	tagd.revision = tagRevision;
	tagd.text = tagText;
	CurationTags.tagData[tagName] = tagd;
	
	if(CurationTags.mayEdit) {
		//Replace {{{update_link}}} with a link to apply the tag to the most
		//recent revision
		html = html.replace("{{{update_link}}}", 
			"<a href='javascript:CurationTags.updateTag(\"" + tagName + "\")'>Click here</a> to apply to current revision.");
	} else {
		html = html.replace("{{{update_link}}}", "");
	}
	//To make the message show up when hovering over tag:
	//part 1: replace UNIQUEID placeholder with tag name
       html = html.replace(/UNIQUEID/g, CurationTags.makeId(tagName));
		
	tagContent.innerHTML = html;
	
	//To make the message show up when hovering over tag:
	//part 2: insert event listeners
     var control = document.getElementById( CurationTags.makeId(tagName + "_hover"));
     var show = document.getElementById( CurationTags.makeId(tagName + "_show"));
	if (show && control) {
		var funOver = function(e){
			show.style.display = '';
		}
		var funOut = function(e){
			show.style.display = 'none';
		}
		if (control.addEventListener) {
			control.addEventListener('mouseover', funOver, false);
			control.addEventListener('mouseout', funOut, false);
		}
		else 
			if (control.attachEvent) {
				control.attachEvent('onmouseover', funOver);
				control.attachEvent('onmouseout', funOut);
			}
	}
		
	CurationTags.refreshNoTagsMsg();
	CurationTags.updatePageHistory(tagName);
}

CurationTags.loadTagCallback = function(xhr) {
	if (CurationTags.checkResponse(xhr)){
		var xml = CurationTags.getRequestXML(xhr);
		var elm = xml.documentElement;
		CurationTags.parseTagXml(elm);
	}
}

CurationTags.showTagButtons = function(tagName) {
	var btn = document.getElementById( CurationTags.makeId("tagBtns_" + tagName));
	if(btn) {
		btn.className = "tagbuttons solid";
	}
}

CurationTags.hideTagButtons = function(tagName) {
	var btn = document.getElementById( CurationTags.makeId("tagBtns_" + tagName));
	if(btn) {
		btn.className = "tagbuttons transparent";
	}
}

/*
CurationTags.showTagButtons = function(tagName) {
	var btn = document.getElementById("tagBtns_" + tagName);
	if(btn) {
		btn.style.display = "block";
	}
}

CurationTags.hideTagButtons = function(tagName) {
	var btn = document.getElementById("tagBtns_" + tagName);
	if(btn) {
		btn.style.display = "none";
	}
}
*/

CurationTags.refreshNoTagsMsg = function() {
	if(!CurationTags.noTagsMsg) {
		CurationTags.noTagsMsg = document.createElement("div");
		CurationTags.noTagsMsg.id = "notags";
		CurationTags.noTagsMsg.innerHTML = "<P><I>No tags</I></P>";
		CurationTags.displayDiv.appendChild(CurationTags.noTagsMsg);
	} else {
		if(CurationTags.displayDiv.childNodes.length == 0) {
			CurationTags.displayDiv.appendChild(CurationTags.noTagsMsg);
		} else if(CurationTags.displayDiv.childNodes.length == 1) {
			CurationTags.noTagsMsg.style.display = "";
		} else {
			CurationTags.noTagsMsg.style.display = "none";
		}
	}
}

CurationTags.scrollToElement = function(elm){
	if(elm) {
		var selectedPosX = 0;
		var selectedPosY = 0;
		while(elm != null){
			selectedPosX += elm.offsetLeft;
			selectedPosY += elm.offsetTop;
			elm = elm.offsetParent;
		}
		window.scrollTo(selectedPosX, selectedPosY);
	}
}

CurationTags.getRequestXML = function(xhr) {
	var text = CurationTags.trim(xhr.responseText);
	return CurationTags.parseXML(text);
}

CurationTags.parseXML = function(xml) {
	var xmlDoc = null;
	if (window.DOMParser) {
		parser = new DOMParser();
		xmlDoc = parser.parseFromString(xml, "text/xml");
	} else { //Internet Explorer
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(xml);
	}
	return xmlDoc;
}

CurationTags.makeId = function(id) {
	return id.replace(/:/g, '');
}

CurationTags.trim = function(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

CurationTags.dom2html = function(elm) {
	var tmp = document.createElement("div");
	tmp.appendChild(elm);
	return tmp.innerHTML;
}

CurationTags.checkResponse = function(xhr) {
	if (xhr.readyState==4){
		if (xhr.status==200) {
			return true;
		} else {
			CurationTags.showError("Error: " + xhr.statusText);
		}
	} else {
		CurationTags.showError("Error: " + xhr.statusText);
	}
}

/**
 * Overlays a progress monitor over the given element.
 */
CurationTags.showProgress = function() {
	CurationTags.progressDiv.style.display = "block";
}

/**
 * Removes the progress monitor from the given element
 */
CurationTags.hideProgress = function() {
	CurationTags.progressDiv.style.display = "none";
}

CurationTags.showError = function(msg) {
	CurationTags.errorDiv.style.display = "block";
	CurationTags.errorDiv.innerHTML = "<p class='tagerror'>" + msg + 
		" - <a href='javascript:CurationTags.hideError();'>close</a></p>";
}

CurationTags.hideError = function() {
	CurationTags.errorDiv.style.display = "none";
	CurationTags.errorDiv.innerHTML = "";
}
