import React from 'react'
import { useEffect, useState, useReducer } from 'react';
import { shoppingReducer, shoppingInitialState } from '../shoppingReducer'
import { peticionVehiculos, peticionMarcas } from '../apiAux'
import DreamCar_ico from '../../images/DreamCar_ico.png'

const Inicio = () => {
  
  const [vehiculos, setVehiculos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const {products, cart} = state;
  const addToCart = (vehiculo) => 
  {
    dispatch({
      type: 'ADD_TO_CART',
      payload: vehiculo
    });
  }
  const delFromCart = () => {}
  const clearCart = () => {}

  useEffect(() => {
    const fetchData = async () => {
      const vehiculosData = await peticionVehiculos();
      const marcasData = await peticionMarcas();
      setVehiculos(vehiculosData);
      setMarcas(marcasData);
    };

    fetchData();
  }, []);

  return (
    <article className='box grid-responsive'>
        {vehiculos.map((vehiculo) => (
            <div className="card text-bg-primary mb-3" style={{ maxWidth: '18rem' }} key={vehiculo.id}>
              <img src={DreamCar_ico} className="card-img-top"></img>
              <div className="card-body">
                <h4>{vehiculo.modelo}</h4>
                <p>{'Marca:'+marcas.find((marca) => marca.id === vehiculo.id_marca).marca}</p>
                <p>{'Precio:'+vehiculo.precio+'$'}</p>
                <button className="btn btn-primary" onClick={() => addToCart(vehiculo)}>Agregar al carrito</button>
              </div>
            </div>
      ))}
    </article>
  );
}

export default Inicio