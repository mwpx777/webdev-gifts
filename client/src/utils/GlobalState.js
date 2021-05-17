// GLOBAL STATE

import React, {createContext, useContext} from 'react';
import {useProductReducer} from './reducers';

// create new Context object
const StoreContext = createContext();
const {Provider} = StoreContext;

const StoreProvider = ({value= [], ...props}) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: ''
    });
    return <Provider value = {[state, dispatch]} {...props} />
};

// when this function runs within a component, will receive [state, dispatch] date the StoreProvier manages
const useStoreContext = () => {
    return useContext(StoreContext);
};

export {StoreProvider, useStoreContext};