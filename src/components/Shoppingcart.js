import React, { useEffect, useReducer, useState } from "react";
import { shoppingInitialState, shoppingReducer } from "./shoppingReducer";
import ProductItem from "./ProductItem";
import DreamCar_ico from "../images/DreamCar_ico.png";
import { peticionVehiculos, peticionMarcas } from "./apiAux";
import Popup from "./Popup";

const Shoppingcart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products } = state;
  const [vehiculos, setVehiculos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const delFromCart = () => {};
  const clearCart = () => {};

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    if (new Date(newStartDate) >= new Date(endDate)) {
      setError("La fecha de inicio debe ser anterior a la fecha final");
    } else {
      setError("");
    }
  };

  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    if (new Date(startDate) >= new Date(newEndDate)) {
      setError("La fecha de inicio debe ser anterior a la fecha final");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Obetener un arrelo con todos los ids de los vehiculos
    const ids = products.map((vehiculo) => vehiculo.id);

    const body = {
      email: email,
      fecha_inicio: startDate,
      fecha_final: endDate,
      vehiculos: ids, //arreglo con todos los ids de los vehiculso
    };
    try {
      const res = await fetch(
        "https://ai-avengers-laravel-po6cvv2kb-zucolieze.vercel.app/rest/reservas/crearReserva",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": "",
          },
          body: JSON.stringify(body),
        }
      );

      const reserva = await res.json();
      if(res.status === 200) {
        setShowPopup(true);
        setStartDate("");
        setEndDate("");
        setEmail("");
      }
      return reserva;
    } catch (error) {
      console.error("Error en la solicitud de marcas:", error);
      return [];
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      const vehiculosData = await peticionVehiculos();
      const marcasData = await peticionMarcas();
      setVehiculos(vehiculosData);
      setMarcas(marcasData);
    };

    if (marcas.length === 0) {
      fetchData();
    }
  }, [products, marcas]); // El segundo argumento es un array de dependencias

  const deleteFromCart = (vehiculo) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: vehiculo,
    });
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <br />
      {products && products.length > 0 ? (
        <div className="column">
          {products.map((vehiculo, index) => (
            <div key={vehiculo.id}>
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
                      (marcas.find((marca) => marca.id === vehiculo.id_marca)
                        ?.marca || " ")}
                  </p>
                  <p>{"Precio:" + vehiculo.precio + "$"}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => deleteFromCart(vehiculo)}
                  >
                    Borrar del carrito
                  </button>
                </div>
              </div>
              <ProductItem
                key={index}
                product={vehiculo}
                deleteFromCart={() => {
                  dispatch({
                    type: "REMOVE_FROM_CART",
                    payload: vehiculo,
                  });
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Fecha de inicio</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">Fecha final</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        {error && <p>{error}</p>} {/* Mostrar el mensaje de error si existe */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Popup show={showPopup} close={() => setShowPopup(false)} />
        
      </form>
    </div>
  );
};

export default Shoppingcart;
