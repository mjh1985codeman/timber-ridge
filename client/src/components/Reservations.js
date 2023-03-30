import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from "react-router-dom";
import { Container } from 'react-bootstrap';

export default function Reservations() {
    const history = useHistory();
    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const beginDate = e.currentTarget[0].value;
        const endDate = e.currentTarget[1].value;
        const resObj = {
            beginDate: beginDate,
            endDate: endDate,
        }
        console.log(resObj);
        history.push("/reservations/propselect")
      };
    
      return (
        <>
        <Container>
        <Form className='formstyle' onSubmit={handleSubmit}>
        <Form.Group className='formcontent'>
          <Form.Label className='formlabel'>
            <h2>Check In</h2>
            <input className='calinput'type="date" name="beginDate" key="beginDate"/>
          </Form.Label>
          <Form.Label className='formlabel'>
            <h2>Check Out</h2>
            <input className='calinput' type="date" name="endDate" key="endDate"/>
          </Form.Label>
          <Button type="submit">Submit form</Button>
        </Form.Group>
        </Form> 
        </Container>
        </>
      );
    }
    