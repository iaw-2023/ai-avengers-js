import { TYPES } from "./actions/shoppingActions";

export let shoppingInitialState = JSON.parse(localStorage.getItem("shoppingInitialState")) ?? {
    products: []
};

export function shoppingReducer(state, action){
    switch(action.type){
        case TYPES.ADD_TO_CART: {
            shoppingInitialState = {
                ...shoppingInitialState,
              products: [...state.products, action.payload]
            }
            localStorage.setItem("shoppingInitialState", JSON.stringify(shoppingInitialState));
            return shoppingInitialState;
        }
        case TYPES.REMOVE_FROM_CART: {
            shoppingInitialState = {
                ...shoppingInitialState,
                products: state.products.filter(product => product !== action.payload)
            }
            localStorage.setItem("shoppingInitialState", JSON.stringify(shoppingInitialState));            
            return shoppingInitialState;
        }
        case TYPES.CLEAR_CART: {
            shoppingInitialState = {
                ...shoppingInitialState,
                products: []
            }
            localStorage.setItem("shoppingInitialState", JSON.stringify(shoppingInitialState));            
            return shoppingInitialState;
        }
        default:
            return state;
    }
}