const express=require("express");

const router=express.Router();

function checkFormat(cardNumber, expDate, cvv) {
    let result = true;
    const re = /^[0-9]+$/;
    const expRegex = /^\d{2}\/\d{2}$/; // Checking if expiry date is in MM/YY format

    if (re.test(cardNumber) == false || re.test(cvv) == false || expRegex.test(expDate) == false) {
        result = false;
    }

    return result;
}

function validateArgs(cardNumber, expDate, cvv) {

    //Validate if PAN and CVV only contain numbers and if the expiry date is in the right format
    let formatBool = checkFormat(cardNumber, expDate, cvv);

    if (formatBool == false) {
        return false;
    }

    // Check if the card is an American Express card
    if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {

        if (cvv.length !== 4) {
            return false;
        }
    } else {
        if (cvv.length !== 3) {
            return false;
        }
    }

    // Check that PAN is between 16 and 19 digits long
    if (cardNumber.length >= 16 && cardNumber.length <= 19) {
        //pass
    } else {
        return false;
    }

    // Verify that expiry date is after current time
    let date_values = expDate.split("/");
    let expMonth = date_values[0];
    let expYear = date_values[1];

    const date = new Date();
    let month = date.getMonth() + 1;
    let year = date.toLocaleDateString('en', {year: '2-digit'}); 

    if (expMonth <= month) {
        if (expYear <= year) {
            return false;
        }
    } else {
        if (expYear < year) {
            return false;
        }
    }

    return true;
};

router.post("/api/checkcard", (req, res) => {
    const cardNumber = req.body.cardNumber;
    const expDate = req.body.expDate;
    const cvv = req.body.cvv;

    console.log(`values are ${cardNumber} ${expDate} and ${cvv}`);

    let isValid = validateArgs(cardNumber, expDate, cvv);

    if (isValid == true) {
        res.json(1); // Success
    } else {
        res.json(0); // Failure :(
    }
})

module.exports=router