/*
	ITIS - 4170 - Final Project
	rosters.js
	Gardner Wilkenfeld
*/

var baseUrl = "http://football.myfantasyleague.com/2012/export?";
var myLeagueID; // Stores the User's League ID

/* Load the league's XML */
if((localStorage["league"] != null) && (localStorage["team"] != null)) {
	myLeagueID = localStorage["league"];

	showLoader(); // Show the loader image

	/* Load the league's XML */
	loadMessages();
} else {
	window.location = "profile.html";
}

function loadMessages() {
	$("#main").children().remove(); // Clear the content area
	showLoader(); // Re-display the loader

	$.get(baseUrl + "TYPE=messageBoard&L=" + myLeagueID, function(data) { // Retrieve message board data
		var boardsXML = $(data); // Store data
		var messagesXML = $(boardsXML.find("thread")); // Filter to "threads"

		var table = $("<table>").css("width", "600px"); // Create a table
		$("<tr>").html( // Header row
			"<th>Subject</th>" +
			"<th>Last Post</th>"
		).appendTo(table);

		messagesXML.each(function(index, item, array) { // For each message
			var date = new Date(item.getAttribute("lastPostTime") * 1000); // Set the date
			$("<tr>").html( // Create a table row
					"<td><a href = 'thread.html?ID=" + item.getAttribute("id") + "'>" + item.getAttribute("subject") + "</a></td>" +
					"<td class = 'rightJustified'>" + date.toDateString() + " " + date.toLocaleTimeString() + "</td>"
				).appendTo(table);

			hideLoader(); // Hide the loader gif
			table.appendTo($("#main")); // Load the messages table
		});
	});
}