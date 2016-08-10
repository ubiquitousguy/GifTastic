$(document).ready(function () {

    // Initial array of animals
    var animals = ['Giraffe', 'Elephant', 'Dog', 'Cat', 'Lion', 'Tiger', 'Cheetah', 'Eagle', 'Monkey', 'Gorilla'];

    // Function for displaying animal data
    function renderButtons() {

        // Deletes the movies prior to adding new animals (this is necessary otherwise you will have repeat buttons)
        $('#animalButtons').empty();

        // Loops through the array
        for (var i = 0; i < animals.length; i++) {

            // Dynamicaly generates buttons for each animal in the array

            var a = $('<button>');
            a.addClass('animal'); // Added a class
            a.addClass('btn btn-primary btn-xs');
            a.attr('data-name', animals[i]); // Added a data-attribute
            a.attr('src', $(this).data('animate'));
            a.attr('data-state'), $(this).attr('data-state', 'animate');
            a.text(animals[i]); // Provided the initial button text
            $('#animalButtons').append(a); // Added the button to the HTML

        }
    }

    // This function handles events where one button is clicked
    $('#addButton').on('click', function () {

        // Grabs the input from the textbox
        var animal = $('#animal-input').val().trim();

        // The animal from the textbox is then added to our array
        animals.push(animal);

        // Our array then runs which handles the processing of our animal array
        renderButtons();

        // users can hit "enter" instead of clicking on ht button and it won't move to the next page
        return false;
    });

    // calls the renderButtons() function
    renderButtons();

    // Performs the search and returns the GIFs

    $(document).on('click', '.animal', function () {
        // $('button').on('click', '.animal', function () {
        var animal = $(this).data('name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {

                console.log(queryURL);

                console.log(response);

                var results = response.data;

                $('#animals').empty();

                for (var i = 0; i < results.length; i++) {

                    var animalDiv = $('<div>');

                    var p = $('<p>').text("Rating: " + results[i].rating);

                    var animalImage = $('<img>');
                    animalImage.attr('src', results[i].images.fixed_height.url);
                    animalImage.attr('data-still', results[i].images.fixed_height_still.url);
                    animalImage.attr('data-animate', results[i].images.fixed_height.url);
                    animalImage.attr('data-state', "animate");
                    animalDiv.prepend(p);
                    animalDiv.prepend(animalImage);

                    $('#animals').prepend(animalDiv);

                }

                // this pauses and unpauses


                $(document).on('click', 'img',  function () {

                    var state = $(this).attr('data-state');

                    if (state == 'animate') {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    } else {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    }

                });
            });
    });

  });
// });
