$(function(){
    var model = {
        //Holds the current cat
        currentCat: null,
        //Our array of cat objects
        cats: [
        {"id": 1, "name": "Whiskers", "img": "img/cat1.jpg", "votes": 12},
        {"id": 2, "name": "Chewie", "img": "img/cat2.jpg", "votes": 0},
        {"id": 3, "name": "Twins", "img": "img/cat3.jpg", "votes": 0},
        {"id": 4, "name": "Grumpy", "img": "img/cat4.jpg", "votes": 0},
        {"id": 5, "name": "Shocker", "img": "img/cat5.jpg", "votes": 0}]
    };

    var controller = {
        init: function() {
            //Set current cat as first one on list
            model.currentCat = model.cats[0];

            //Initialize our views
            ListView.init();
            CatView.init();
        },
        //Returns our current cat
        getCurrentCat: function () {
            return model.currentCat;
        },
        //Returns our cat list
        getCats: function () {
            return model.cats;
        },
        // set the currently-selected cat to the object passed in
        setCurrentCat: function(cat) {
            model.currentCat = cat;
        },
        // increments the counter for the currently-selected cat
        incrementCounter: function() {
        model.currentCat.votes++;
        CatView.render();
        }
    };

    var CatView = {
        init: function() {
            //Our cat name
            this.CatName = document.getElementById('cat-name');
            //Our cat pic
            this.CatPic = document.getElementById('cat-pic');
            //Our cat votes
            this.CatVotes = document.getElementById('cat-votes');

            // on click, increment the current cat's counter
            this.CatPic.addEventListener('click', function(){
                controller.incrementCounter();
            });

            //Render the view
            this.render()
        },
        render: function(){
            //Get the current cat through the controller
            var currentCat = controller.getCurrentCat();
            this.CatName.textContent = currentCat.name;
            this.CatPic.src = currentCat.img;
            this.CatVotes.textContent = currentCat.votes;
        }
    };

    var ListView = {
        init: function() {
            //Our cat list
            this.CatList = document.getElementById('cat-list');

            //Render the view
            this.render();
        },
        render: function(){
            //Set up some variables
            var i, elem, cat;

            //Set up where our list items will go
            this.CatList.innerHTML = "";

            //Grab our list of cat objects, meow...
            var cats = controller.getCats()

            //For each of those cats
            for (i = 0; i < cats.length; i++) {
                //Get the cat we are on in this iteration
                cat = cats[i];

                // make a new cat list item and set its text
                elem = document.createElement('li');
                elem.textContent = cat.name;

                // on click, setCurrentCat and render the catView
                // (this uses our closure-in-a-loop trick to connect the value
                //  of the cat variable to the click event function)
                elem.addEventListener('click', (function(catCopy) {
                    return function() {
                        controller.setCurrentCat(catCopy);
                        CatView.render();
                    };
                })(cat));

                // finally, add the element to the list
                this.CatList.appendChild(elem);
            }
        }
    };


    controller.init();
});