
var AuthorInfo = {};

/**
 * Create an author list for the given page and add it to the
 * document in the given div element
 */
AuthorInfo.init = function(toDiv, pageId, limit, showBots) {
	AuthorInfo.pageId = pageId;
	AuthorInfo.showBots = showBots;
	
	parentElm = document.getElementById(toDiv);
	
	//The top container
	var contentDiv = document.createElement("div");
	contentDiv.id = "AuthorInfo_" + pageId;
	AuthorInfo.contentDiv = contentDiv;
	parentElm.appendChild(contentDiv);
	
	var authorDiv = document.createElement("div");
	AuthorInfo.contentDiv.appendChild(authorDiv);
	AuthorInfo.authorDiv = authorDiv;
	
	//Overlay div to show errors
	AuthorInfo.errorDiv = document.createElement("div");
	AuthorInfo.errorDiv.className = "authorerror";
	AuthorInfo.contentDiv.appendChild(AuthorInfo.errorDiv);
	
	AuthorInfo.loadAuthors(limit);
}

AuthorInfo.loadAuthors = function(limit) {
	AuthorInfo.lastLimit = limit;
	if(limit == 0) limit = -1;
	
	sajax_do_call(
		"jsGetAuthors",
		[AuthorInfo.pageId, parseInt(limit) + 1, false],
		AuthorInfo.loadAuthorsCallback
	);
}

AuthorInfo.loadAuthorsCallback = function(xhr) {
	if(AuthorInfo.checkResponse(xhr)) {
		var xml = xhr.responseXML;
		var elements = xml.getElementsByTagName("Author");
		
		var showAll = AuthorInfo.lastLimit <= 0 ||
			elements.length <= AuthorInfo.lastLimit;
			
		var html = "<span class='author'>";
		var end = showAll ? elements.length : elements.length - 1;
		for(i=0;i<end;i++) {
			var elm = elements[i];
			var nm = elm.getAttribute("Name");
			var title = nm + " edited this page " + elm.getAttribute("EditCount") + " times";
			html += "<A href='" + elm.getAttribute("Url") + "' title='" + title + "'>" + nm + "</A>";
			if(i != end - 1) {
				html += ", ";
			}
		}
		if(!showAll && elements.length > AuthorInfo.lastLimit) {
			html += ", <a href='javascript:AuthorInfo.showAllAuthors()' " +
				"title='Click to show all authors'>et al.</a>";
		}
		AuthorInfo.authorDiv.innerHTML = html + "</span>";
	}
}

AuthorInfo.showAllAuthors = function() {
	AuthorInfo.loadAuthors(0);
}

AuthorInfo.checkResponse = function(xhr) {
	if (xhr.readyState==4){
		if (xhr.status==200) {
			return true;
		} else {
			AuthorInfo.showError(xhr.statusText);
		}
	} else {
		AuthorInfo.showError(xhr.statusText);
	}
}

AuthorInfo.showError = function(msg) {
	AuthorInfo.errorDiv.style.display = "block";
	AuthorInfo.errorDiv.innerHTML = "<p class='authorerror'>Error loading authors: " + msg + 
		" - <a href='javascript:AuthorInfo.hideError();'>close</a></p>";
}

AuthorInfo.hideError = function() {
	AuthorInfo.errorDiv.style.display = "none";
	AuthorInfo.errorDiv.innerHTML = "";
}
