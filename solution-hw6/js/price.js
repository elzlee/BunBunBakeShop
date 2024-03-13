const glazingPrices = {
	"Keep original" : 0.0,
	"Sugar milk" : 0.0,
	"Vanilla milk" : 0.50,
	"Double chocolate" : 1.50
};

const packPrices = {
	"1" : 1, "3" : 3, "6" : 5, "12" : 10
};

let glazingOption = "Keep original";
let packOption = 1;
let basePrice = 0;
let rollType = NaN; //why is this still NaN
let mycart = [];
//let window.cart = []; // creates a global variable cart

populateCinnamonData();
populateSelectOptions();

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

		this.element = null;
    }
	get totalPrice() {
		const glazingPrice = glazingPrices[this.glazing];
		const packPrice = packPrices[this.size];
		const totalPrice = (this.basePrice + glazingPrice) * packPrice;
		return totalPrice.toFixed(2);
	  }
}


//--------------------- FUNCTIONS BELOW ---------------------------//

function createElement(item){
	console.log('Creating an Element of a cart item!')
    const template = document.querySelector('#cart-item-template');
    const clone = template.content.cloneNode(true);
    item.element = clone.querySelector('.cart-item');

    const btnRemove = item.element.querySelector('.remove');
    console.log(btnRemove);
    btnRemove.addEventListener('click', () => {
        removeItem(item);
    });

    const cartWrapperElement = document.querySelector('.cart-wrapper');
    cartWrapperElement.append(item.element);

    //update total cart price on DOM
    const cartTotalPriceElement = document.querySelector('.cart-total-price');
    cartTotalPriceElement.innerText = "$ " + calculateCartTotalPrice(mycart);

    updateCartElement(item);
}


function populateCinnamonData() {
	const params = new URLSearchParams(window.location.search);
	rollType = params.get("roll");
	if (rollType) {
		const imagePath = "images/products/" + rolls[rollType]["imageFile"];
		const price = rolls[rollType]["basePrice"];

		const bannerElement = document.querySelector("#banner");
		bannerElement.innerText = rollType + " Cinnamon Roll";

		const imageElement = document.querySelector("img.product-image");
		imageElement.src = imagePath;

		basePrice = parseFloat(price);
		updateTotalPrice();
	} else {
		console.error("No 'roll' parameter provided in the URL.");
	}

}

function populateSelectOptions() {
	// Populate glazing options with corresponding price adaptation values
	const glazingSelect = document.querySelector("select#glazing-options");

	for (const [glazing, price] of Object.entries(glazingPrices)) {
		const option = document.createElement("option");
		option.textContent = glazing;
		option.value = price;
		glazingSelect.appendChild(option);
	}

	// Populate pack options with corresponding price adaptation values
	const packSelect = document.querySelector("select#pack-options");

	for (const [pack, price] of Object.entries(packPrices)) {
		const option = document.createElement("option");
		option.textContent = pack;
		option.value = price;
		packSelect.appendChild(option);
	}
}


/* Record the current glazing option and update the total price */
function glazingChange(element) {
	glazingOption = element.options[element.selectedIndex].text;
	updateTotalPrice();
}

/* Record the current pack option and update the total price */
function packChange(element) {
	packOption = element.options[element.selectedIndex].text;
	updateTotalPrice();
}

function updateTotalPrice() {
	const glazingPrice = glazingPrices[glazingOption];
	const packPrice = packPrices[packOption];
	const totalPrice = (basePrice + glazingPrice) * packPrice;
	const totalPriceField = document.querySelector("#add-cart span");
	totalPriceField.textContent = "$" + totalPrice.toFixed(2);
}




//--------------------- Local Storage ---------------------------//
if (localStorage.getItem('storedCart') != null) {
	// When the page loads, try to retrieve the cart from the local storage.
	retrieveFromLocalStorage(); 
} 

function addCartItem(rollType, rollGlazing, packSize, basePrice) {
    const cartItem = new Roll(rollType, rollGlazing, packSize, basePrice);
    mycart.push(cartItem);
    return cartItem;
}

function retrieveFromLocalStorage() {
	//If no cart exists in the storage, create an empty cart array.
	const cartArrayString = localStorage.getItem('storedCart');
	const cartArray = JSON.parse(cartArrayString);
	for (const cartData of cartArray) {
	  const cart = addCartItem(cartData.rollType, cartData.rollGlazing,
		cartData.packSize, cartData.basePrice);
	  createElement(cart);
	}
}
// cartjson = localstorage.getItem['storedCart'] + cart
// cartarray = parse json version
// cartarray + add to mycart, put into localstorage


function addToCart() {
	const roll = new Roll(rollType, glazingOption, packOption, basePrice);
	mycart.push(roll);

	// Convert the updated cart to JSON
	const mycartArray = Array.from(mycart);
	console.log("mycartArray = " + mycartArray);
	const mycartArrayString = JSON.stringify(mycartArray);
	console.log("mycartArrayString = " + mycartArrayString);

	localStorage.setItem('storedCart', mycartArrayString); //save text in local storage

	printStoredCart(); // print the current contents of the cart in local storage after saving.
}

function printStoredCart() {
    const storedCartString = localStorage.getItem('storedCart');
    if (storedCartString) {
        const storedCartArray = JSON.parse(storedCartString);
        const storedCartJson = JSON.stringify(storedCartArray, null, 2); // Indentation of 2 spaces
        console.log("Stored Cart Values:");
        console.log(storedCartJson);
    } else {
        console.log("No stored cart found.");
    }
}
