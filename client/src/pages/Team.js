import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import Loading from '../components/Loading';
import { ADD_USER } from '../controllers/mutations';
import Auth from '../helpers/auth';

export default function Team() {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("staff");
    const [userFirstName, setUserFirstName] = useState("");
    const [userLastName, setUserLastName] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [addUser, {loading, error, data}] = useMutation(ADD_USER);

    function handleInputChange(e) {
        e.preventDefault();
        
        const {name, value} = e.target;
  
        if(name === 'userRole') {
            return setUserRole(value);
        } else if (name === 'userFirstName') {
            return setUserFirstName(value);
        } else if (name === 'userLastName') {
            return setUserLastName(value);
        } else if (name === 'userPhone') {
            return setUserPhone(value)
        }
        else if (name === 'userEmail') {
            return setUserEmail(value)
        }
        else if (name === 'userPassword') {
            return setUserPassword(value)
        };
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // Prevent the browser from reloading the page
        //LOGIC TO ADD THE PROPERTY. 
        const userObj = {
          firstName: userFirstName,
          lastName: userLastName,
          phone: userPhone,
          email: userEmail,
          role: userRole,
          password: userPassword, 
        };
  
        //Mutation being called and the propObj being passed in as the variables. 
        await addUser({
          variables: {
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            phone: userObj.phone,
            email: userObj.email,
            role: userObj.role,
            password: userObj.password
          }
        }).then( async newUserData => {
            const newUser = newUserData.data;
            console.log('newUser: ' , newUser)
        });
        if(loading) return <Loading/>;
        if(error) return `User Add Error. . .${error.message}`;
      };

  if(Auth.isAdmin()) {
   return (
    <>
    <Container>
       <Form className='formstyle' onSubmit={handleSubmit}>
       <Form.Group className='formcontent'>
         <Form.Label className='formlabel'>
           <h3>Team Member First Name</h3>
           <input className='calinput'type="text" name="userFirstName" value={userFirstName} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>Team Member Last Name</h3>
             <input className='calinput' type="text" name="userLastName" value={userLastName} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>Team Member Phone Number</h3>
             <input className='calinput' type="text" name="userPhone" value={userPhone} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>Team Member Email</h3>
             <input className='calinput' type="text" name="userEmail" value={userEmail} onChange={handleInputChange}/>
         </Form.Label>
         <Form.Label className='formlabel'>
             <h3>Team Member Role</h3>
             <select className='calinput' type="text" name="userRole" value={userRole} onChange={handleInputChange}>
               <option value="staff">Staff</option>
               <option value="admin">Admin</option>
             </select>
         </Form.Label>
         <Form.Label className='formlabel'>
           <h3>Team Member Password</h3>
           <input className='calinput' type="password" name="userPassword" value={userPassword} onChange={handleInputChange}/>
         </Form.Label>
       <Button type="submit">Create New Team Member</Button>
     </Form.Group>
     </Form> 
     </Container>
  </>
   ) 
  } else {
    return (
        <div>You Have to be logged in as an Admin in order to manage a team.</div>
    )
  }
}
