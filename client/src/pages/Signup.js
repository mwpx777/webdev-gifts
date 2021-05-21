// SIGNUP

import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from '@apollo/react-hooks';
import Auth from '../utils/auth';
import {ADD_USER} from '../utils/mutations';

function Signup(props) {
    const [formState, setFormState] = useState({email: '', password: ''});
    const [addUser] = useMutation(ADD_USER);

    const handleFormSubmit = async event => {
        event.preventDefault();
        const mutationResponse = await addUser({
            variables: {
                email: formState.email, password: formState.password,
                firstName: formState.firstName, lastName: formState.lastName
            }
        });
        const token= mutationResponse.data.addUser.token;
        Auth.login(token);
    };

    const handleChange = event => {
        const {name, value} = event.target;
        setFormState({
            ...formState, [name]: value
        });
    };

    return (
        <>
            {/* <Link to='/login'>
            ← Go to Login
            </Link> */}
        <div className="container my-1"id="signCard">
           
            <div className="card-header">
            <h2>Signup</h2>
            </div>
            <div className="card-body">
            <form onSubmit={handleFormSubmit}>
                <div className="row  my-2" id="signup-form">
                    <label htmlFor="firstName">First Name: </label>
                    <input
                    // placeholder="First"
                    className="input"
                    name="firstName"
                    type="firstName"
                    id="firstName"
                    onChange={handleChange} />
                </div>
                <div className="row my-2" id="signup-form">
                    <label htmlFor="lastName">Last Name: </label>
                    <input
                    // placeholder="Last"
                    className="input"
                    name="lastName"
                    type="lastName"
                    id="lastName"
                    onChange={handleChange} />
                </div>
                <div className="row  my-2" id="signup-form">
                    <label htmlFor="email">Email: </label>
                    <input
                    // placeholder="name@email.com"
                    className="input"
                    name="email"
                    type="email"
                    id="email"
                    onChange={handleChange} />
                </div>
                <div className="row  my-2" id="signup-form">
                    <label htmlFor="firstName">Password: </label>
                    <input
                    // placeholder="********"
                    className="input"
                    name="password"
                    type="password"
                    id="pwd"
                    onChange={handleChange} />
                </div>
                <div className="row flex-end">
                    <button type="submit" id="submitBtn">
                        Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
        </>
        );
};

export default Signup;