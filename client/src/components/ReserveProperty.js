import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import {useParams, useNavigate } from 'react-router-dom';
//const {GET_RESERVATIONS, GET_CUSTOMER_BY_ID} = require('../controllers/queries');

export default function ReserveProperty() {
    const [resBd, setResBd] = useState("");
    const [resEd, setResEd] = useState("");
    const [resFn, setResFn] = useState("");
    const [resLn, setResLn] = useState("");

    let { propertyId } = useParams();

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
        alert(`${resObj.firstName} ${resObj.lastName} submitted reservation request for property ${propertyId}`);
      };

    // function GetCustomer({id}) {
    //   const {loading, error, data} = useQuery(GET_CUSTOMER_BY_ID, {
    //     variables: {id},
    //   });
      
    //   if(loading) return null;
    //   if (error) return `Error!!! ${error}`;
      
    //   console.log("data" , data);
    // };
    
    // GetCustomer({id: '6420e414c5b6c8d3054a552f'});

    // function GetReservations() {
    //   const { loading, error, data } = useQuery(GET_RESERVATIONS);
    //   if (loading) return 'Loading...';
    //   if (error) return `Error! ${error.message}`;
    //   if(data) {
    //     const resArray = data.getReservations;
    //     resArray.forEach(res => {
    //       console.log(res);
    //     })
    //   } 
    // }
    
    
    // GetReservations();
    

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
    