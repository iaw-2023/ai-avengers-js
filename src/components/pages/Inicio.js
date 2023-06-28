import React from 'react'
import { useEffect, useState, useReducer } from 'react';
import { shoppingReducer, shoppingInitialState } from '../shoppingReducer'
import { peticionVehiculos, peticionMarcas } from '../apiAux'

const Inicio = () => {
  
  const [vehiculos, setVehiculos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const {products, cart} = state;
  const addToCart = (id) => {}
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
        <div className="card text-bg-primary mb-3" style={{ maxWidth: '18rem' }}>
          <img src="{{asset('/auto.jpg')}}" class="card-img-top"></img>
          <div class="card-body">
            <h4>{vehiculo.modelo}</h4>
            <p>{'Marca:'+marcas.find((marca) => marca.id === vehiculo.id_marca).marca}</p>
            <p>{'Precio:'+vehiculo.precio+'$'}</p>
            <button class="btn btn-primary" onClick={() => addToCart(vehiculo.id)}>Agregar al carrito</button>
          </div>
        </div>
      ))}
    </article>
  );
}

export default Inicio