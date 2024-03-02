import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Help = () => {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/dreamHelp.png" alt="DreamCarHelp" style={{ marginRight: '10px', marginLeft:'10px' }} />
        <div>
            <h3><b>DreamCar es una empresa especializada en la reserva de coches soñados.</b></h3> 
            <p><i>Ofrecemos una amplia selección de vehículos de lujo y servicios personalizados para hacer realidad tus sueños automovilísticos. </i></p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src="/dreamFAQ.png" alt="DreamCarFAQ" style={{ marginRight: '10px', marginLeft:'10px' }} />
        <div>
            <h3><b>Preguntas frecuentes</b></h3>
            <ul>¿Como hacer una reserva?</ul>
            <p> Seleccionar desde el "Home"<FontAwesomeIcon icon={faHome}/>
                 lo vehiculos deseados y agregarlos al carrito </p>
            <ul>¿Como pagar una reserva?</ul>
            <p> Proximamente el pago podrá ser realizado con Mercado Pago </p>
            <ul>¿Como cancelar una reserva?</ul>
            <p> Enviar un mail al personal de DreamCar o buscar nuestra 
                sucursal mas cercana para hablar con un empleado</p>
        </div>
      </div>
    </div>
  );
};

export default Help;
