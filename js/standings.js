/*
	ITIS - 4170 - Final Project
	rosters.js
	Gardner Wilkenfeld
*/

var baseUrl = "http://football.myfantasyleague.com/2012/export?";
var leagueXML; // Stores the XML data for the User's league

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

		myTeamID = leagueXML.find("franchise[name='The Homers']").attr("id"); // Set team ID

		loadStandings();
	});
} else {
	window.location = "profile.html";
}

function loadStandings() {
	$("#main").children().remove();
	showLoader();

	$.get(baseUrl + "TYPE=standings&L=" + myLeagueID + "&W=", function(data) {
		var standingsXML = $(data);

		// Get franchises from rostersXML
		var franchises = standingsXML.find("franchise");

		// For each FRANCHISE
		var table = $("<table>", {
			id: "standings"
		});

		/* Headers */
		$("<tr>").html(
			"<th>Franchise</th>" +
			"<th>Overall</th>" +
			"<th>Division</th>" +
			"<th>Streak</th>" +
			"<th>Pts Scored</th>" +
			"<th>Pts Possible</th>" +
			"<th>Eff</th>" +
			"<th>Pts Against</th>" +
			"<th>Max PA</th>" +
			"<th>Min PA</th>" +
			"<th>Power</th>"
		).appendTo(table);

		/* Franchise data */
		franchises.each(function(index, item, array) {
			$("<tr>").html(
					"<td>" + leagueXML.find("franchise[id='" + item.getAttribute("id") + "']").attr("name") + "</td>" +
					"<td>" + item.getElementsByTagName("h2hw").item().textContent + "-" + item.getElementsByTagName("h2hl").item().textContent + "-" + item.getElementsByTagName("h2ht").item().textContent + "</td>" +
					"<td>" + item.getElementsByTagName("divw").item().textContent + "-" + item.getElementsByTagName("divl").item().textContent + "-" + item.getElementsByTagName("divt").item().textContent + "</td>" +
					"<td>" + item.getElementsByTagName("streak_type").item().textContent + "-" + item.getElementsByTagName("streak_len").item().textContent + "</td>" +
					"<td>" + item.getElementsByTagName("pf").item().textContent + "</td>" +
					"<td>" + item.getElementsByTagName("pp").item().textContent + "</td>" +
					"<td>" + (100 * (item.getElementsByTagName("pf").item().textContent/item.getElementsByTagName("pp").item().textContent)).toFixed(2) + "%</td>" +
					"<td>" + item.getElementsByTagName("pa").item().textContent + "</td>" +
					"<td>" + item.getElementsByTagName("maxpa").item().textContent + "</td>" +
					"<td>" + item.getElementsByTagName("minpa").item().textContent + "</td>" +
					"<td>" + item.getElementsByTagName("pwr").item().textContent + "</td>"
				).appendTo(table);

			hideLoader(); // Hide loader gif
			table.appendTo($("#main")); // Load data
		});
	});
}