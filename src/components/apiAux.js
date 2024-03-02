const peticionVehiculos = async () => {
    try {
      //const res = await fetch("https://ai-avengers-laravel-git-laravel-zucolieze.vercel.app/rest/vehiculos");
      const res = await fetch("http://127.0.0.1:8000/rest/vehiculos");
      const vehiculos = await res.json();
      return vehiculos;
    } catch (error) {
      console.error("Error en la solicitud de vehículos:", error);
      return [];
    }
  };
  
  const peticionMarcas = async () => {
    try {
      //const res = await fetch("https://ai-avengers-laravel-git-laravel-zucolieze.vercel.app/rest/marcas");
      const res = await fetch("http://127.0.0.1:8000/rest/marcas");
      const marcas = await res.json();
      return marcas;
    } catch (error) {
      console.error("Error en la solicitud de marcas:", error);
      return [];
    }
  };

  //TODO Exportar los logos de las marcas
  const peticionLogos = async () => {
    try {
      //const res = await fetch("https://ai-avengers-laravel-git-laravel-zucolieze.vercel.app/rest/logos");
      const res = await fetch("http://127.0.0.1:8000/rest/logos");
      const logos = await res.json();
      return logos;
    } catch (error) {
      console.error("Error en la solicitud de logos:", error);
      return [];
    }
  };
  
  
  export { peticionVehiculos, peticionMarcas, peticionLogos };