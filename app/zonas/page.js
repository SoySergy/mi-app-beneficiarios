// app/zonas/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ZonasPage() {
  const [zonas, setZonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info'); // 'success' | 'error'

  const fetchZonas = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/zonas');
      const data = await res.json();
      if (res.ok) {
        setZonas(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error cargando zonas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZonas();
  }, []);

  const eliminarZona = async (id, nombre) => {
    const confirmar = confirm(`¿Está seguro de que desea eliminar la zona geográfica "${nombre}"?`);
    if (!confirmar) return;

    try {
      const res = await fetch(`/api/zonas?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje(`¡Zona "${nombre}" eliminada con éxito!`);
        setTipoMensaje('success');
        fetchZonas();
      } else {
        setMensaje(`Error: ${data.error}`);
        setTipoMensaje('error');
      }
    } catch (error) {
      console.error("Error al eliminar la zona:", error);
      setMensaje('Error de conexión con el servidor.');
      setTipoMensaje('error');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Eliminar Zonas de Colegio</h1>
      <p className={styles.description}>
        Lista de zonas geográficas de colegios. Haga clic en el botón "Eliminar" para remover permanentemente una zona.
      </p>

      {mensaje && (
        <div className={`${styles.alert} ${styles[tipoMensaje]}`}>
          {mensaje}
        </div>
      )}

      <div className={styles.card}>
        <h2>Zonas Registradas</h2>
        {loading ? (
          <p>Cargando lista de zonas...</p>
        ) : zonas.length === 0 ? (
          <p className={styles.noData}>No hay zonas registradas en la base de datos.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Zona</th>
                <th className={styles.actionsHeader}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {zonas.map((z) => (
                <tr key={z.id_zona}>
                  <td>{z.id_zona}</td>
                  <td className={styles.nombreCell}>{z.nombre}</td>
                  <td className={styles.actionCell}>
                    <button
                      className={styles.buttonDelete}
                      onClick={() => eliminarZona(z.id_zona, z.nombre)}
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