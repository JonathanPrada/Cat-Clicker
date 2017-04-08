var firstCat = 0;
var secondCat = 0;

$(document).ready(function() {
    $("#first-cat-name").append("Whiskers")
    $("#second-cat-name").append("Chewie")
});

$(document).ready(function(){
    $("#first-cat-pic").click(function(){
        firstCat++;
        $(".first-cat-clicks").empty().append(firstCat);
    });
});

$(document).ready(function(){
    $("#second-cat-pic").click(function(){
        secondCat++;
        $(".second-cat-clicks").empty().append(secondCat);
    });
});

