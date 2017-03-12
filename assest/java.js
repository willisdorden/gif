  // Initial array of animals
  var animal = ["dog", "cat", "horse", "lion"];

  // Generic function for capturing the animal name from the data-attribute
  function alertanimalName() {


      $(this).attr("data-name");
  }

  // Function for displaying animal data
  function renderButtons() {

      // Deleting the animal prior to adding new animal

      $("#animal-view").empty();

      // Looping through the array of animals
      for (var i = 0; i < animal.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array

          var a = $("<button>");
          // Adding a class
          a.addClass("animal");
          // Added a data-attribute
          a.attr("data-name", animal[i]);
          // Provided the initial button text
          a.text(animal[i]);
          // Added the button to the HTML
          $("#animal-view").append(a);
      }
  }

  // This function handles events where one button is clicked
  $("#add-animal").on("click", function(event) {
      event.preventDefault();

      // This line grabs the input from the textbox
      var animals = $("#animal-input").val().trim();

      // The movie from the textbox is then added to our array
      animal.push(animals);

      // Calling renderButtons which handles the processing of our animal array
      renderButtons();
  });

  // Calling the renderButtons function to display the intial buttons
  renderButtons();

  $('button').on("click", function(event) {
      $('.gifImg').empty();
      var animalgif = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalgif + "&limit=10" + "&api_key=dc6zaTOxFJmzC";

      $.ajax({
          url: queryURL,
          method: "GET"
      }).done(function(response) {
          console.log(response);

          var results = response.data;
          for (var i = 0; i < results.length; i++) {
              var animalDiv = $('<div class="stillPic">')
              var rating = results[i].rating;
              var p = $("<p>").text("rating:" + rating);
              var img = $("<img>");
              img.attr("src", results[i].images.fixed_height_still.url);
              img.attr("data-still", results[i].images.fixed_height_still.url);
              img.attr("data-animate", results[i].images.fixed_height.url);
              img.attr("data-state", "still")
              img.addClass('gif')
              animalDiv.prepend(p);
              animalDiv.prepend(img);
              $('.gifImg').prepend(animalDiv);
          }
      });
  });
  $(document.body).on("click", ".gif", function(event) {
      var state = $(this).attr("data-state")
          // ============== FILL IN CODE HERE FOR

      // =============================================

      // STEP THREE: Check if the variable state is equal to 'still',
      if (state === "still") {
          var gifAnimate = $(this).data("animate");
          $(this).attr("src", gifAnimate);
          $(this).attr("data-state", "animate");


      }
      if (state !== "still") {
          var stillGif = $(this).data("still");
          $(this).attr("src", stillGif);
          $(this).attr("data-state", "still");
      }
  });
