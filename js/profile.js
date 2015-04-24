/*
	ITIS - 4170 - Final Project
	profile.js
	Gardner Wilkenfeld
*/

/* Loads the Profile page */
$("#main").children().remove();
var form = $("<form>").html(
	"<fieldset>" +
	"	<legend>League Profile</legend>" +
	"	<table class = 'profile'>" +
	"		<tr class = 'profile'>" +
	"			<td class = 'profile'><label id = 'leagueLabel' for = 'leagueField'>League ID:</label></td>" +
	"			<td class = 'profile'><input type = 'text' id = 'leagueField' name = 'leagueField' value = '" + localStorage["league"] + "'></td>" +
	"		</tr>" +
	"		<br>" +
	"		<tr class = 'profile'>" +
	"			<td class = 'profile'><label id = 'teamLabel' for = 'teamField'>Team Name:</label></td>" +
	"			<td class = 'profile'><input type = 'text' id = 'teamField' name = 'teamField' value = '" + localStorage["team"] + "'></td>" +
	"		</tr>" +
	"	</table>" +
	"	<input type = 'button' id = 'profileButton' name = 'profileButton' value = 'Submit'>" +
	"</fieldset>"
).appendTo($("#main"));

document.querySelector('#profileButton').addEventListener('click', submitProfile); // Create event listener for button click

/* Submits the Profile form */
function submitProfile() {
	if($("#leagueField").val() != "")
		localStorage["league"] = $("#leagueField").val();
	if($("#teamField").val() != "")
		localStorage["team"] = $("#teamField").val();
	window.location = "scoring.html";
}