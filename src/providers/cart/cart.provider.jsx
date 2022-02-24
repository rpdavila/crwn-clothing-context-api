import React, { createContext, useState, useEffect } from 'react'; 

import { 
    addItemToCart, 
    removeItemFromCart, 
    filterItemFromCart,
    getCartItemsCount,
    getCartTotal
} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {}, //empty function whenever we need to use a function
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemFromCart: () => {},
    cartItemsCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const toggleHidden = () => setHidden(!hidden);
    const clearItemFromCart = item => setCartItems(filterItemFromCart(cartItems, item));

    useEffect(() => {
        setCartItemsCount(getCartItemsCount(cartItems));
        setCartTotal(getCartTotal(cartItems))
    }, [cartItems])

    return (
        <CartContext.Provider
            value={{
                hidden,
                toggleHidden,
                cartItems,
                cartItemsCount,
                addItem,
                removeItem,
                clearItemFromCart,
                cartTotal
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;