import React from 'react'

const ProductItem = ({product, deleteFromCart}) => {
  let {id, name, price} = product

  console.log(`Showing: ${product}`);

  return (
    <div className='card'>
        <h4>{name}</h4>
        <h5>{price}</h5>
        <button onClick={()=> deleteFromCart(product)}>Delete</button>
    </div>
  )
}

export default ProductItem