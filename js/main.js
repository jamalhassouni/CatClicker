var catArea = document.getElementById('catArea');
var listCat = document.querySelectorAll("#listOfCats li");
for (var i = 0; i < listCat.length; i++) {
    var cat = listCat[i];
    cat.addEventListener("click", (function(catElem) {
        return function() {
            catArea.innerHTML = "";
            var elem = document.createElement("div");
            var h3 = document.createElement("h3");
            h3.textContent = catElem.dataset.name;
            var img = document.createElement("img");
            img.id = catElem.dataset.name;
            img.src = catElem.dataset.src;
            var span = document.createElement("span");
            var strongElem = document.createElement("strong");
            strongElem.id = 'numClick';
            strongElem.textContent = catElem.dataset.click;
            span.textContent = "click : ";
            span.appendChild(strongElem);
            elem.appendChild(img);
            elem.appendChild(h3);
            elem.appendChild(span);
            catArea.appendChild(elem);
            img.addEventListener('click', function() {
                catElem.dataset.click = parseInt(catElem.dataset.click) + 1;
                numClick.textContent = catElem.dataset.click;

            });
        };
    })(cat));
}


/* ===  Model === */
var model = {
    currentCat: null,
    cats: [{
            id: 0,
            clickCount: 0,
            name: 'kinta',
            imgSrc: 'img/kinta.jpg'
        },
        {
            id: 1,
            clickCount: 0,
            name: 'nina',
            imgSrc: 'img/nina.jpg'
        },
        {
            id: 2,
            clickCount: 0,
            name: 'emy',
            imgSrc: 'img/emy.jpg'
        }, {
            id: 3,
            clickCount: 0,
            name: 'maysa',
            imgSrc: 'img/maysa.jpg'
        }, {
            id: 4,
            clickCount: 0,
            name: 'roza',
            imgSrc: 'img/roza.jpg'
        }


    ]


};

/* === Octopus === */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];
        // tell our views to initialize
        catListView.init();
        view.init();
        AdminView.init();
    },
    getCurrentCat: function() {
        return model.currentCat;
    },
    getCats: function() {
        return model.cats;
    },
    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        view.render();
    }

};

/* ======= View ======= */

var view = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('catArea');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function() {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = "click " + currentCat.clickCount + " times";
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};


var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('listOfCats');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    var form = document.getElementById('form');
                    form.classList.add("hide");
                    octopus.setCurrentCat(catCopy);
                    view.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};
var AdminView = {
    init: function() {
        // store the DOM element for easy access later
        this.adminElem = document.getElementById('admin-btn');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var form = document.querySelector("#form"),
            saveBtn = document.getElementById('save'),
            cancelBtn = document.getElementById('cancel'),
            inputName = document.getElementById("formName"),
            inputUrl = document.getElementById("formUrl"),
            inputCount = document.getElementById("formCount");
        this.adminElem.addEventListener('click', function(e) {
            e.preventDefault();
            var currentCat = octopus.getCurrentCat();
            form.classList.remove("hide");
            inputName.value = currentCat.name;
            inputUrl.value = currentCat.imgSrc;
            inputCount.value = currentCat.clickCount;




        });
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            form.classList.add("hide");
        });

        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var currentCat = octopus.getCurrentCat();
            currentCat.name = inputName.value;
            currentCat.imgSrc = inputUrl.value;
            currentCat.clickCount = parseInt(inputCount.value);
            view.render();
            form.classList.add("hide")

        });


    }

};
// make it go!
octopus.init();