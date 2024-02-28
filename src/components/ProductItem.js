import { React, useState }  from "react";
import DreamCar_ico from "../images/DreamCar_ico.png";
import '../index.css';


const ProductItem = ({ vehiculo, marcas, onClickFuncion, botonMensaje, rates }) => {

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
        <p>{"Precio:" + vehiculo.precio + "€"}</p>
        <div>
          <p className="textoDestacado" onMouseEnter={manejarMouseEnter} onMouseLeave={manejarMouseLeave}>
            Otras monedas
          </p>
          {mostrarCuadro && <div>{resultado}</div>}
        </div>
        <button
          className="btn btn-primary btn btn-danger"
          onClick={() => onClickFuncion(vehiculo)}
        >
          {botonMensaje}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
