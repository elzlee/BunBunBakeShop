/* (1) Create a Roll object that stores its type, price, glazing and pack options. 
price = current price, could be updated */

class Roll {
    constructor (type, basePrice, glazing, size){
        this.type = type;
        this.basePrice = basePrice;
        this.glazing = glazing;
        this.glazingPriceAdaptation = 0;
        this.size = size;
        this.sizePriceAdaptation = size;
        this.adjustedPrice = basePrice;
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

/* initializing the Rolls */
const roll1 = new Roll("originalRoll", 2.49, "keeporiginal", 1);
const roll2 = new Roll("appleRoll", 3.49, "keeporiginal", 1);
const roll3 = new Roll("raisinRoll", 2.99, "keeporiginal", 1);
const roll4 = new Roll("walnutRoll", 3.49, "keeporiginal", 1);
const roll5 = new Roll ("chocRoll", 3.99, "keeporiginal", 1);
const roll6 = new Roll ("strawberryRoll", 2.49, "keeporiginal", 1);

const oldRollsArr = [roll1, roll2, roll3, roll4, roll5, roll6];


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
  console.log("opption="+option)
  option.textContent = glazingOption;
  option.value = priceAdaptation;
  console.log("glazingSelect=" + glazingSelect)
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


/* (4) Compute new price */
function glazingChange(selectElement, rollnum) {
    let thisRoll=oldRollsArr[rollnum-1]; /* for when there are multiple detail pages */
    thisRoll.glazing = selectElement.options[selectElement.selectedIndex].text;
    thisRoll.glazingPriceAdaptation = parseFloat(selectElement.value);
    let adjustedPrice = (thisRoll.basePrice + thisRoll.glazingPriceAdaptation) 
                            * thisRoll.sizePriceAdaptation;
    thisRoll.adjustedPrice = (Math.round(adjustedPrice * 100) / 100).toFixed(2); 
    console.log(thisRoll.glazing);
    console.log(thisRoll.glazingPriceAdaptation);
    console.log(thisRoll.adjustedPrice);
    document.getElementById("adjustedPriceShown").innerHTML = "$" + thisRoll.adjustedPrice;
  
}

function packChange(selectElement, rollnum) {
    let thisRoll=oldRollsArr[rollnum-1]; /* for when there are multiple detail pages */
    thisRoll.size = selectElement.options[selectElement.selectedIndex].text;
    thisRoll.sizePriceAdaptation = parseFloat(selectElement.value);
    let adjustedPrice = (thisRoll.basePrice + thisRoll.glazingPriceAdaptation) 
                            * thisRoll.sizePriceAdaptation;
    thisRoll.adjustedPrice = (Math.round(adjustedPrice*100)/100).toFixed(2);
    console.log(thisRoll.size);
    console.log(thisRoll.sizePriceAdaptation);
    console.log(thisRoll.adjustedPrice);
    document.getElementById("adjustedPriceShown").innerHTML = "$" + thisRoll.adjustedPrice;
  
}
/* ------------------------ CART -------------------------- */
const cart = [];


/* ------------------------ URL SEARCH PARAMS -------------------------- */

// Get query string from URL. This is the list of params that begin with a ? mark. 
const queryString = window.location.search;
console.log("queryString = " + queryString);

//Use the query string to create a URLSearchParams object
const params = new URLSearchParams(queryString);
console.log("params = " + params);

//Access the param we want using "get" method 
const chosenRoll = params.get('roll');
console.log("chosenRoll = " + chosenRoll);

/* ------------------------ UPDATE HTML GIVEN URL PARAMS -------------------------- */

const headerHTML = document.querySelector('#banner');
headerHTML.innerText = chosenRoll + ' Cinnamon Roll';

const imgHTML = document.querySelector('.product-image');
imgHTML.src = "images/products/" + rolls[chosenRoll]["imageFile"];

const priceHTML = document.querySelector('#adjustedPriceShown');
priceHTML.innertext = "$" + rolls[chosenRoll].basePrice;

