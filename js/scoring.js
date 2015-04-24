/*
	ITIS - 4170 - Final Project
	scoring.js
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

		myTeamID = leagueXML.find("franchise[name='" + teamName + "']").attr("id"); // Set team id

		/* Load the playersXML */
		$.get(baseUrl + "TYPE=players", function(data) {
			playersXML = $(data);

			loadLiveScoring();
		});
	});
} else { // If profile not set properly
	window.location = "profile.html";
}

/* Loads the Live Scoring page */
function loadLiveScoring() {
	$("#main").children().remove(); // Clear the content area
	showLoader(); // Show the loader gif

	/* XML Storage */
	var scoresXML = null;
	var myMatchupXML = null;
	var homeStartersXML = null;
	var awayStartersXML = null;

	$.get(baseUrl + "TYPE=liveScoring&L=" + myLeagueID + "&DETAILS=1&W=", function(data) { // Get the scoring data
		scoresXML = $(data);

		/* Find MY matchup */
		scoresXML.find("matchup").each(function(index, item, array) {
			if((item.getElementsByTagName("franchise")[0].getAttribute("id") == myTeamID) || (item.getElementsByTagName("franchise")[1].getAttribute("id") == myTeamID))
				myMatchupXML = item;
		});

		/* Load each team's lineup XML */
		var temp = $(myMatchupXML).find("franchise")[0];
		awayStartersXML = $(temp).find("player[status='starter']");
		temp = $(myMatchupXML).find("franchise")[1];
		homeStartersXML = $(temp).find("player[status='starter']");

		/* Include slots for each player */
		var awayLineup = [];
		var homeLineup = [];

		/* Arrays for each position */
		var qb = [], rb = [], te = [], wr = [], pk = [], def = [];

		/* For each player, load that player into appropriate position array */
		awayStartersXML.each(function(index,item,array) {
			var p = playersXML.find("player[id='" + item.getAttribute("id") + "']");
			p.attr("score", item.getAttribute("score"));
			if(p.attr("position") == "QB")
				qb.push(p);
			else if(p.attr("position") == "RB")
				rb.push(p);
			else if(p.attr("position") == "TE")
				te.push(p);
			else if(p.attr("position") == "WR")
				wr.push(p);
			else if(p.attr("position") == "PK")
				pk.push(p);
			else if(p.attr("position") == "Def")
				def.push(p);
		});

		/* Push each array into lineup */
		awayLineup.push(qb);
		awayLineup.push(rb);
		awayLineup.push(te);
		awayLineup.push(wr);
		awayLineup.push(pk);
		awayLineup.push(def);

		/* Arrays for each position */
		qb = [], rb = [], te = [], wr = [], pk = [], def = [];

		/* For each player, load that player into appropriate position array */
		homeStartersXML.each(function(index,item,array) {
			var p = playersXML.find("player[id='" + item.getAttribute("id") + "']");
			p.attr("score", item.getAttribute("score"));
			if(p.attr("position") == "QB")
				qb.push(p);
			else if(p.attr("position") == "RB")
				rb.push(p);
			else if(p.attr("position") == "TE")
				te.push(p);
			else if(p.attr("position") == "WR")
				wr.push(p);
			else if(p.attr("position") == "PK")
				pk.push(p);
			else if(p.attr("position") == "Def")
				def.push(p);
		});

		/* Push each array into lineup */
		homeLineup.push(qb);
		homeLineup.push(rb);
		homeLineup.push(te);
		homeLineup.push(wr);
		homeLineup.push(pk);
		homeLineup.push(def);

		/* Get the team names, icons, & scores */
		var awayName = leagueXML.find("franchise[id='" + myMatchupXML.getElementsByTagName("franchise")[0].getAttribute("id") + "']").attr("name");
		var awayIconUrl = leagueXML.find("franchise[id='" + myMatchupXML.getElementsByTagName("franchise")[0].getAttribute("id") + "']").attr("icon");
		var awayScore = myMatchupXML.getElementsByTagName("franchise")[0].getAttribute("score");
		var homeName = leagueXML.find("franchise[id='" + myMatchupXML.getElementsByTagName("franchise")[1].getAttribute("id") + "']").attr("name");
		var homeIconUrl = leagueXML.find("franchise[id='" + myMatchupXML.getElementsByTagName("franchise")[1].getAttribute("id") + "']").attr("icon");
		var homeScore = myMatchupXML.getElementsByTagName("franchise")[1].getAttribute("score");

		/* Setup the away team's HTML table */
		awayTable = $("<table>", {
			class: "left"
		});

		/* Headers */
		$("<tr>").html("<th colspan = '3'>" + awayName + "</th><td class = 'rightJustified'>" + awayScore + "</td>").appendTo(awayTable);
		$("<tr>").html("<th>Name</th><th>Team</th><th>Pos</th><th class = 'rightJustified'>Score</th>").appendTo(awayTable);

		/* Create table row for each player */
		awayLineup.forEach(function(i) {
			if(i.length > 0)
				i.forEach(function(item) {
					$("<tr>").html("<td>" + item.attr("name") + "</td><td>" + item.attr("team") + "</td><td>" + item.attr("position") + "</td><td class = 'rightJustified'>" + item.attr("score") + "</td>").appendTo(awayTable);
				});
		});

		/* Setup the home team's HTML table */
		homeTable = $("<table>", {
			class: "right"
		});

		/* Headers */
		$("<tr>").html("<td class = 'rightJustified'>" + homeScore + "</td><th colspan = '3'>" + homeName + "</th>").appendTo(homeTable);
		$("<tr>").html("<th>Name</th><th>Team</th><th>Pos</th><th class = 'rightJustified'>Score</th>").appendTo(homeTable);

		/* Create table row for each player */
		homeLineup.forEach(function(i) {
			if(i.length > 0)
				i.forEach(function(item) {
					$("<tr>").html("<td class = 'rightJustified'>" + item.attr("score") + "</td><td>" + item.attr("name") + "</td><td>" + item.attr("team") + "</td><td>" + item.attr("position") + "</td>").appendTo(homeTable);
				});
		});

		hideLoader(); // Hide the loader gif

		/* Load the tables */
		awayTable.appendTo($("#main"));
		homeTable.appendTo($("#main"));
	});
}