import React, { useReducer, useState } from "react";


const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (itemId) => { },
});



// default cart state
const defaultCartState = { items: [], totalAmount: 0, }

// reducer - change state based on action.type
function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {       // Add item to cart, or if existing calculate new amount (works for incrementing in cart too)
        let updatedItems = []
        let itemAlreadyInCart = state.items.find(thingie => thingie.id === action.item.id)

        // IF FOUND: increment amount of found item
        // NB - ERROR when incrementing in place itemAlreadyInCart.amount += action.item.amount, therefore create new obj instead...
        if (itemAlreadyInCart !== undefined) {
            let foundIdx = state.items.indexOf(itemAlreadyInCart)
            let updatedCartItem = {
                ...itemAlreadyInCart,
                amount: itemAlreadyInCart.amount + action.item.amount
            }

            // ... and create new array from old one with non-destructive splicing, i.e. [...slice1, replace, ...slice2]
            updatedItems = [
                ...state.items.slice(0, foundIdx),
                updatedCartItem,
                ...state.items.slice(foundIdx + 1)]
        }
        else {              // IF NOT, itemAlreadyInCart === undefined just unshift (in non-destructive manner) item to array, i.e. put first / top of list
            updatedItems = [action.item, ...state.items]
        }

        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount   // expect item to have price and amount props
        // either way return new object with items and updated total
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    };

    if (action.type === 'REMOVE_ITEM_BY_ID') {          // Remove item with given altogether from cart
        const foundItem = state.items.find(thingie => thingie.id === action.id);
        if (!foundItem) return;      // just in case

        const updatedItems = state.items.filter(thingie => thingie.id !== foundItem.id);
        const updatedTotalAmount = state.totalAmount - foundItem.price * foundItem.amount;   // expect item to have price and amount props
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    };
    // Decrement item in cart with given id by 1
    if (action.type === 'DECREMENT_ITEM_BY_ID') {
        let updatedItems = []

        const foundItem = state.items.find(thingie => thingie.id === action.id);
        if (!foundItem) return;      // just in case

        let foundIdx = state.items.indexOf(foundItem)

        if (foundItem.amount === 1) {       // if only one remaining -1 must delete it altogether
            updatedItems = [
                ...state.items.slice(0, foundIdx),
                ...state.items.slice(foundIdx + 1)]
        }
        else {      // if not create copy of found obj by destructuring, overwrite amount with value - 1            
            let updatedCartItem = {
                ...foundItem,
                amount: foundItem.amount - 1
            }
            // ... and create new array from old one with non-destructive splicing, i.e. [...slice1, replace, ...slice2]
            updatedItems = [
                ...state.items.slice(0, foundIdx),
                updatedCartItem,
                ...state.items.slice(foundIdx + 1)]
        }

        const updatedTotalAmount = state.totalAmount - foundItem.price

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    };

    return defaultCartState;
}


export function CartContextProvider(props) {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const [cartModalVisible, setCartModalVisible] = useState(true);


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

