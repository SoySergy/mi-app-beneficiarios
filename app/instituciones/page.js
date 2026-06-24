// app/instituciones/page.js
'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function InstitucionesConsulta() {
  const [instituciones, setInstituciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/api/instituciones')
      .then(res => res.json())
      .then(data => {
        setInstituciones(data);
        setCargando(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Consulta de Instituciones</h1>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <div>
          {instituciones.map((inst) => (
            <div key={inst.id_institucion} className={styles.card}>
              <span className={styles.id}>#{inst.id_institucion}</span>
              {inst.nombre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}