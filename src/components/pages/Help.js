import React from 'react';

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
        <div >
            <h5><b>Preguntas frecuentes</b></h5>
            <ul>
                <ul>¿Como hacer una reserva?</ul>
                <p> Seleccionar desde el "Home" lo vehiculos deseados y agregarlos al carrito </p>
                <li>¿Como pagar una reserva?</li>
                <li>¿Como cancelar una reserva?</li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default Help;
