var movies = ['The Shining', 'The Texas Chainsaw Massacre', 'The Babadook', 'American Psycho', 'A Nightmare on Elm Street', 'Scream', 'The Evil Dead', 'Alien', 'The Witch', 'The Cabin in the Woods', 'Hellraiser']

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
            newDiv.addClass('horror-div inactive');

            var newPic = $('<img>');
            newPic.attr('src', response.data[j].images.fixed_height_still.url).addClass('horror-pic');
            newDiv.append(newPic);

            var newRating = $('<p>');
            newRating.text(`Rating: ` + response.data[j].rating.toUpperCase());
            newDiv.append(newRating);


            $('#picField').prepend(newDiv);
        }
    });
};

//MOUSEOVER EVENTS
$('.horror-pic').on('mouseenter', event => {

})


//INITIALIZING BUTTON FIELD
renderButtons();

//BUTTON CLICK LISTENER
$(document).on("click", ".movie-button", generateButton);