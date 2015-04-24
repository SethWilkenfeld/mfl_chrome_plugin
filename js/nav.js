/*
	ITIS - 4170 - Final Project
	rosters.js
	Gardner Wilkenfeld
*/

var list = $("<ul>"); // Create the unordered list

/* Create the hyperlink list items */
$("<li>", {id: "profileNav", class: "navLink"}).html("<a href = 'profile.html'>Profile</a>").appendTo(list);
$("<li>", {id: "scoringNav", class: "navLink"}).html("<a href = 'scoring.html'>Scores</a>").appendTo(list);
$("<li>", {id: "rostersNav", class: "navLink"}).html("<a href = 'rosters.html'>Rosters</a>").appendTo(list);
$("<li>", {id: "standingsNav", class: "navLink"}).html("<a href = 'standings.html'>Standings</a>").appendTo(list);
$("<li>", {id: "boardsNav", class: "navLink"}).html("<a href = 'boards.html'>Message Board</a>").appendTo(list);

list.appendTo($("#nav")); // Load the list

/* Create event listeners for mouseover event */
document.querySelector('#profileNav').addEventListener('mouseover', function() {mouseOver($("#profileNav"));});
document.querySelector('#scoringNav').addEventListener('mouseover', function() {mouseOver($("#scoringNav"));});
document.querySelector('#rostersNav').addEventListener('mouseover', function() {mouseOver($("#rostersNav"));});
document.querySelector('#standingsNav').addEventListener('mouseover', function() {mouseOver($("#standingsNav"));});
document.querySelector('#boardsNav').addEventListener('mouseover', function() {mouseOver($("#boardsNav"));});

/* Create event listeners for mouseout event */
document.querySelector('#profileNav').addEventListener('mouseout', function() {mouseOut($("#profileNav"));});
document.querySelector('#scoringNav').addEventListener('mouseout', function() {mouseOut($("#scoringNav"));});
document.querySelector('#rostersNav').addEventListener('mouseout', function() {mouseOut($("#rostersNav"));});
document.querySelector('#standingsNav').addEventListener('mouseout', function() {mouseOut($("#standingsNav"));});
document.querySelector('#boardsNav').addEventListener('mouseout', function() {mouseOut($("#boardsNav"));});

/* On mouseover set background-color and font-color */
function mouseOver(str) {
	str.css({"background-color":"#60921d", "color":"white"});
}

/* On mouseout set background-color and font-color */
function mouseOut(str) {
	str.css({"background-color":"white", "color":"inherit"});
}