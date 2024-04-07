import React, { useState } from 'react';
import './calender.css';
//import { firestore } from "../firebase.js";
//import { addDoc, collection } from "@firebase/firestore";

function CalendarDays(props) {
    const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];
    //const ref = collection(firestore, "calendarInfo")

    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
            date: new Date(firstDayOfMonth),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
            year: firstDayOfMonth.getFullYear(),
        };

        currentDays.push(calendarDay);
    }

    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (e, day) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    return (
        <div className="table-content">
            {currentDays.map((day) => (
                <div
                    className={'calendar-day' + (day.currentMonth ? ' current' : '') + (day.selected ? ' selected' : '')}
                    key={day.date.toISOString()}
                >
                    <p>{day.number}</p>
                    <input
                        type="text" 
                        name={`input_${day.date.getDate()}`}
                        value={inputValues[`input_${day.date.getDate()}`] || ''}
                        onChange={(e) => handleInputChange(e, day)}
                    />
                </div>
            ))}
        </div>
    );
}

export default CalendarDays;
