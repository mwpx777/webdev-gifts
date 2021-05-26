//  DETAIL

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from '../utils/queries';
import spinner from '../assets/spinner.gif'
import { useStoreContext } from '../utils/GlobalState';
import Cart from '../components/Cart';
import { idbPromise } from '../utils/helpers';

import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS
} from '../utils/actions';

function Detail() {
    const [state, dispatch] = useStoreContext();
    const { id } = useParams();
    const [currentProduct, setCurrentProduct] = useState({});
    const { loading, data } = useQuery(QUERY_PRODUCTS);
    const { products, cart } = state;
    const [value, setValue] = useState('');

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === id);

        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: id,

                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });

            idbPromise('cart', 'put', {
                ...itemInCart,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            })
        } else {
            dispatch({
                type: ADD_TO_CART,

                product: { ...currentProduct, purchaseQuantity: 1, size: value, }
            });
            idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
        };
    };

    const removeFromCart = () => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: currentProduct._id
        });
        idbPromise('cart', 'delete', { ...currentProduct });
    };
    useEffect(() => {
        // products already in globalStore
        if (products.length) {
            console.log((products.find(product => product._id === id)))
            setCurrentProduct(products.find(product => product._id === id));

            // retrieved from server
        } else if (data) {

            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
            });

            data.products.forEach(product => {
                idbPromise('products', 'put', product);
            });


            // get cache from idb
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products
                });
            });
        }
    }, [products, data, loading, dispatch, id]);


    const handleSelect = (e) => {
        console.log(e.target.value);

        setValue(e.target.value);


    }
    


    return (
        <>
            {currentProduct ? (
                <div className="container-fluid">
                    <Link to="/" id="backLink">
                        <span id="back"> ← Back to Products</span>
                </Link>
                <div className="detail-row">
                    <div className= "col-5 small-container">
                    <img src={`/images/${currentProduct.image}`} alt={currentProduct.name} id="detailImage" className="animate__animated animate__backInDown" width="100%"/>
                        
                    </div>
                    <div className= "col-5">
                        <h1 className= "animate__animated animate__lightSpeedInRight">{currentProduct.name}</h1>
                        <h3>Price: ${currentProduct.price}{" "}</h3>
                    <div className="row justify-content-start py-4">
                        
                    {
                        currentProduct._id == "60a6f97604860b499ce41857" || currentProduct._id == "60a6f97604860b499ce41856" ?
                            (
                                <div>
                                    <select className="form-select dropdown" aria-label="Default select example" onChange={handleSelect} id="dropdown">
                                        <option>Select Size</option>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>
                            ) : null
                    }
                    <div className="px-4">
                    <button className="hvr-pulse-grow" id="addToCartBtn" onClick={addToCart}>
                            Add To Cart
                        </button>
                        </div>
                        </div>
                        
                    <div>
                        <h3>Product Details:</h3>
                    <p>{currentProduct.description}</p>
                    </div>
                    </div>
                    </div>
                </div>

            ) : null}
            {
                loading ? <img src={spinner} alt="loading spinner" /> : null
            }
            <Cart />
        </>
    );
};

export default Detail;