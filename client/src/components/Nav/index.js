// NAVBAR

import React from 'react';
import Auth from '../../utils/auth';
import { Link } from "react-router-dom";
import icon from '../../assets/icon.png'

function Nav() {

    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/orderHistory">
                            Order History
                        </Link>
                    </li>
                    <li className="mx-1">
                        <a href="/" onClick={() => Auth.logout()}>
                            Logout
                        </a>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="flex-row">
                    <li className="mx-1">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="mx-1">
                        <Link to="/login">
                            Login
                        </Link>
                    </li>
                </ul>
            );
        }
    }

    return (
        <header className="flex-row px-1">
            <h1>
                <Link to="/">
                    <img src={icon} id="icon"></img>
                    2020-2021 WebDev Gifts
                </Link>
            </h1>

            <nav>
                {showNavigation()}
            </nav>
        </header>
    );
}


export default Nav;