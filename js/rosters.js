/*
	ITIS - 4170 - Final Project
	rosters.js
	Gardner Wilkenfeld
*/

var baseUrl = "http://football.myfantasyleague.com/2012/export?";
var leagueXML; // Stores the XML data for the User's league
var playersXML; // Stores the XML data for all Players

var myLeagueID; // Stores the User's League ID
var myTeamID; // Stores the User's Team ID

/* Load the league's XML */
if((localStorage["league"] != null) && (localStorage["team"] != null)) {
	myLeagueID = localStorage["league"];
	var teamName = localStorage["team"];

	showLoader(); // Show the loader gif

	/* Load the league's XML */
	$.get(baseUrl + "TYPE=league&L=" + myLeagueID, function(data) {
		leagueXML = $(data);

		myTeamID = leagueXML.find("franchise[name='The Homers']").attr("id"); // Get and store the team ID #

		/* Load the playersXML */
		$.get(baseUrl + "TYPE=players", function(data) {
			playersXML = $(data);

			loadRosters();
		});
	});
} else { // If profile not set properly
	window.location = "profile.html";
}

function loadRosters() {
	$("#main").children().remove(); // Clear the content area
	showLoader(); // Re-load the loader gif

	$.get(baseUrl + "TYPE=rosters&L=" + myLeagueID + "&W=", function(data) { // Get rosters data
		var rostersXML = $(data);

		// Get franchises from rostersXML
		var franchises = rostersXML.find("franchise");

		var newLine = false; // Control flag for creating a new div
		var div = null; // Current div

		franchises.each(function(index, item, array) { // For each franchise
			var floatClass; // Left or right

			// Control flag handling
			if(newLine) {
				floatClass = "right";
			} else {
				div = $("<div>").css({"display":"inline-block", "width":"600px", "margin-bottom":"10px"});
				floatClass = "left";
			}
				
			// Create a table
			var table = $("<table>", {
				class: floatClass
			});

			// Set the franchise name, icon and roster data
			var name = leagueXML.find("franchise[id='" + item.getAttribute("id") + "']").attr("name");
			var iconUrl = leagueXML.find("franchise[id='" + item.getAttribute("id") + "']").attr("icon");
			var franchisePlayersXML = $(item.getElementsByTagName("player"));

			// Header rows
			$("<tr>").html("<th colspan = '2'>" + name + "</th><th><img src = '" + iconUrl + "' height='27' width='35'></th>").appendTo(table);
			$("<tr>").html("<th>Name</th><th>Team</th><th>Pos</th>").appendTo(table);

			franchisePlayersXML.each(function(index, item, array) {
				// Get NAME, TEAM, POSITION from playersXML
				var pName = playersXML.find("player[id='" + item.getAttribute("id") + "']").attr("name");
				var pTeam = playersXML.find("player[id='" + item.getAttribute("id") + "']").attr("team");
				var pPosition = playersXML.find("player[id='" + item.getAttribute("id") + "']").attr("position");

				// Player data
				$("<tr>").html("<td><a href = 'http://football21.myfantasyleague.com/2012/player?L=" + myLeagueID + "&P=" + item.getAttribute("id") + "' target = '_blank'>" + pName + "</td><td>" + pTeam + "</td><td>" + pPosition + "</td>").appendTo(table);
			});

			// Load data
			hideLoader();
			table.appendTo($(div));

			// Update controls
			if(newLine) {
				div.appendTo($("#main"));
				div = null;
			}

			// Update flag
			newLine = !newLine;
		});
	});
}