import React, { useEffect } from 'react';
import { Link } from "react-router-dom";

import { QUERY_CATEGORIES } from '../../utils/queries';
import { TOGGLE_NAV, UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
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
    
   
    // window.onscroll = function(){
    //     scrollFn()
    // }
    // function scrollFn() {
    //     if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 75) {
    //         document.getElementById("navBar").setAttribute("class", "endState")
    //         document.getElementById("navBarItems").setAttribute("class", "displaynone")
    //         document.getElementById("navTitle").setAttribute("class", "displayhidden")
    //         document.getElementById("navGreeting").setAttribute("class", "displayhidden")
    //     }else {
    //         document.getElementById("navBar").setAttribute("class", "initialState")
    //         document.getElementById("navBarItems").setAttribute("class", "flex-row-right")
    //         document.getElementById("navTitle").setAttribute("class", "flex-row-right")
    //         document.getElementById("navGreeting").setAttribute("class", "greeting")
    //     }
    // }
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
    const resetCat=()=>{
        dispatch({
            type:UPDATE_CURRENT_CATEGORY,
            currentCategory: null
        });
    };


function isNavOpen(){

        var test = document.getElementById("navBar");
if(test.classList.contains("endState")){
    console.log("open")
}
if(test.classList.contains("initialState")){
    console.log("closed")
}
}


// switch (test) {
//   case test.classList.contains("initialState"):
//     test.innerHTML = "I have class1";
//     console.log("IS")
//     break;
//   case test.classList.contains("endState"):
//     test.innerHTML = "I have class2";
//     console.log("ES")
//     break;
//   default:
//     test.innerHTML = "";
// }

    // } 

    // function toggleNav(){
    //     dispatch({type:TOGGLE_NAV});
    // }
    //  if(!state.openNav){
    //     // document.getElementById("navBar").setAttribute("onClick", "")
    //     document.getElementById("navBar").setAttribute("class", "endState")
    // }else{
        
    //     document.getElementById("navBar").setAttribute("class", "initialState")
    //     document.getElementById("navBar").setAttribute("onClick", "{toggleNav}")

    // }

    function openNav() {
        // document.getElementById("mySidenav").style.width = "250px";
        if(openNav)
        console.log("open")
        if(!openNav){
            console.log("closed")
        }
      }
      
      function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
      }


    function showNavigation() {
        if (Auth.loggedIn()) {
            return (
                <ul id="navBarItems" className=" flex-row-right">
                     {categories.map(item => (
                <button className="navButton" key={item._id}onClick={() => {handleClick(item._id);}}> {item.name}</button>))}
                    <li className="mx-1">
                        <Link className="navButton" to="/orderHistory">
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
    return (
        <header id="navHeader" className="navHeader">
            <h1 id="navTitle"className="flex-row-right">
                <Link to="/" 
                    onClick={() => {
                        resetCat();
                    }} className="flex-row-right">
                    <img src={icon} className="roundicon" alt="web dev logo"id="icon"></img>
                    <span className="title">2020-2021 WebDev Gifts</span>
                </Link>
                </h1>
            <div id="navBar" onClick={()=>{openNav()}} className="navBarChoices">
                {showNavigation()}
            </div>

            <p id="navGreeting" className="greeting">Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </header>
    );
}


export default Nav;