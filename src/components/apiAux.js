const peticionVehiculos = async () => {
    try {
      const res = await fetch("https://ai-avengers-laravel-git-laravel-zucolieze.vercel.app/rest/vehiculos");
      const vehiculos = await res.json();
      return vehiculos;
    } catch (error) {
      console.error("Error en la solicitud de vehículos:", error);
      return [];
    }
  };
  
  const peticionMarcas = async () => {
    try {
      const res = await fetch("https://ai-avengers-laravel-git-laravel-zucolieze.vercel.app/rest/marcas");
      const marcas = await res.json();
      return marcas;
    } catch (error) {
      console.error("Error en la solicitud de marcas:", error);
      return [];
    }
  };
  
  export { peticionVehiculos, peticionMarcas };