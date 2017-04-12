$(function(){
    var model = {
        //Holds the current cat
        currentCat: null,
        //Our array of cat objects
        cats: [
        {"id": 1, "name": "Whiskers", "img": "img/cat1.jpg", "votes": 0},
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
            AdminView.init();
            AdminView.hideAdmin();
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
        },
        writeToModel: function(name, pic, votes) {
            var id, i;

            //Use the current cat id
            id = model.currentCat.id;

            //For each of the cats in storage
            for (i = 0; i < model.cats.length; i++) {
                // If our current cat id matches the id in the object
                if (model.cats[i].id == id) {
                    //Update name
                    model.cats[i].name = name;
                    //Update img
                    model.cats[i].img = pic;
                    //Update votes
                    model.cats[i].votes = votes;
                }
            }
            //Refresh the cat view
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
                AdminView.render();
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
                        AdminView.render();
                    };
                })(cat));

                // finally, add the element to the list
                this.CatList.appendChild(elem);
            }
        }
    };

    var AdminView = {
        init: function() {
            //Our admin button for editing cat stuff
            this.CatAdminButton = document.getElementById('admin');
            //Our cancel button for stopping the editing of cat stuff
            this.CatCancelButton = document.getElementById('cancel');
            //Our save button for saving the editing cat of stuff
            this.CatSaveButton = document.getElementById('save');
            //Our cat name field
            this.CatNameField = document.getElementById('cat-name-field');
            //Our cat pic field
            this.CatPicField = document.getElementById('cat-pic-field');
            //Our cat votes field
            this.CatVotesField = document.getElementById('cat-votes-field');

            //Render the view
            this.render()
        },
        render: function(){
            //Variables we need
            var interface, name, pic, votes;

            //Get the current cat through the controller
            var currentCat = controller.getCurrentCat();
            this.CatNameField.value = currentCat.name;
            this.CatPicField.value = currentCat.img;
            this.CatVotesField.value = currentCat.votes;

            //Event listener to toggle our admin view
            this.CatAdminButton.addEventListener('click', function(){
                if(interface){
                    interface = false;
                    document.getElementById("cat-admin-form").style.display="none";
                } else {
                    interface = true;
                    document.getElementById("cat-admin-form").style.display="block";
                }
            });

            //Event listener to toggle our admin view when cancelled
            this.CatCancelButton.addEventListener('click', function(){
                document.getElementById("cat-admin-form").style.display="none";
            });

            //Event listener to save changes to the cats
            this.CatSaveButton.addEventListener('click', function(){
                name = document.getElementById("cat-name-field").value;
                pic = document.getElementById("cat-pic-field").value;
                votes = document.getElementById("cat-votes-field").value;

                //send to a function in controller, which stores to model
                controller.writeToModel(name, pic, votes);

            });

        },
        hideAdmin: function() {
            this.interface = false;
            document.getElementById("cat-admin-form").style.display="none";
        }
    };

    controller.init();
});