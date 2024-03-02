import { React, useState }  from "react";
import DreamCar_ico from "../images/DreamCar_ico.png";
import '../index.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';


const ProductItem = ({ vehiculo, marcas, onClickFuncion, botonMensaje, rates, isInCartView }) => {

  const buttonClass = isInCartView ? "btn btn-danger" : "btn btn-success";
  
  const resultado = rates
  ? Object.entries(rates).map(([moneda, tasa]) => (
      <div key={moneda}>
      <p>
        {moneda}: {((tasa * vehiculo.precio).toFixed(2))}
      </p>
      </div>
    ))
  : null;

  const [mostrarCuadro, setMostrarCuadro] = useState(false);

  const manejarMouseEnter = () => {
    setMostrarCuadro(true);
  };

  const manejarMouseLeave = () => {
    setMostrarCuadro(false);
  };    

  return (
    //TODO Cambiar el icono de la carta para que muestre el logo correspondiente
    <div className="card text-bg-dark text-white mb-1" style={{ maxWidth: "18rem" }} key={vehiculo.id} >
      <img src={DreamCar_ico} className="card-img-top" alt="Auto Imagen"></img>
      <div className="card-body">
        <h4>
          {(marcas.find((marca) => marca.id === vehiculo.id_marca)?.marca || " ")}
        </h4>
        <p>{"Modelo: " + vehiculo.modelo}</p>
        <p>{"Precio: $"+ vehiculo.precio}</p>
        <div>
          <p className="textoDestacado" onMouseEnter={manejarMouseEnter} onMouseLeave={manejarMouseLeave}>
            Otras monedas
          </p>
          {mostrarCuadro && <div>{resultado}</div>}
        </div>
        <button
          className={buttonClass}
          onClick={() => onClickFuncion(vehiculo)}
        > <FontAwesomeIcon icon={faCartPlus} />
          {botonMensaje}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
