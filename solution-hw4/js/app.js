/* (1) Create a Roll object that stores its type, price, glazing and pack options. 
price = current price, could be updated */

class Roll {
    constructor (rollType, rollGlazing, packSize, basePrice){
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        //this.updateElement();
    }
        /*
    updateElement() {
        const noteImageElement = this.element.querySelector('.notecard-thumbnail');
        const noteTitleElement = this.element.querySelector('.note-title');  

        noteImageElement.src = this.noteImageURL;
        noteTitleElement.innerText = this.noteTitle;
    }
*/
}
/* Setting some default values */
let basePrice = 2.49;
let glazingOption = "Keep Original";
let packOption = 1;
let glazingPrice = 0;
let packPrice = 1;

/* (2) Add JavaScript objects to represent price adaptations based on user selections. */
const glazingPrices = {
    "Keep Original": 0.0,
    "Sugar Milk": 0.0,
    "Vanilla Milk": 0.50,
    "Double Chocolate": 1.50,
};
  
const packPrices = {
    1: 1,
    3: 3,
    6: 5,
    12: 10,
};


/* (3.1) Populate glazing options with corresponding price adaptation values */
const glazingSelect = document.getElementById("glazing-options");

for (const [glazingOption, priceAdaptation] of Object.entries(glazingPrices)) {
  const option = document.createElement("option");
  //console.log("option="+option)
  option.textContent = glazingOption;
  option.value = priceAdaptation;
  //console.log("glazingSelect=" + glazingSelect)
  glazingSelect.appendChild(option);
  /* appendChild: adds a node to the end of the list of children 
                  of a specified parent node.*/
}

/* (3.2) Populate pack options with corresponding price adaptation values */
const packSelect = document.getElementById("pack-options");

for (const [packOption, priceAdaptation] of Object.entries(packPrices)) {
  const option = document.createElement("option");
  option.textContent = packOption;
  option.value = priceAdaptation;
  packSelect.appendChild(option);
}



/* ------------------------ URL SEARCH PARAMS -------------------------- */

// Get query string from URL. This is the list of params that begin with a ? mark. 
const queryString = window.location.search;
//console.log("queryString = " + queryString);

//Use the query string to create a URLSearchParams object
const params = new URLSearchParams(queryString);
//console.log("params = " + params);

//Access the param we want using "get" method 
const chosenRoll = params.get('roll');
//console.log("chosenRoll = " + chosenRoll);

/* ------------------------ UPDATE HTML GIVEN URL PARAMS -------------------------- */

const headerHTML = document.querySelector('#banner');
headerHTML.innerText = chosenRoll + ' Cinnamon Roll';

const imgHTML = document.querySelector('.product-image');
imgHTML.src = "images/products/" + rolls[chosenRoll]["imageFile"];

const priceHTML = document.querySelector('#adjustedPriceShown');
priceHTML.innertext = "$" + rolls[chosenRoll].basePrice;

/* ------------------------ COMPUTE UPDATED PRICE -------------------------- */

/* Record the current glazing option and update the total price */
function glazingChange(selectElement) {
    glazingOption = parseFloat(selectElement.textContent); //update the default val
    glazingPrice = parseFloat(selectElement.value); //update the default val
    //console.log(glazingPrice);
    updateTotalPrice();
  }

/* Record the current pack option and update the total price */
function packChange(selectElement) {
    packOption = parseFloat(selectElement.textContent); //update the default val
    packPrice = parseFloat(selectElement.value); //update the default val
    //console.log(packPrice);
    updateTotalPrice();
}
  
function updateTotalPrice() {
    basePrice = rolls[chosenRoll].basePrice
    const totalPrice = (basePrice + glazingPrice) * packPrice;
    const totalPriceField = document.getElementById("adjustedPriceShown");
    totalPriceField.textContent = "$" + totalPrice.toFixed(2);
}

/* ------------------------ CART -------------------------- */
const cart = [];
const formattedCartForConsole = [];

function addToCart() {
    let bp = rolls[chosenRoll].basePrice;
    // glazingOption and packOption are global variables updated by the
    // glazingChange and packChange functions.
    let instance = new Roll("Original", glazingOption, packOption, bp);
    cart.push(instance);

    let formattedCartItem = JSON.stringify(instance, null, 4);
    formattedCartForConsole.push(formattedCartItem);

    console.log("Current cart items: " + formattedCartForConsole);
}

