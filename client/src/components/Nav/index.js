import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { QUERY_CATEGORIES } from '../../utils/queries';
import {  UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState';
// NAVBAR

import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';
import icon from '../../assets/WebDev logo.png'


//Scroll Feature
function Nav({ setCategory }) {
    const [state, dispatch] = useStoreContext();
    const { categories } = state;
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
    
   // ON Scroll feature for Nav Bar
    window.onscroll = function(){
        scrollFn()
    }
    function scrollFn() {
        if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 75) {
            document.getElementById("navBar").setAttribute("class", "endState")
            document.getElementById("navBarItems").setAttribute("class", "displaynone")
            document.getElementById("navTitle").setAttribute("class", "displayhidden")
            document.getElementById("navGreeting").setAttribute("class", "displayhidden")
        }else {
            document.getElementById("navBar").setAttribute("class", "initialState")
            document.getElementById("navBarItems").setAttribute("class", "flex-row-right")
            document.getElementById("navTitle").setAttribute("class", "flex-row-right")
            // document.getElementById("navGreeting").setAttribute("class", "greeting")
        }
    }
    //  Use Effect for Categories Filter to Display on Nav 
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
    
    //Updates Filters on Products Displayed
    const handleClick = id => {
        dispatch({
            type: UPDATE_CURRENT_CATEGORY,
            currentCategory: id
        });
    };

    //Resets all the Filters after its Click on
    const resetCat=()=>{
        dispatch({
            type:UPDATE_CURRENT_CATEGORY,
            currentCategory: null
        });
    };

    //Opens Nav If its in the closed postion ONLY!
    function isNavOpen(){
        var test = document.getElementById("navBar")

        if(test.classList.contains("endState")){
            console.log("closed")
            document.getElementById("navBar").setAttribute("class", "initialState2")
            document.getElementById("navBarItems").setAttribute("class", "flex-row-right2")
        }
    }

    //  Generates the NavBar LoggedIn Items Or not if not LoggedIN
    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <div id="navBarItems" className=" flex-row-right">
                     {categories.map(item => (
                <button className="navButton" key={item._id}onClick={() => {handleClick(item._id);}}> {item.name}</button>))}
                   
                        <Link className="navButton" to="/orderHistory">
                        <button className="navButton">   Order History</button>
                        </Link>
                        <button className="navButton" href="/" onClick={() => Auth.logout()}>
                            Logout
                        </button>
                </div>
            );
        } else {
            //Else If not LoggedIn then...
            return (
                <ul id="navBarItems" className=" flex-row-right">
                     {categories.map(item => (
                <button className="navButton" 
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}> {item.name}</button>
            ))}
                    <button className="mx-1 navButton">
                        <Link className="navButton"to="/signup">
                            Signup
                        </Link>
                    </button>
                    <button className="mx-1 navButton">
                        <Link className="navButton" to="/login">
                            Login
                        </Link>
                    </button>
                   
                </ul>
            );
        }
    }
    // Main Body Returned
    return (
        <header id="navHeader" className="navHeader">
            {/* Title Bar and Logo */}
            <h1 id="navTitle"className="flex-row-right">
                <Link to="/" 
                    onClick={() => {
                        resetCat();
                    }} className="flex-row-right">
                    <img src={icon} className="roundicon" alt="web dev logo"id="icon"></img>
                    <span className="title">2020-2021 WebDev Gifts</span>
                </Link>
            </h1>
            {/* End OF Title Bar */}
            {/* Nav Bar Items and If/Else Code from Above */}
            <div id="navBar" onClick={()=>{isNavOpen()}} className="navBarChoices">
                {showNavigation()}
            </div>
            {/* Greeting Below */}
        <div id="holder">
            <p id="navGreeting" className="greeting">Congrats you did IT! It was a crazy 6 Months but you are a full stack Developer.
            <br></br> Now get yourself some new gear to sport your accomplishments.</p>
        </div>
        </header>
    );
}


export default Nav;