const Popup = ({ show, popMensaje, close }) => {
  if (!show) return null;

  return (
    <div className="popup">
      {popMensaje}
      <button className="btn-close" onClick={() => close()}></button>
    </div>
  );
};

export default Popup;
