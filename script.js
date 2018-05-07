var movies = ['The Shining', 'The Texas Chainsaw Massacre', 'The Babadook', 'American Psycho', 'A Nightmare on Elm Street', 'Scream', 'The Evil Dead', 'The Cabin in the Woods', 'Hellraiser']

//BUTTON CREATION FUNCTION
function renderButtons() {
    $('#buttonField').empty();
    for (let i=0; i<movies.length; i++) {
        var newButton = $('<button>');
        newButton.text(movies[i]).attr('data-movie', movies[i] + ' movie').addClass('movie-button');
        $('#buttonField').append(newButton);
    }
}

// GIF GENERATION ON BUTTON CLICK 

function generateButton() {
    var title = $(this).attr('data-movie');
    var queryURL = `http://api.giphy.com/v1/gifs/search?q=${title}&api_key=dc6zaTOxFJmzC&limit=10`;
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then (function (response) {
        console.log(response);
        for (let j=0; j<10; j++) {
            var newDiv = $('<div>');
            newDiv.addClass('horror-div');

            var newPic = $('<img>');
            newPic.attr('src', response.data[j].images.fixed_height_still.url).addClass('horror-pic').attr('stillSrc', response.data[j].images.fixed_height_still.url).attr('movingSrc', response.data[j].images.fixed_height.url).attr('status', 'inactive');
            newDiv.append(newPic);

            var newRating = $('<p>');
            newRating.text(`Rating: ` + response.data[j].rating.toUpperCase());
            newDiv.append(newRating);


            $('#picField').prepend(newDiv);
        }

        //MOUSEOVER ZOOM
        $('.horror-pic').on('mouseenter', event => {
            $(event.currentTarget).animate({width: '95%'}, 'fast')
        }).on('mouseleave', event => {
            $(event.currentTarget).animate({width: '80%'}, 'fast')
        });

        //CLICK EVENTS
        $('.horror-pic').off('click');
        $('.horror-pic').on('click', event => {
            var status = $(event.currentTarget).attr('status')
            if (status === 'inactive') { //CHANGING SOURCE TO ANIMATED SOURCE
                $(event.currentTarget).attr('src', $(event.currentTarget).attr('movingSrc'));
                $(event.currentTarget).attr('status', 'active');
            } else {
                $(event.currentTarget).attr('src', $(event.currentTarget).attr('stillSrc'));
                $(event.currentTarget).attr('status', 'inactive');
            }
        })
    });
};

//MOVIE ADDER BUTTON
$("#movieAdder").on("click", function(event) {
    event.preventDefault();
    var movie = $("#movieInput").val().trim();
    movies.push(movie);
    $('#movieInput').val('');
    renderButtons();
  });


//INITIALIZING BUTTON FIELD
renderButtons();

//BUTTON CLICK LISTENER
$(document).on("click", ".movie-button", generateButton);