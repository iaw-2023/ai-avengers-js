const Popup = ({ show, popMensaje, close }) => {
  if (!show) return null;

  const textStyle = {
    color: "black",
    fontWeight: "bold",
  };

  return (
    <div className="popup">
      <span style={textStyle}>{popMensaje}</span>
      <button className="btn-close" onClick={() => close()}></button>
    </div>
  );
};

export default Popup;
