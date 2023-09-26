import React from 'react';
import "./Form.css";

function Form() {
    const [formData, setFormData] = React.useState({cardNumber : "", expDate : "", cvv : ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({...prevFormData, [name] : value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Number: ${formData.cardNumber}, Expiry Date: ${formData.expDate}, CVV: ${formData.cvv}`);
    };

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
            </div>
        </form>
        </div>
    );
}

export default Form;