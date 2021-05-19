// NAVBAR

import Auth from '../../utils/auth';
import { Link } from "react-router-dom";
import icon from '../../assets/icon.png'

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';
import { idbPromise } from '../../utils/helpers';

//Scroll Feature
function Nav({ setCategory }) {
    const [state, dispatch] = useStoreContext();
    const { categories } = state;
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    window.onscroll = function(){
        scrollFn()
    }
    function scrollFn() {
        if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 75) {
            document.getElementById("navBar").setAttribute("class", "endState")
        }else {
            document.getElementById("navBar").setAttribute("class", "initialState")
        }
    }
    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories
            });
            categoryData.categories.forEach(category => {
                idbPromise('categories', 'put', category);
            });
        } else if (!loading) {
            idbPromise('categories', 'get').then(categories => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories
                });
            });
        }
    }, [loading, categoryData, dispatch]);

    const handleClick = id => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        });
    };

    // function openNav() {
    //     document.getElementById("mySidenav").style.width = "250px";
    //   }
      
    //   function closeNav() {
    //     document.getElementById("mySidenav").style.width = "0";
    //   }


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
        <header className="flex-row px-1 navHeader">
            <h1>
                <Link to="/">
                    <img src={icon} id="icon"></img>
                    2020-2021 WebDev Gifts
                </Link>
            </h1>
            {/* <div id="mySidenav" className="sidenav"> */}
            {/* <div id="navBar" onclick={openNav()} className="navBarChoices"> */}
            <div id="navBar" className="navBarChoices">
                {showNavigation()}
                {/* {categories.map(item => (
                <button
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}> {item.name}</button>
            ))} */}
            </div>
            {/* </div> */}
            <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">&times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            </div>
        </header>
    );
}


export default Nav;