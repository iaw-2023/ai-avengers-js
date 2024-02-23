import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

const ListItem = ({ vehiculo, marcas, onClickFuncion, botonMensaje }) => {
  return (
    <div className="list text-bg-primary mb-3" style={{ maxWidth: "22rem" }} key={vehiculo.id} >
      <div className="list-item" style={{ display: "flex", alignItems: "center" }}>
        <div>
          <h4>{(marcas.find((marca) => marca.id === vehiculo.id_marca)?.marca || " ")}</h4>
          <p>{"Modelo: " + vehiculo.modelo}{" Precio: $"+ vehiculo.precio}{" "}</p>
        </div>
        <button
          className="btn btn-primary btn btn-danger"
          onClick={() => onClickFuncion(vehiculo)}
        > <FontAwesomeIcon icon={faCartPlus} />
          {botonMensaje}
        </button>
      </div>
    </div>
  );
};

export default ListItem;
