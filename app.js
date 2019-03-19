$(function () {
    populateButtons(searchArray, 'searchButton', '#buttonsArea');

})


//Inital buttons as well as place to store user buttons
var searchArray = ["dog", "cat", "snake", "monkey", "bear", "rat", "bat", "bird"]
//function that creates buttons for items in searchArray
function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < searchArray.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr("data-type", searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    };
    //on click for search button as well as queryUrl
    $(document).on('click', '.searchButton', function () {
        var type = $(this).data('type');
        console.log(type);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=ByxQy1TdW1oKZ94Y5mgv37BM3mXobILS";
        //ajax call to giphy API for items in searchArray
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < 10; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var p = $('<p>').text('Rating: ' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        });
    });
    //Gifs start as still but once clicked on they become animated
    $(document).on('click', '.searchImage', function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animated'));
            $(this).attr('data-state', 'animated');

        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });

};
$("body").on('click', "#addSearchBtn", function (event) {
    console.log("whats up.");
    event.preventDefault();
    var newSearch = $("#search-input").val().trim();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    return false;
});
