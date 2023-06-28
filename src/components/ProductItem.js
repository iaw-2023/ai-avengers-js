import React from "react";
import DreamCar_ico from "../images/DreamCar_ico.png";


const ProductItem = ({ vehiculo, marcas, onClickFuncion, botonMensaje }) => {


  return (
    <div
      className="card text-bg-primary mb-3"
      style={{ maxWidth: "18rem" }}
      key={vehiculo.id}
    >
      <img src={DreamCar_ico} className="card-img-top" alt="Auto Imagen"></img>
      <div className="card-body">
        <h4>{vehiculo.modelo}</h4>
        <p>
          {"Marca:" +
            (marcas.find((marca) => marca.id === vehiculo.id_marca)?.marca ||
              " ")}
        </p>
        <p>{"Precio:" + vehiculo.precio + "$"}</p>
        <button
          className="btn btn-primary"
          onClick={() => onClickFuncion(vehiculo)}
        >
          {botonMensaje}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
