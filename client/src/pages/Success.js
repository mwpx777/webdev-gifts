// SUCCESS

import React, { useEffect } from 'react';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations'
import { idbPromise } from '../utils/helpers';
import { useMutation } from '@apollo/react-hooks';

function Success() {
    const [addOrder] = useMutation(ADD_ORDER);

    useEffect(() => {
        async function saveOrder() {
            const cart = await idbPromise('cart', 'get');
            const products = cart.map(item => item._id);

            if (products.length) {
                const { data } = await addOrder({ variables: { products } });
                const productData = data.addOrder.products;

                // empty the cart on successful order
                productData.forEach((item) => {
                    idbPromise('cart', 'delete', item)
                });
            }

            // send to homepage after 3 seconds
            setTimeout(() => {
                window.location.assign('/');
            }, 5000);
        }
        saveOrder();
    }, [addOrder]);

    return (
        <div>
            <Jumbotron>
                <div className="successBackground">
                    <div className="container">
                        <div className="row">
                            <h1>Success!</h1>
                        </div>
                        <div className="row">
                            <h2>Thank you for your purchase!</h2>
                        </div>
                        <div className="row">
                            <h2>You will now be redirected to the home page</h2>
                        </div>
                    </div>
                </div>

            </Jumbotron>
        </div>
    );
};


export default Success;