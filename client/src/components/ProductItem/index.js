// PRODUCT ITEM

import React from 'react';
import { Link } from 'react-router-dom';
// import { pluralize } from '../../utils/helpers';
import { useStoreContext } from '../../utils/GlobalState';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function ProductItem(item) {
    const {
        image,
        name,
        _id,
        price,
    } = item;

    const [state, dispatch] = useStoreContext();
    const { cart } = state;

    const addToCart = () => {
        const itemInCart = cart.find((cartItem) => cartItem._id === _id)
        if (itemInCart) {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: _id,
                purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
            idbPromise('cart', 'put', {
                ...itemInCart, purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
            });
        } else {
            dispatch({
                type: ADD_TO_CART,
                product: { ...item, purchaseQuantity: 1 }
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
        }
    }

    return (
        <div className="card px-1 py-1 col-md-3" >
            <Link to={`/products/${_id}`}>
                <img src={`/images/${image}`} alt={name} id="cardImage" />
            </Link>
            <div className="cardContainer">
                <div className="cardTitle">
                    <h4><b>{name} ${price}</b></h4>
                    <span></span>
                    <button  className="hvr-bounce-in" onClick={addToCart}>Add to cart!</button>
                </div>
            </div>
        </div>



    );
};

export default ProductItem;