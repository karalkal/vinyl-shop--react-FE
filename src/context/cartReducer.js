const defaultCartState = { items: [], totalAmount: 0, }

export function initializer(initialValue = defaultCartState) {
    return JSON.parse(localStorage.getItem("localCart")) || initialValue;
}

// reducer - change state based on action.type

// Add item to cart, or if existing increment; calculate new total
export function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        let updatedItems = []
        let newItem = state.items.find(item => item.id === action.item.id);

        // IF FOUND: increment amountRequested of found item
        // NB - ERROR when incrementing in place itemAlreadyInCart.amountRequested += action.item.amountRequested, therefore create new obj instead...
        if (newItem !== undefined) {
            let foundIdx = state.items.indexOf(newItem)
            let updatedCartItem = {
                ...newItem,
                amountRequested: newItem.amountRequested + 1
            }
            // ... and create new array from old one with non-destructive splicing, i.e. [...slice1, replace, ...slice2]
            updatedItems = [
                ...state.items.slice(0, foundIdx),
                updatedCartItem,
                ...state.items.slice(foundIdx + 1)]
        }

        // IF NOT, itemAlreadyInCart === undefined just unshift (in non-destructive manner) item to array, 
        // i.e. put first / top of list
        else {
            newItem = action.item;
            newItem.amountRequested = 1;
            updatedItems = [action.item, ...state.items]
        }

        const updatedTotalAmount = state.totalAmount + newItem.price
        // expect item to have price and amountRequested props
        // either way return new object with items and updated total
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    };

    if (action.type === 'REMOVE_ITEM_BY_ID') {          // Remove item with given altogether from cart
        const foundItem = state.items.find(item => item.id === action.id);
        if (!foundItem) return;      // just in case

        const updatedItems = state.items.filter(thingie => thingie.id !== foundItem.id);
        const updatedTotalAmount = state.totalAmount - foundItem.price * foundItem.amountRequested;   // expect item to have price and amountRequested props
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    };
    // Decrement item in cart with given id by 1
    if (action.type === 'DECREMENT_ITEM_BY_ID') {
        let updatedItems = []

        const foundItem = state.items.find(item => item.id === action.id);
        if (!foundItem) return;      // just in case

        let foundIdx = state.items.indexOf(foundItem)

        if (foundItem.amountRequested === 1) {       // if only one remaining -1 must delete it altogether
            updatedItems = [
                ...state.items.slice(0, foundIdx),
                ...state.items.slice(foundIdx + 1)]
        }
        else {      // if not create copy of found obj by destructuring, overwrite amountRequested with value - 1            
            let updatedCartItem = {
                ...foundItem,
                amountRequested: foundItem.amountRequested - 1
            }
            // ... and create new array from old one with non-destructive splicing, i.e. [...slice1, replace, ...slice2]
            updatedItems = [
                ...state.items.slice(0, foundIdx),
                updatedCartItem,
                ...state.items.slice(foundIdx + 1)]
        }

        if (action.type === 'EMPTY_CART') {
            return defaultCartState
        };

        const updatedTotalAmount = state.totalAmount - foundItem.price

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }
    };

    return defaultCartState;
}
