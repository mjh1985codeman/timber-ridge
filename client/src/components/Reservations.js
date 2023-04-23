import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
const {GET_RESERVATIONS, GET_CUSTOMER_BY_ID} = require('../controllers/queries');

export default function Reservations() {
    const [resBd, setResBd] = useState("");
    const [resEd, setResEd] = useState("");
    const [resFn, setResFn] = useState("");
    const [resLn, setResLn] = useState("");

    // function sendSMS() {
    //   // Download the helper library from https://www.twilio.com/docs/node/install
    //   // Set environment variables for your credentials
    //   // Read more at http://twil.io/secure
    //   const accountSid = "ACacbdc9d037d6afdeba610aa74b2ae090";
    //   const authToken = "349607e7b57393ef698352f8ba48bc49";
    //   const client = require("twilio")(accountSid, authToken);
    //   client.messages
    //   .create({ body: "Hello from Twilio", from: "+18556574023", to: "+16154060113" })
    //   .then(message => console.log(message.sid));
    // }

    function handleInputChange(e) {
        e.preventDefault();
        
        const {name, value} = e.target;

        if(name === 'beginDate') {
            return setResBd(value);
        } else if (name === 'endDate') {
            return setResEd(value);
        } else if (name === 'fn') {
            return setResFn(value);
        } else if (name === 'ln') {
            return setResLn(value)
        };
    }

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();
        const resObj = {
            beginDate: resBd,
            endDate: resEd,
            firstName: resFn,
            lastName: resLn
        };
        console.log('resObj: ' , resObj);
        // sendSMS();
      };

    function GetCustomer({id}) {
      const {loading, error, data} = useQuery(GET_CUSTOMER_BY_ID, {
        variables: {id},
      });
      
      if(loading) return null;
      if (error) return `Error!!! ${error}`;
      
      console.log("data" , data);
    };
    
    GetCustomer({id: '6420e414c5b6c8d3054a552f'});

    function GetReservations() {
      const { loading, error, data } = useQuery(GET_RESERVATIONS);
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;
      if(data) {
        const resArray = data.getReservations;
        resArray.forEach(res => {
          console.log(res);
        })
      } else {
        return 'loading. . .' + loading;
      }
    }
    
    
    GetReservations();
    

      return (
        <>
        <Container>
        <Form className='formstyle' onSubmit={handleSubmit}>
        <Form.Group className='formcontent'>
          <Form.Label className='formlabel'>
            <h2>Check In</h2>
            <input className='calinput'type="date" name="beginDate" value={resBd} onChange={handleInputChange}/>
          </Form.Label>
          <Form.Label className='formlabel'>
            <h2>Check Out</h2>
            <input className='calinput' type="date" name="endDate" value={resEd} onChange={handleInputChange}/>
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
    