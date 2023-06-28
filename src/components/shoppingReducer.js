import { TYPES } from "./actions/shoppingActions";

export const shoppingInitialState = {
    products:[],
    cart:[]
};

export function shoppingReducer(state,action){
    switch(action.type){
        case TYPES.ADD_TO_CART: {

        }
        case TYPES.REMOVE_FROM_CART: {

        }
        case TYPES.CLEAR_CART: {

        }
        default:
            return state;
    }
}