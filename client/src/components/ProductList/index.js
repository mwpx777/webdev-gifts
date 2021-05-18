// PRODUCT LIST

import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';
import idbPromise from '../../utils/helpers';

function ProductList() {
    const [state, dispatch] = useStoreContext();
    const { currentCategory } = state;
    const { loading, data } = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products
            });

            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        } else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products
                });
            })
        }
    }, [data, loading, dispatch]);

    function filterProducts() {
        if (!currentCategory) {
            return state.products;
        }
        return state.products.filter(product => product.category._id === currentCategory);
    }

    return (
        <div className=" container" >
            {state.products.length ? (
                <div className="row" >
                    {filterProducts().map(product => (
                        <ProductItem
                            key={product._id}
                            _id={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            className="col-sm"
                            id="cards"
                        />
                    ))}
                </div>
            ) : (
                <h3> Your cart is empty!</h3>
            )}
            {loading ?
                <img src={spinner} alt="loading" /> : null}
        </div>
    );
}

export default ProductList;