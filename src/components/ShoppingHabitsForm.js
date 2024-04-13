import React, { useState} from "react";
import './homepage.css';
import { firestore } from "../firebase.js";
import { addDoc, collection } from "@firebase/firestore";

const ShoppingHabitsForm = ({ updateProgress }) => {
    const ref = collection(firestore, "shoppingHabits");

    const [inputValues, setInputValues] = useState({
        itemsPurchased: "",
        shoppingFrequency: "",
        monthlySpending: "",
        areasToImprove: ""
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputValues);

        const data = {
            itemsPurchased: inputValues.itemsPurchased,
            shoppingFrequency: inputValues.shoppingFrequency,
            monthlySpending: inputValues.monthlySpending,
            areasToImprove: inputValues.areasToImprove
        };

        try {
            await addDoc(ref, data);
            setSubmitted(true);
            updateProgress(data); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            {!submitted ? (
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="itemsPurchased">Types of items frequently purchased:</label>
                        <input
                            type="text"
                            id="itemsPurchased"
                            name="itemsPurchased"
                            value={inputValues.itemsPurchased}
                            onChange={handleChange}
                            placeholder="e.g., clothing, groceries, electronics"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="shoppingFrequency">Frequency of shopping trips:</label>
                        <input
                            type="text"
                            id="shoppingFrequency"
                            name="shoppingFrequency"
                            value={inputValues.shoppingFrequency}
                            onChange={handleChange}
                            placeholder="e.g., daily, weekly, monthly"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="monthlySpending">Amount spent on shopping per month:</label>
                        <input
                            type="text"
                            id="monthlySpending"
                            name="monthlySpending"
                            value={inputValues.monthlySpending}
                            onChange={handleChange}
                            placeholder="e.g., $200, $500, $1000"
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="areasToImprove">Specific areas to improve:</label>
                        <textarea
                            id="areasToImprove"
                            name="areasToImprove"
                            value={inputValues.areasToImprove}
                            onChange={handleChange}
                            placeholder="e.g., what budget do you want to stick to?"
                            rows={5}
                            cols={50}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <p>Thank you for your submission!</p>
            )}
        </div>
    );
}

export default ShoppingHabitsForm;
