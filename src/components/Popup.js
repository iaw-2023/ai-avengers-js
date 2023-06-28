const Popup = ({ show, close }) => {
  if (!show) return null;

  return (
    <div className="popup">
      <h3>¡Reserva realizada!</h3>
      <p>Tu reserva ha sido procesada exitosamente.</p>
      <button className="btn-close" onClick={() => close()}>cerrar</button>
    </div>
  );
};

export default Popup;
