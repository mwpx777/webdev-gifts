// LOGIN

import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';


function Login(props) {
    const [formState, setFormState] = useState({ emai: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState, [name]: value
        });
    };

    return (
        <>
            {/* <Link to="/signup">
                ← Go to Signup
            </Link> */}
            <div className="container my-1" id="signCard">
                <div className="card-header">
                    <h2> Login</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleFormSubmit}>
                        <div className="row my-2" id="signup-form">
                            <label htmlFor="email">Email address:</label>
                            <input
                                // placeholder="name@email.com"
                                className="input"
                                name="email"
                                type="email"
                                id="email"
                                onChange={handleChange} />
                        </div>
                        <div className="row my-2" id="signup-form">
                            <label htmlFor="pwd">Password: </label>
                            <input
                                // placeholder="********"
                                className="input"
                                name="password"
                                type="password"
                                id="password"
                                onChange={handleChange} />
                        </div>
                        {
                            error ?
                                <div>
                                    <p className="error-text">The provided credentials are incorrect</p>
                                </div> : null
                        }
                        <div className="flex-row flex-end">
                            <button type="submit" id="submitBtn">
                                Submit
                    </button>
                        </div>
                        <div>

                        </div>
                    </form>
                </div>
            </div>
   
        </>
    );
};

export default Login;