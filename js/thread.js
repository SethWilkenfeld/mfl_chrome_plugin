/*
	ITIS - 4170 - Final Project
	rosters.js
	Gardner Wilkenfeld
*/

var baseUrl = "http://football.myfantasyleague.com/2012/export?";
var leagueXML; // Stores the XML data for the User's league
var myLeagueID; // Stores the User's League ID
var id;

/* Load the league's XML */
if((localStorage["league"] != null) && (localStorage["team"] != null)) {
	myLeagueID = localStorage["league"];

	showLoader(); // Show loader gif

	/* Load the league's XML */
	$.get(baseUrl + "TYPE=league&L=" + myLeagueID, function(data) {
		leagueXML = $(data);

		loadPosts();
	});
} else { // If profile not set properly
	window.location = "profile.html";
}

function loadPosts() {
	$("#main").children().remove(); // Clear content
	showLoader(); // Re-load the loader gif

	id = location.search.replace("?ID=",""); // Get the thread ID from the submitted url

	$.get(baseUrl + "TYPE=messageBoardThread&L=" + myLeagueID + "&THREAD=" + id, function(data) { // Load the thread data
		var threadXML = $(data);
		var postsXML = $(threadXML.find("post")); // Filter to posts

		// For each FRANCHISE
		var table = $("<table>").css("width", "600px");
		$("<tr>").html(
			"<th>Franchise</th>" +
			"<th>Post Time</th>" +
			"<th>Body</th>"
		).appendTo(table);

		/* For each post create a table row */
		postsXML.each(function(index, item, array) {
			var date = new Date(item.getAttribute("postTime") * 1000); // Set the date
			var name = leagueXML.find("franchise[id = '" + item.getAttribute("franchise") + "']").attr("name"); // Get the franchise name

			/* If commissioner */
			if(name == null)
				name = "Commissioner";

			/* Create the table row */
			$("<tr>").html(
					"<td>" + name + "</td>" +
					"<td>" + date.toDateString() + " " + date.toLocaleTimeString() + "</td>" +
					"<td>" + item.getAttribute("body") + "</td>"
				).appendTo(table);

			hideLoader(); // Hide the loader
			table.appendTo($("#main")); // Load data
		});
	});
}