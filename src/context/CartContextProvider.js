import { createContext, useEffect, useReducer, useState } from "react";
import { cartReducer, initializer } from "./cartReducer";


const CartContext = createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (itemId) => { },
});


export function CartContextProvider(props) {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        {
            items: [],
            totalAmount: 0
        },
        initializer);

    const [cartModalVisible, setCartModalVisible] = useState(false);

    // Cart updated, persisting to local storage
    useEffect(() => {
        console.log("Cart updated, persisting to local storage", cartState);
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


    // whole context but also modal props separately to make it consistent with other modals
    return (
        <CartContext.Provider
            value={cartContext}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext

