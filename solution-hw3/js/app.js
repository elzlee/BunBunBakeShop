/* (1) Create a Roll object that stores its type, price, glazing and packSize options. 
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

        /*this.element = document.querySelector(elementID); */
    }
}
/* initializing the Rolls */
const roll1 = new Roll("originalRoll", 2.49, "keeporiginal", 1);
const roll2 = new Roll("appleRoll", 3.49, "keeporiginal", 1);
const roll3 = new Roll("raisinRoll", 2.99, "keeporiginal", 1);
const roll4 = new Roll("walnutRoll", 3.49, "keeporiginal", 1);
const roll5 = new Roll ("chocRoll", 3.99, "keeporiginal", 1);
const roll6 = new Roll ("strawberryRoll", 2.49, "keeporiginal", 1);

const rolls = [roll1, roll2, roll3, roll4, roll5, roll6];


/* (2) Add JavaScript objects to represent price adaptations based on user selections. 
They are listed below. You may hard-code these objects */
class Glazing {
    constructor (option, priceAdaptation){
        this.option = option;
        this.priceAdaptation = priceAdaptation;
    }
}
const glazing1 = new Glazing('Keep Original', 0)
const glazing2 = ('Sugar Milk', 0)
const glazing3 = ('Vanilla Milk', 0.50)
const glazing4 = ('Double Chocolate', 1.50)

class PackSize {
    constructor (option, priceAdaptation){
        this.option = option;
        this.priceAdaptaion = priceAdaptation;
    }
}
const packsize1 = (1, 1)
const packsize3 = (3, 3)
const packsize6 = (6, 5)
const packsize12 = (12, 10)

const glazingList = [glazing1, glazing2, glazing3, glazing4];
const packsizeList = [packsize1, packsize3, packsize6, packsize12]






function glazingChange(element) {
// get value of selected glazing option
const priceChange = element.value;

// add your code to do update the price ...
}

/* (4) Compute new price */
function glazingChange(selectElement, rollnum) {
    let thisRoll=rolls[rollnum-1]; /* for when there are multiple detail pages */
    thisRoll.glazing = selectElement.options[selectElement.selectedIndex].text;
    thisRoll.glazingPriceAdaptation = parseFloat(selectElement.value);
    let adjustedPrice = (thisRoll.basePrice + thisRoll.glazingPriceAdaptation) 
                            * thisRoll.sizePriceAdaptation;
    thisRoll.adjustedPrice = Math.round((adjustedPrice) * 100) / 100; 
    console.log(thisRoll.glazing);
    console.log(thisRoll.glazingPriceAdaptation);
    console.log(thisRoll.adjustedPrice);
    document.getElementById("adjustedPriceShown").innerHTML = thisRoll.adjustedPrice;
  
}

function sizeChange(selectElement, rollnum) {
    let thisRoll=rolls[rollnum-1]; /* for when there are multiple detail pages */
    thisRoll.size = selectElement.options[selectElement.selectedIndex].text;
    thisRoll.sizePriceAdaptation = parseFloat(selectElement.value);
    let adjustedPrice = (thisRoll.basePrice + thisRoll.glazingPriceAdaptation) 
                            * thisRoll.sizePriceAdaptation;
    thisRoll.adjustedPrice = Math.round(adjustedPrice*100)/100;
    console.log(thisRoll.size);
    console.log(thisRoll.sizePriceAdaptation);
    console.log(thisRoll.adjustedPrice);
    document.getElementById("adjustedPriceShown").innerHTML = thisRoll.adjustedPrice;
  
}

