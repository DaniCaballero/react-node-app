const express=require("express");

const router=express.Router();

function validateArgs(cardNumber, expDate, cvv) {
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
    // Check for Luhn's algorithm
};

router.post("/api/checkcard", (req, res) => {
    const cardNumber = req.body.cardNumber;
    const expDate = req.body.expDate;
    const cvv = req.body.cvv;

    console.log(`values are ${cardNumber} ${expDate} and ${cvv}`);

    let isValid = validateArgs(cardNumber, expDate, cvv);

    if (isValid == true) {
        res.status(200).json({success : "bip!"});
    } else {
        res.status(404).json({failure: "bop :("});
    }
    
})

module.exports=router