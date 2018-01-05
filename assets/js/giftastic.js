var topics = ["eye roll","facepalm","happy","high five","kiss","lol","no", "sad", "shrug", "thumbs up", "yes", "wink"];

function renderButtons() {
  $("#buttons").empty();

  for (var i = 0; i < topics.length; i++) {

    var button = $("<button>");
    button.addClass("reaction");
    button.attr("data-reactions", topics[i]);
    button.text(topics[i]);
    $("#buttons").append(button);

  }
}


$("#buttons").on("click", "button", function() {
      $("#gifs-appear-here").empty();

      var reaction = $(this).attr("data-reactions");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

        var results = response.data;

        for (var i = 0; i < 11; i++) {

          var reactionSpan = $("<span>");

          var p = $("<p>").text("Rating: " + results[i].rating);

          var reactionImage = $("<img>");
          reactionImage.attr("src", results[i].images.fixed_height_still.url);
          reactionImage.attr("data-still", results[i].images.fixed_height_still.url);
          reactionImage.attr("data-animate", results[i].images.fixed_height.url);
          reactionImage.attr("data-state", "still");
          reactionImage.addClass("gif");

          reactionSpan.append(p);

          reactionSpan.append(reactionImage);

          $("#gifs-appear-here").prepend(reactionSpan);
        }
      });
});


$("#add-reaction").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // Using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  // This line grabs the text from the input box
  var reaction = $("#reaction-input").val().trim();
  // The reaction from the textbox is then added to our array
  topics.push(reaction);

  renderButtons();

});

$("#gifs-appear-here").on("click", ".gif", function(){
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
});


// Calling the renderButtons function at least once to display the initial list of reactions
renderButtons();