import { useState } from "react";
import { TYPES } from "./actions/shoppingActions";

export let shoppingInitialState = {
    products: []
};

export function shoppingReducer(state, action){
    switch(action.type){
        case TYPES.ADD_TO_CART: {
            shoppingInitialState = {
                ...shoppingInitialState,
              products: [...state.products, action.payload]
            }
            return shoppingInitialState;
        }
        case TYPES.REMOVE_FROM_CART: {
            shoppingInitialState = {
                ...shoppingInitialState,
                products: state.products.filter(product => product.id !== action.payload)
            }
            return shoppingInitialState;
        }
        case TYPES.CLEAR_CART: {
            shoppingInitialState = {
                ...shoppingInitialState,
                products: []
            }
            return shoppingInitialState;
        }
        default:
            return state;
    }
}