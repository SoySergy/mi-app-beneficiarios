// app/nucleos/page.js
'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function NucleosConsulta() {
  const [nucleos, setNucleos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch('/api/nucleos')
      .then(res => res.json())
      .then(data => {
        setNucleos(data);
        setCargando(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Consulta de Núcleos de Conocimiento</h1>
      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <>
          <p className={styles.total}>Total registros: {nucleos.length}</p>
          <div>
            {nucleos.map((nucleo) => (
              <div key={nucleo.id_nucleo} className={styles.card}>
                <span className={styles.id}>#{nucleo.id_nucleo}</span>
                {nucleo.nombre}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}