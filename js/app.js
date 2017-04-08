var firstCat = 0;

//Hard coded cat list
var cats2 = [
        {"id": 1, "name": "Whiskers", "img": "img/cat1.jpg", "votes": 0},
        {"id": 2, "name": "Chewie", "img": "img/cat2.jpg", "votes": 0},
        {"id": 3, "name": "Twins", "img": "img/cat3.jpg", "votes": 0},
        {"id": 4, "name": "Grumpy", "img": "img/cat4.jpg", "votes": 0},
        {"id": 5, "name": "Shocker", "img": "img/cat5.jpg", "votes": 0},
        ]

//Set up the initial settings
$(document).ready(function() {
    $("#first-cat-name").append("select cat")
    $(".first-cat-clicks").empty().append("0");
    console.log(cats2[0].name)
});

//Append array to list
$(document).ready(function() {
    $.each(cats2, function( index, value ) {
        $("#cat-list").append("<li class='cats'>" +
            value.id + ". " + value.name + "</li>");
    });
});

//Based on choice, set the details
$(document).ready(function() {
    $( "#cat-list" ).on("click","li.cats", function(event) {
        //Get the ID from selected cat
        var title = $(this).text();
        var id = parseInt(title);
        //console.log(id)

        //Find the matching object based on ID passed in
        var result = $.grep(cats2, function(e){ return e.id == id; });

        //Set the title
        $("#first-cat-name").empty().append(result[0].name);

        //Set the votes
        $(".first-cat-clicks").empty().append(result[0].votes);

        //Set the image
        $('#first-cat-pic').attr('src',result[0].img);

        //Increase votes
        $("#first-cat-pic").click(function(){
            console.log("Cat name: " + result[0].name + ", This cats vote: " + result[0].votes++);
            $(".first-cat-clicks").empty().append(result[0].votes);
        });
    });
});
