import React, { useState } from 'react';

function ErrorPage() {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO Enviar el error a la base de datos
    console.log('Error reported:', error);
    setError('');
  };

  return (
<div className="container mt-5">
  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <textarea
        id="errorTextArea"
        className="form-control"
        style={{ border: "5px double #0d6efd", borderRadius: "8px" }}
        value={error}
        onChange={(e) => setError(e.target.value)}
        placeholder="Describe el error... O lo que quieras decirnos."
        rows={1}
      />
    </div>
    <button type="submit" className="btn btn-primary">Enviar</button>
    <br />
    <img src="/dreamCarError.png" alt="DreamCarError" />
  </form>
</div>

  );
}

export default ErrorPage;
