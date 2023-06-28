import React, { useEffect, useReducer, useState } from "react";
import { shoppingInitialState, shoppingReducer } from "./shoppingReducer";
import ProductItem from "./ProductItem";
import DreamCar_ico from "../images/DreamCar_ico.png";
import { peticionVehiculos, peticionMarcas } from "./apiAux";

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

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
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
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": ""
          },
          body: JSON.stringify(body),
        }
      );

      const reserva = await res.json();
      return reserva;
    } catch (error) {
      console.error("Error en la solicitud de marcas:", error);
      return [];
    }

    // Realizar cualquier acción adicional aquí, como enviar los valores al servidor

    // Restablecer los valores de los campos de fecha después de enviar el formulario
    setStartDate("");
    setEndDate("");
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
                  {/* <p>{'Marca:'+marcas.find((marca) => marca.id === vehiculo.id_marca).marca}</p> */}
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
                    Agregar al carrito
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
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Shoppingcart;
