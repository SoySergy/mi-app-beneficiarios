// app/grupos-etnicos/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function GruposEtnicosPage() {
  const [grupos, setGrupos] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info'); // 'success' o 'error'

  const fetchGrupos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/grupos-etnicos');
      const data = await res.json();
      if (res.ok) {
        setGrupos(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error cargando grupos étnicos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrupos();
  }, []);

  const guardarGrupo = async (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;

    try {
      const res = await fetch('/api/grupos-etnicos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje('¡Grupo étnico agregado con éxito!');
        setTipoMensaje('success');
        setNuevoNombre('');
        fetchGrupos(); // Recarga la lista para verificar inmediatamente la inserción
      } else {
        setMensaje(`Error: ${data.error}`);
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setMensaje('Error de conexión con el servidor.');
      setTipoMensaje('error');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registro de Grupos Étnicos</h1>
      <p className={styles.description}>
        Utilice esta interfaz para agregar nuevas clasificaciones de grupos étnicos a la base de datos.
      </p>

      {mensaje && (
        <div className={`${styles.alert} ${styles[tipoMensaje]}`}>
          {mensaje}
        </div>
      )}

      <div className={styles.grid}>
        {/* Lado izquierdo: Formulario */}
        <div className={styles.card}>
          <h2>Agregar Nuevo Grupo</h2>
          <form onSubmit={guardarGrupo} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nombreGrupo">Nombre del Grupo Étnico:</label>
              <input
                id="nombreGrupo"
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                maxLength={100}
                required
                className={styles.input}
                placeholder="Ej. AFROCOLOMBIANO"
              />
            </div>
            <button type="submit" className={styles.buttonSubmit}>
              Registrar Grupo
            </button>
          </form>
        </div>

        {/* Lado derecho: Lista */}
        <div className={styles.card}>
          <h2>Grupos Étnicos Registrados</h2>
          {loading ? (
            <p>Cargando lista...</p>
          ) : (
            <div className={styles.listContainer}>
              <ul className={styles.list}>
                {grupos.map((g) => (
                  <li key={g.id_grupo_etnico} className={styles.listItem}>
                    <span className={styles.badge}>ID: {g.id_grupo_etnico}</span>
                    <span className={styles.itemName}>{g.nombre}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}