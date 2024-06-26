import React, { useEffect, useState, useReducer } from "react";
import { shoppingReducer, shoppingInitialState } from "../shoppingReducer";
import { peticionVehiculos, peticionMarcas } from "../apiAux";
import ProductItem from "../ProductItem";
import ListItem from "../ListItem";
import Popup from "../Popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

const Inicio = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [todosLosVehiculos, setTodosLosVehiculos] = useState([]);
  const [, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState(null);
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false);


  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);
    const marcaObj = marcas.filter((marcaObjeto) =>
      marcaObjeto.marca.toLowerCase().includes(value.toLowerCase())
    );
    const marcasIds = marcaObj.map((elemento) => elemento.id);
    const filteredVehiculos = todosLosVehiculos.filter((vehiculo) => {
      return marcasIds.includes(vehiculo.id_marca);
    });
    if (filteredVehiculos.length > 0) {
      setVehiculos(filteredVehiculos);
    }
  };

  const addToCart = (vehiculo) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: vehiculo,
    });
    setShowPopup(true);
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

    let timeoutId;

    if (vehiculos && vehiculos.length === 0 && searchText.trim() !== "") {
      timeoutId = setTimeout(() => {
        setShowNoResultsMessage(true);
      }, 10000); // 10 segundos de retraso
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [vehiculos, marcas, searchText]);

  const [isCardView, setIsCardView] = useState(true);

  const toggleView = () => {
    setIsCardView(!isCardView);
  };


  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch("http://api.exchangeratesapi.io/v1/latest?access_key=1677de3104d91da387e7a7635c931ab6&symbols=USD,ARS,JPY,GBP&format=1");
          const jsonData = await response.json();
          setData(jsonData.rates);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  return (
    <div>
      <img src="/dreamCarHome.png" alt="DreamCarHome" />
      <div className="search-container">
        <input
          type="text"
          style={{ border: "5px double #0d6efd", borderRadius: "8px" }}
          placeholder="Filtrar por marca"
          value={searchText}
          onChange={handleSearchChange}
          className="small-search-container"
        />
      </div>
      <button onClick={toggleView} className="btn btn-secondary">
        <FontAwesomeIcon icon={faRotate} />
           Cambiar vista
      </button>
      {vehiculos && vehiculos.length > 0 ? (
      <div className={isCardView ? "card-container-shopping" : "list-container-shopping"}>
          {vehiculos.map((vehiculo) => (
            <div style={{ maxWidth: "18rem"}} key={vehiculo.id} >
              {isCardView ? (
                <ProductItem
                  vehiculo={vehiculo}
                  marcas={marcas}
                  onClickFuncion={addToCart}
                  botonMensaje=" Agregar al carrito"
                  rates={data}
                  isInCartView={false}
                />
              ) : (
                <ListItem
                  vehiculo={vehiculo}
                  marcas={marcas}
                  onClickFuncion={addToCart}
                  botonMensaje=" Agregar al carrito"
                  isInCartView={false}
                />
              )}
              <Popup 
                show={showPopup} 
                popMensaje=" Vehiculo agregado al carrito" 
                close={() => setShowPopup(false)} 
              />
            </div>
          ))}
      </div>
      ) : (
        showNoResultsMessage ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          searchText.trim() === "" ? (
            <p>Buscando...</p>
          ) : null
        )
      )}
    </div>
  );
};

export default Inicio;
