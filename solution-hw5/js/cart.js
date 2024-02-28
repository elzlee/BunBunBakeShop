const glazingPrices = {
	"Keep original" : 0.0,
	"Sugar milk" : 0.0,
	"Vanilla milk" : 0.50,
	"Double chocolate" : 1.50
};

const packPrices = {
	"1" : 1, "3" : 3, "6" : 5, "12" : 10
};

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

let mycart = new Set(); //how to make price.js and cart.js update the same cart variable?
//let window.cart = []; // creates a global variable cart

//Hard coding for HW5
addCartItem('Original', 'Sugar milk', '1', rolls['Original']['basePrice']); //totalPrice = 2.49
addCartItem('Walnut', 'Vanilla milk', '12', rolls['Walnut']['basePrice']); //totalPrice = 39.90
addCartItem('Raisin', 'Sugar milk', '3', rolls['Raisin']['basePrice']); //totalPrice = 8.97
addCartItem('Apple', 'Keep original', '3', rolls['Apple']['basePrice']); //totalPrice = 10.47

function addCartItem(rollType, rollGlazing, packSize, basePrice) {
    const cartItem = new Roll(rollType, rollGlazing, packSize, basePrice);
    mycart.add(cartItem);
    return cartItem;
}

console.log("Current Cart Items: " + mycart);

//adding to DOM template
for (const item of mycart) {
	console.log(item);
	createElement(item);
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

function updateCartElement(item){
    //get refs to child elements
    const itemImageElement = item.element.querySelector('.product-image');
	const itemDetailTypeElement = item.element.querySelector('.item-detail-type');
    const itemDetailGlazingElement = item.element.querySelector('.item-detail-glazing');
	const itemDetailSizeElement = item.element.querySelector('.item-detail-size');
	const itemPriceElement = item.element.querySelector('.item-price');
    
    //add to DOM
    itemImageElement.src = "images/products/" + rolls[item.type]["imageFile"];
    itemDetailTypeElement.innerText = item.type + " Cinnamon Roll";
    itemDetailGlazingElement.innerText = "Glazing: " + item.glazing;
    itemDetailSizeElement.innerText = "Pack Size: " + item.size;
    itemPriceElement.innerText = item.totalPrice; // Use item.totalPrice instead of rolls.totalPrice
}

function calculateCartTotalPrice(mycart){
    let cartTotalPrice = 0;
    for (const item of mycart) {
        cartTotalPrice += parseFloat(item.totalPrice);
    }
    return cartTotalPrice.toFixed(2); 
}
//may not use this function bc i added a getter function in the Roll class
function totalPriceCalculator(roll) {
	let glazingOption = roll.glazing;
	let packOption = roll.size;
	const glazingPrice = glazingPrices[glazingOption];
	const packPrice = packPrices[packOption];
	const totalPrice = (basePrice + glazingPrice) * packPrice;
	return totalPrice.toFixed(2);
}

function removeItem(item){
    item.element.remove(); //remove graphical element from DOM
    mycart.delete(item); // remove the data too!

    //update total cart price on DOM
    const cartTotalPriceElement = document.querySelector('.cart-total-price');
    cartTotalPriceElement.innerText = "$ " + calculateCartTotalPrice(mycart);

}