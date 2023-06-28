import React from "react";
import { useEffect, useState, useReducer } from "react";
import { shoppingReducer, shoppingInitialState } from "../shoppingReducer";
import { peticionVehiculos, peticionMarcas } from "../apiAux";
import DreamCar_ico from "../../images/DreamCar_ico.png";

const Inicio = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [todosLosVehiculos, setTodosLosVehiculos] = useState([]);

  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart } = state;

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
  const delFromCart = () => {};
  const clearCart = () => {};

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
              <img src={DreamCar_ico} className="card-img-top"></img>
              <div className="card-body">
                <h4>{vehiculo.modelo}</h4>
                <p>
                  {"Marca:" +
                    marcas.find((marca) => marca.id === vehiculo.id_marca)
                      .marca}
                </p>
                <p>{"Precio:" + vehiculo.precio + "$"}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(vehiculo)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default Inicio;
