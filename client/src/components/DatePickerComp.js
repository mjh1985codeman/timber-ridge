import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePickerComp({unavailableDates, onDateSelect, ...rest}) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [disabledDates, setDisabledDates] = useState([]);

    const newDisabledDates = [];
   useEffect(() => {
      unavailableDates.forEach(date => {
      newDisabledDates.push(new Date(date));
     });
     setDisabledDates(newDisabledDates);
   },[unavailableDates]);

   const handleSelectedDate = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
   }

  return (
    <>
    <DatePicker
    onChange={handleSelectedDate}
    selected={selectedDate}
    excludeDates={disabledDates}
    {...rest}
  />
  </>
  )
}
