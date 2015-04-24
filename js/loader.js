
/* Shows the loader img and text */
function showLoader() {
	/* Create the DIV for the loader img */
	$("<div>", {
		id:"searchLoader"
	}).css({"width":"300px", "margin-left":"auto", "margin-right":"auto"}).appendTo("#main");

	/* Insert the loader img */
	$("<img>", {
		src:"img/ajax-loader-large.gif"
	}).appendTo("#searchLoader");
}

/* Hides the loader img and text */
function hideLoader() {
	$("#searchLoader").remove();
}