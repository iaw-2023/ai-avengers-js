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
    <div>
      <h1>Error Reporting</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={error}
          onChange={(e) => setError(e.target.value)}
          placeholder="Describe the error..."
          rows={5}
          cols={50}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ErrorPage;
