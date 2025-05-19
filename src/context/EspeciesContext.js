import React, { createContext, useState, useEffect } from 'react';

export const EspeciesContext = createContext();

export const EspeciesProvider = ({ children }) => {
  const [especies, setEspecies] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/especies.json')
      .then(res => res.json())
      .then(data => {
        setEspecies(data);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar el JSON:", err);
        setCargando(false);
      });
  }, []);

  const agregarEspecie = (nuevaEspecie) => {
    nuevaEspecie.id = Date.now();
    setEspecies(prev => [...prev, nuevaEspecie]);
  };

  const eliminarEspecie = (id) => {
    setEspecies(prev => prev.filter(e => e.id !== id));
  };

  const obtenerEspeciePorId = (id) => {
    return especies.find(e => e.id === parseInt(id));
  };

  return (
    <EspeciesContext.Provider value={{
      especies,
      agregarEspecie,
      eliminarEspecie,
      obtenerEspeciePorId,
      cargando
    }}>
      {children}
    </EspeciesContext.Provider>
  );
};
