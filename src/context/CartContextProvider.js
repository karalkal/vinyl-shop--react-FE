import { createContext, useEffect, useReducer, useState } from "react";
import { cartReducer, initializer } from "./cartReducer";

// credit to Drew Reese:
// https://stackoverflow.com/questions/64547044/persist-localstorage-with-usereducer

const CartContext = createContext({});

/*
Parameters
    reducer: The reducer function that specifies how the state gets updated. 
It must be pure, should take the state and action as arguments, and should return the next state. 
State and action can be of any types.
    initialArg: The value from which the initial state is calculated. It can be a value of any type. 
How the initial state is calculated from it depends on the next init argument.
    optional init: The initializer function that should return the initial state. 
If it’s not specified, the initial state is set to initialArg. Otherwise, the initial state is set to the result of calling init(initialArg).
*/

// Meaning that IMO the below is same as 
// const [cartState, dispatchCartAction] = useReducer(cartReducer, {}, initializer)
export function CartContextProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        initializer());

    const [cartModalVisible, setCartModalVisible] = useState(false);

    // Cart updated, persisting to local storage
    useEffect(() => {
        // console.log("Cart updated, persisting to local storage", cartState);
        localStorage.setItem("localCart", JSON.stringify(cartState));
    }, [cartState]);


    // ctx functions
    function addItemToCartHandler(item) {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        })
    };

    function removeItemFromCartHandler(id) {
        dispatchCartAction({
            type: 'REMOVE_ITEM_BY_ID',
            id: id
        })
    };

    function decrementItemInCartHandler(id) {
        dispatchCartAction({
            type: 'DECREMENT_ITEM_BY_ID',
            id: id
        })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        decrementItem: decrementItemInCartHandler,
        cartModalVisible: cartModalVisible,
        setCartModalVisible: setCartModalVisible
    }


    return (
        <CartContext.Provider
            value={cartContext}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext

