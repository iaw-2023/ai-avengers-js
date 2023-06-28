import React from "react";
import { useEffect, useState, useReducer } from "react";
import { shoppingReducer, shoppingInitialState } from "../shoppingReducer";
import { peticionVehiculos, peticionMarcas } from "../apiAux";
import ProductItem from "../ProductItem";
const Inicio = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [todosLosVehiculos, setTodosLosVehiculos] = useState([]);

  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchText(value);
    const marcaObj = marcas.filter((marcaObjeto)=> marcaObjeto.marca.toLowerCase().includes(value.toLowerCase() ))
    const marcasIds = marcaObj.map(elemento => elemento.id);
    const filteredVehiculos = todosLosVehiculos.filter((vehiculo) => {
     return  marcasIds.includes(vehiculo.id_marca)
    });
    if(filteredVehiculos.length > 0) {
      setVehiculos(filteredVehiculos);
    }
  };

  const addToCart = (vehiculo) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: vehiculo,
    });
  };


  useEffect(() => {
    const fetchData = async () => {
      const vehiculosData = await peticionVehiculos();
      const marcasData = await peticionMarcas();
      setTodosLosVehiculos(vehiculosData);
      setVehiculos(vehiculosData);
      setMarcas(marcasData);
    };

    if (vehiculos.length === 0) {
      fetchData();
    }
  }, [vehiculos, marcas]);

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Filtrar por marca"
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <article className="box grid-responsive">
        <div className="card-container">
          {vehiculos.map((vehiculo) => (
            <div
              className="card text-bg-primary mb-3"
              style={{ maxWidth: "18rem" }}
              key={vehiculo.id}
            >
                <ProductItem
                vehiculo={vehiculo}
                marcas={marcas}
                onClickFuncion={addToCart}
                botonMensaje="Agregar al carrito"
              />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Inicio;
