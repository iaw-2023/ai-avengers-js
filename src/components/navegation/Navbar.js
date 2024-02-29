import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faCircleInfo, faFlag, faHashtag } from '@fortawesome/free-solid-svg-icons'; 

const Navbar = () => {
  const [deferredPrompt, setDeferredPrompt] = React.useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(() => {
        setDeferredPrompt(null);
      });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          DreamCar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link btn btn-primary" to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-primary" to="/Shoppingcart">
                <FontAwesomeIcon icon={faShoppingCart} /> Shopping Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-primary" to="/Help">
                <FontAwesomeIcon icon={faCircleInfo} /> Help
              </Link>
            </li>
          </ul>
        </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button className="nav-link btn btn-warning" onClick={handleInstall}><FontAwesomeIcon icon={faHashtag} />Instalar PWA</button>
          </li>
          <li className="nav-item">
            <Link className="nav-link btn btn-danger" to="/Error">
                <FontAwesomeIcon icon={faFlag} /> Report or Suggestions
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
