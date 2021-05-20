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
                <ul className=" flex-row-right">
                     {categories.map(item => (
                <button className="navButton" key={item._id}onClick={() => {handleClick(item._id);}}> {item.name}</button>))}
                    <li className="mx-1">
                        <Link to="/orderHistory">
                        <button className="navButton">   Order History</button>
                        </Link>
                    </li>
                    <li className="mx-1">
                        <button className="navButton" href="/" onClick={() => Auth.logout()}>
                            Logout
                        </button>
                    </li>
                   
                </ul>
            );
        } else {
            return (
                <ul className=" flex-row-right">
                     {categories.map(item => (
                <button className="navButton" 
                    key={item._id}
                    onClick={() => {
                        handleClick(item._id);
                    }}> {item.name}</button>
            ))}
                    <button className="mx-1 navButton">
                        <Link to="/signup">
                            Signup
                        </Link>
                    </button>
                    <button className="mx-1 navButton">
                        <Link to="/login">
                            Login
                        </Link>
                    </button>
                   
                </ul>
            );
        }
    }

    return (
        <header className="navHeader">
            <h1 className="flex-row-right">
                <Link to="/" className="flex-row-right">
                    <img src={icon} className="roundicon" id="icon"></img>
                    <span className="title">2020-2021 WebDev Gifts</span>
                </Link>
                </h1>
            <div id="navBar" className="navBarChoices">
                {showNavigation()}
            </div>

            <p className="greeting">Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
           

            
        </header>
    );
}


export default Nav;