import React, { useEffect, useReducer, useState } from "react";
import { shoppingInitialState, shoppingReducer } from "../shoppingReducer";
import { peticionMarcas } from "../apiAux";
import ProductItem from "../ProductItem";
import ListItem from "../ListItem";
import Popup from "../Popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate, faEnvelopeCircleCheck } from '@fortawesome/free-solid-svg-icons';
import MyPaymentComponent from '../MyPaymentComponent.js';
import { initMercadoPago } from '@mercadopago/sdk-react';

const Shoppingcart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products } = state;
  const [marcas, setMarcas] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const[isModalOpen, setIsModalOpen] = useState(false);
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
      if (res.status === 200) {
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
      const marcasData = await peticionMarcas();
      setMarcas(marcasData);
      try {
        const response = await fetch("/v1/latest?access_key=1677de3104d91da387e7a7635c931ab6&symbols=USD,ARS,JPY,GBP&format=1");
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData.rates);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    initMercadoPago('TEST-749042e1-225b-4f7a-9f00-25dfa957cb95'); // Public key

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

  const [isCardView, setIsCardView] = useState(true);

  const toggleView = () => {
    setIsCardView(!isCardView);
  };

  const initialization = {
    //amount: 10000
    amount: products.reduce((acumulador, vehiculo) => acumulador + vehiculo.precio, 0)
   };
   
   const onSubmit = async (formData) => {
    // callback called when clicking on the submit data button
    return new Promise((resolve, reject) => {
      fetch('http://127.0.0.1:8000/process_payment', { //cambiar direccion TODO
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if(!response.ok){
            setError(true);
          }
          return response.json();
        })
        .then((data) => {
          if (data.status === "approved") {
            console.log("se pudo");
            resolve();
          } else {
            setError(true);
            reject();
          }
        })
        .catch((error) => {
          // handle error response when trying to create payment
          setError(true);
          reject();
        });
    });
   };
   
   
   const onError = async (error) => {
    // callback called for all Brick error cases
    console.log(error);
   };
   
   
   const onReady = async () => {
    /*
      Callback called when Brick is ready.
      Here you can hide loadings from your site, for example.
    */
   };
   
   if(isModalOpen){
    return <MyPaymentComponent
          initialization={initialization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
    }

    if(error){
      return (
          <div className="intentar">
            <div>
              <h1> Algo salio mal. Vuelv a intentarlo!</h1>
            </div>
            <button
            onClick={() => {
              setIsModalOpen(true);
              setError(false);
            }}
          >
            {" "}
            Volver a intentar{" "}
            </button>
          </div>
      );
    }

  return (
    <div>
      <img src="/dreamCarShopping.png" alt="DreamCarShopping" />
      <br /><br />
      <button onClick={toggleView} className="btn btn-secondary">
        <FontAwesomeIcon icon={faRotate} />
           Cambiar vista
      </button>
      {products && products.length > 0 ? (
        <div className={isCardView ? "card-container-shopping" : "list-container-shopping"}>
          {products.map((vehiculo, index) => (
            <div key={vehiculo.id}>
              {isCardView ? (
                <ProductItem
                  vehiculo={vehiculo}
                  marcas={marcas}
                  onClickFuncion={deleteFromCart}
                  botonMensaje=" Borrar del carrito"
                  isInCartView={true}
                  rates={data}
                />
              ) : (
                <ListItem
                  vehiculo={vehiculo}
                  marcas={marcas}
                  onClickFuncion={deleteFromCart}
                  botonMensaje=" Borrar del carrito"
                  isInCartView={true}
                  rates={data}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No hay productos en el carrito.</p>
      )}

      <form onSubmit={handleSubmit} className="input-form-shopping">
        <div className="form-group">
          <label  className="titulos" htmlFor="exampleInputEmail1">Direccion de email</label>
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
          <label className="titulos" htmlFor="startDate">Fecha de inicio</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="form-group">
          <label className="titulos" htmlFor="endDate">Fecha final</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        {error && <p>{error}</p>} {/* Mostrar el mensaje de error si existe */}
        <button 
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            {" "}
            FINALIZAR COMPRA{" "}
            </button>
        <button type="submit" className="btn btn-primary">
          <FontAwesomeIcon icon={faEnvelopeCircleCheck} />
             Reservar
        </button>
        <Popup show={showPopup} popMensaje="Tu reserva ha sido procesada exitosamente." close={() => setShowPopup(false)} />
      </form>
    </div>
  );
};

export default Shoppingcart;
