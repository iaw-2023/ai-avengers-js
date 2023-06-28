import React, { useReducer } from 'react'
import { shoppingInitialState, shoppingReducer } from './shoppingReducer'
import ProductItem from './ProductItem'

const Shoppingcart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const {products, cart} = state;
  const addToCart = () => {}
  const delFromCart = () => {}
  const clearCart = () => {}

  return (
    <div>
        <h2>Carrito de compras</h2>
        <article className='box grid-responsive'>
            {products.map((product)=><ProductItem key={product.id} data={product} addToCart={addToCart}/>)}
        </article>
    </div>
  )
}

export default Shoppingcart