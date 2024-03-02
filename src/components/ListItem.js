import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ListItem = ({ vehiculo, marcas, onClickFuncion, botonMensaje, isInCartView }) => {
  const buttonClass = isInCartView ? "btn btn-danger" : "btn btn-success";
  return (
    <div className="list text-bg-dark text-white mb-1" 
      style={{ maxWidth: "22rem", display: "grid", justifyContent: "center"}} key={vehiculo.id} >
        <div>
          <h4>{(marcas.find((marca) => marca.id === vehiculo.id_marca)?.marca || " ")}</h4>
          <p>{"Modelo: " + vehiculo.modelo}</p>
          <p>{" Precio: $"+ vehiculo.precio}{" "}</p>
        </div>
        <button
          className={buttonClass}
          onClick={() => onClickFuncion(vehiculo)}
        > <FontAwesomeIcon icon={faCartPlus} />
          {botonMensaje}
        </button>
      </div>
  );
};

export default ListItem;
