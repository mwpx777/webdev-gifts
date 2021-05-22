// CART

import React, { useEffect } from 'react';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import './styles.css';
// useLazyQuery will only run when calles upon
import { useLazyQuery } from '@apollo/react-hooks'
// was trying to change the cart image below
// import cartimg from '../../assets/fastcart.png'
// this will establish a state variable
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { loadStripe } from '@stripe/stripe-js';

// this will perform the checkout redirect
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');


const Cart = () => {

    const [state, dispatch] = useStoreContext();
    // console.log(state);

    // data will contain the checkout session
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session })
            })
        }
    }, [data])

    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({
                type: ADD_MULTIPLE_TO_CART,
                products: [...cart]
            });
        };
        // if nothing in state for the cart, run getCart function to get cart items from objectStore and save to globalState object
        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);


    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    if (!state.cartOpen) {
        return (
            <div className="cart-closed" onClick={toggleCart}>
                <span
                    role="img"
                    aria-label="trash">🛒</span>
            </div>
        );
    };

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }

    function submitCheckout() {
        const productIds = [];
        // loop over items in state.cart and add their item._id to productIds array
        state.cart.forEach(item => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);

            }
        });
        getCheckout({
            // the productIds get passed into {data} for const getCheckout method above
            variables: { products: productIds }
        })
    }



    return (
        <div className="cart" id="cart">
            <div className="close" id="cartClose" onClick={toggleCart}>X</div>
            <h2><b>Shopping Cart</b></h2>
            {state.cart.length ? (
                <div>
                    {state.cart.map(item => (
                        <CartItem key={item._id} item={item} />
                    ))}
                    <div className="flex-row space-between">
                        <strong>Total: ${calculateTotal()}</strong>
                        {
                            Auth.loggedIn() ?
                                <button onClick={submitCheckout}>
                                    Checkout
                  </button>
                                :
                                <span>(log in to check out)</span>
                        }
                    </div>
                </div>
            ) : (
                <h3>

                    Your cart is empty! Go add some stuff!
                </h3>
            )}
        </div>
    )
};

export default Cart;
