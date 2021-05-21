// CART ITEM

import React from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import { isTypeExtensionNode } from 'graphql';

const CartItem = ({ item }) => {
    const [, dispatch] = useStoreContext();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        // remove item from indexedDB
        idbPromise('cart', 'delete', { ...item });
    }

    const onChange = (e) => {
        const value = e.target.value;

        // if number set to zero, remove item from cart
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            idbPromise('cart', 'delete', { ...item });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });
        }
    };

    return (
        <div className="flex-row" >
            <div>
                <img src={`/images/${item.image}`} alt={item.name} id="cartImage" />
            </div>
            <div>
                
                <div>{item.name} </div>
                <div>${item.price}</div>
                {
                    item.name == "WebDev 2020-2021 Tank" || item.name =="WebDev 2020-2021 Tshirt" ?
                    (
                <div>Size: {item.size}</div>
                    ) : null
                }
                <div>
                    <span>Quantity: </span>
                    <input
                        type="number"
                        placeholder="1"
                        value={item.purchaseQuantity}
                        onChange={onChange} />
                    <span
                        onClick={() => removeFromCart(item)}
                        role="img"
                        aria-label="trash"
                        id="trashCan">
                        🗑️
                </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;