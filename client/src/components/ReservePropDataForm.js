import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePickerComp from './DatePickerComp';
import { Container } from 'react-bootstrap';

export default function ReservePropDataForm({propertyId, currentReservations}) {
    const [resBd, setResBd] = useState("");
    const [resEd, setResEd] = useState("");
    const [resFn, setResFn] = useState("");
    const [resLn, setResLn] = useState("");
    const [unavailable, setUnavailable] = useState(null);

    useEffect(() => {
      const unavailableDates = [];
        currentReservations.forEach(range => {
        let currentDate = new Date(range.beginDate);
        while(currentDate <= new Date(range.endDate)) {
          unavailableDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        });
        setUnavailable(unavailableDates);
    },[currentReservations]); 
    
  // Get the disabled dates: 
  const disabledDates = unavailable ? unavailable.map(date => date.toISOString().slice(0, 10)) : [];
  
  if (disabledDates.includes(resBd) || disabledDates.includes(resEd)) {
    console.log('user picked a disabled date');
  };

    function handleInputChange(e) {
        e.preventDefault();
        
        const {name, value} = e.target;

        if (name === 'fn') {
            return setResFn(value);
        } else if (name === 'ln') {
            return setResLn(value)
        };
    }

    const handleCheckInDateSelect = (date) => {
      const dateObject = new Date(date);
      const formattedDate = dateObject.toISOString().slice(0, 10);
      setResBd(formattedDate);
    };

    const handleCheckOutDateSelect = (date) => {
      const dateObject = new Date(date);
      const formattedDate = dateObject.toISOString().slice(0, 10);
      setResEd(formattedDate);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const resObj = {
            beginDate: resBd,
            endDate: resEd,
            firstName: resFn,
            lastName: resLn
        };
        console.log('resObj: ' , resObj);
        alert(`${resObj.firstName} ${resObj.lastName} submitted reservation request for property ${propertyId}`);
      };

      return (
        <>
        <Container>
        <Form className='formstyle' onSubmit={handleSubmit}>
        <Form.Group className='formcontent'>
        <Form.Label className='formlabel'>
              <h2>Check In</h2>
              <DatePickerComp name="bd" onDateSelect={handleCheckInDateSelect} unavailableDates={disabledDates}/>
            </Form.Label>
            <Form.Label className='formlabel'>
              <h2>Check Out</h2>
              <DatePickerComp name="ed" onDateSelect={handleCheckOutDateSelect} unavailableDates={disabledDates}/>
            </Form.Label>
            <Form.Label>
                <h3>First Name</h3>
                <input className='calinput' name="fn" value={resFn} onChange={handleInputChange}/>
            </Form.Label>
            <Form.Label>
                <h3>Last Name</h3>
                <input className='calinput' name="ln" value={resLn} onChange={handleInputChange}/>
            </Form.Label>
          <Button type="submit">Submit form</Button>
        </Form.Group>
        </Form> 
        </Container>
        </>
      );
    }