import React from 'react';
import './calender.css';
import { firestore } from "./firebase.js";
import { addDoc, collection } from "@firebase/firestore";

function CalendarDays(props) {
    const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

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

    const handleInputChange = async (e, day) => {
        const { value } = e.target;
        const docRef = collection(firestore, "calendarInfo");
        const docData = {
            day: day.number,
            month: day.month + 1,
            year: day.year,
            input: value
        };

        try {
            await addDoc(docRef, docData);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
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
                        value={day.input}
                        onChange={(e) => handleInputChange(e, day)}
                    />
                </div>
            ))}
        </div>
    );
}

export default CalendarDays;
