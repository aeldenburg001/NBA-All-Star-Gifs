$(document).ready(function () {
	// NBA All Stars to be entered into array
	var athletes = ["LeBron James", "James Harden", "Kevin Durant", "Kyrie Irving", "Kawhi Leonard", "Giannis Antetokounmpo", "Steph Curry", "Joel Embiid", "Paul George", "Damian Lillard", "Dwayne Wade", "Blake Griffin"];
	
	// Add buttons for original array
	function renderButtons() {
		$("#athlete-buttons").empty();
		for (i = 0; i < athletes.length; i++) {
			$("#athlete-buttons").append("<button class='btn btn-danger' data-athlete='" + athletes[i] + "'>" + athletes[i] + "</button>" + " ");
		}
		buttonClicking();
	}
	renderButtons();

	// Adding a button for the player entered by the user
	$("#add-athlete").on("click", function () {
		event.preventDefault();
		var athlete = $("#athlete-input").val();
		athletes.push(athlete);
		renderButtons();
		return;
	});

	function buttonClicking(){
	// Getting gifs from Giphy API
	$("button").on("click", function () {
		var athlete = $(this).attr("data-athlete");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			athlete + "&api_key=aro0oZ4VlPgTXf907Z51OitCfLvnPaiy&limit=10"

		$.ajax({
			url: queryURL,
			method: "GET"

		}).done(function (response) {
			var results = response.data;
			$("#athletes").empty();
			for (var i = 0; i < results.length; i++) {
				var athleteDiv = $("<div>");
				var p = $("<p>").text("Giphy Rating: " + results[i].rating);
				var athleteImg = $("<img>");

				athleteImg.attr("src", results[i].images.original_still.url);
				athleteImg.attr("data-still", results[i].images.original_still.url);
				athleteImg.attr("data-animate", results[i].images.original.url);
				athleteImg.attr("data-state", "still");
				athleteImg.attr("class", "gif");
				athleteDiv.append(p);
				athleteDiv.append(athleteImg);
				$("#athletes").append(athleteDiv);
			}
		});
	});
	}

	// Animate gifs when clicked
	function changeState(){
		var state = $(this).attr("data-state");
		var animateImage = $(this).attr("data-animate");
		var stillImage = $(this).attr("data-still");
		if (state == "still") {
			$(this).attr("src", animateImage);
			$(this).attr("data-state", "animate");
		}
		else if (state == "animate") {
			$(this).attr("src", stillImage);
			$(this).attr("data-state", "still");
		}
	}
	$(document).on("click", ".gif", changeState);
});