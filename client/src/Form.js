import React from 'react';
import "./Form.css";
import checkMark from "./check-mark.png";
import stopSign from "./stop-sign.png";

function Form() {
    const [formData, setFormData] = React.useState({cardNumber : "", expDate : "", cvv : ""});
    const [myIcon, setIcon] = React.useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name] : value}));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formValues ={cardNumber : formData.cardNumber, expDate : formData.expDate, cvv : formData.cvv};

        let res = await fetch("http://localhost:3001/api/checkcard", {
            method: "POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(formValues)
        });

        let resjson = await res.json();

        if(res.status === 200) {

            setIcon(checkMark);
        } else if (res.status === 404) {
            setIcon(stopSign);
        }

        showImg();
    };

    function hideImg() {
        document.getElementById("sign").style.display = "none";
    }

    function showImg() {
        document.getElementById("sign").style.display = "block";
    }

    return (
        <div className="container">
        <form className="form" onSubmit={handleSubmit}>
            <div className="outer-flex">
                <div className="inner-flex">
                    <div>
                        <label className="label" htmlFor="cardNumber">Card Number:</label>
                        <input className="form-field medium-form-field" type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="label" htmlFor="expDate">Expiry date:</label>
                        <input className="form-field short-form-field" placeholder="MM/YY" type="text" id="expDate" name="expDate" value={formData.expDate} onChange={handleChange} />
                    </div>

                    <div>
                        <label className="label" htmlFor="cvv">CVV:</label>
                        <input className="form-field short-form-field" type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} />
                    </div>
                </div>
                <button type="submit" className="submit-button">Submit</button>
                <img id="sign" height="48" width="48" src={myIcon} alt="icon" onError={hideImg}/>
            </div>
        </form>
        </div>
    );
}

export default Form;