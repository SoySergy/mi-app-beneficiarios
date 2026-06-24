// app/sectores/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function SectoresPage() {
  const [sectores, setSectores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info'); // 'success' | 'error'

  const fetchSectores = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/sectores');
      const data = await res.json();
      if (res.ok) {
        setSectores(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error cargando sectores:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSectores();
  }, []);

  const eliminarSector = async (id, nombre) => {
    const confirmar = confirm(`¿Está seguro de que desea eliminar definitivamente el sector "${nombre}"?`);
    if (!confirmar) return;

    try {
      const res = await fetch(`/api/sectores?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje(`¡Sector "${nombre}" eliminado con éxito!`);
        setTipoMensaje('success');
        fetchSectores();
      } else {
        setMensaje(`Error: ${data.error}`);
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error("Error al eliminar:", error);
      setMensaje('Error de conexión con el servidor.');
      setTipoMensaje('error');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Eliminar Sectores de Colegio</h1>
      <p className={styles.description}>
        Lista de sectores de colegios disponibles. Presione el botón "Eliminar" para borrar permanentemente un sector.
      </p>

      {mensaje && (
        <div className={`${styles.alert} ${styles[tipoMensaje]}`}>
          {mensaje}
        </div>
      )}

      <div className={styles.card}>
        <h2>Sectores Registrados</h2>
        {loading ? (
          <p>Cargando lista de sectores...</p>
        ) : sectores.length === 0 ? (
          <p className={styles.noData}>No hay sectores registrados en la base de datos.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Sector</th>
                <th className={styles.actionsHeader}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {sectores.map((s) => (
                <tr key={s.id_sector}>
                  <td>{s.id_sector}</td>
                  <td className={styles.nombreCell}>{s.nombre}</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.buttonDelete}
                      onClick={() => eliminarSector(s.id_sector, s.nombre)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}