// app/modalidades/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ModalidadesPage() {
  const [modalidades, setModalidades] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info'); // 'success' | 'error'

  const fetchModalidades = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/modalidades');
      const data = await res.json();
      if (res.ok) {
        setModalidades(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error cargando modalidades:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModalidades();
  }, []);

  const guardarModalidad = async (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return;

    try {
      const res = await fetch('/api/modalidades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje('¡Modalidad agregada con éxito!');
        setTipoMensaje('success');
        setNuevoNombre('');
        fetchModalidades(); // Recarga la lista para verificar inmediatamente la inserción
      } else {
        setMensaje(`Error: ${data.error}`);
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setMensaje('Error de conexión.');
      setTipoMensaje('error');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Registro de Modalidades de Corte</h1>
      <p className={styles.description}>
        Utilice este formulario para registrar nuevas modalidades de corte en el sistema.
      </p>

      {mensaje && (
        <div className={`${styles.alert} ${styles[tipoMensaje]}`}>
          {mensaje}
        </div>
      )}

      <div className={styles.grid}>
        {/* Formulario */}
        <div className={styles.card}>
          <h2>Agregar Nueva Modalidad</h2>
          <form onSubmit={guardarModalidad} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="nombreModalidad">Nombre de la Modalidad:</label>
              <input
                id="nombreModalidad"
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                maxLength={100}
                required
                className={styles.input}
                placeholder="Ej. Matrícula Cero"
              />
            </div>
            <button type="submit" className={styles.buttonSubmit}>
              Registrar Modalidad
            </button>
          </form>
        </div>

        {/* Lista de Verificación */}
        <div className={styles.card}>
          <h2>Modalidades Registradas (Últimas agregadas)</h2>
          {loading ? (
            <p>Cargando modalidades...</p>
          ) : (
            <div className={styles.listContainer}>
              <ul className={styles.list}>
                {modalidades.map((m) => (
                  <li key={m.id_modalidad} className={styles.listItem}>
                    <span className={styles.badge}>ID: {m.id_modalidad}</span>
                    <span className={styles.itemName}>{m.nombre}</span>
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