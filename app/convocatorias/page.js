// app/convocatorias/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ConvocatoriasPage() {
  const [convocatorias, setConvocatorias] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const fetchConvocatorias = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/convocatorias');
      const data = await res.json();
      if (res.ok) {
        setConvocatorias(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error cargando convocatorias:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvocatorias();
  }, []);

  const iniciarEdicion = (convocatoria) => {
    setEditId(convocatoria.id_convocatoria);
    setEditNombre(convocatoria.nombre);
    setMensaje('');
  };

  const cancelarEdicion = () => {
    setEditId(null);
    setEditNombre('');
    setMensaje('');
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    if (!editNombre.trim()) return;

    try {
      const res = await fetch('/api/convocatorias', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, nombre: editNombre }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje('¡Convocatoria actualizada exitosamente!');
        setEditId(null);
        setEditNombre('');
        fetchConvocatorias();
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      setMensaje('Error de conexión con el servidor.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Gestión de Convocatorias</h1>
      <p className={styles.description}>
        Seleccione una convocatoria de la lista para modificar su nombre.
      </p>

      {mensaje && <div className={styles.alert}>{mensaje}</div>}

      <div className={styles.grid}>
        {/* Lado izquierdo: Lista */}
        <div className={styles.card}>
          <h2>Lista de Convocatorias</h2>
          {loading ? (
            <p>Cargando convocatorias...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {convocatorias.map((c) => (
                  <tr key={c.id_convocatoria}>
                    <td>{c.id_convocatoria}</td>
                    <td>{c.nombre}</td>
                    <td>
                      <button
                        className={styles.buttonEdit}
                        onClick={() => iniciarEdicion(c)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Lado derecho: Formulario */}
        <div className={styles.card}>
          <h2>Formulario de Edición</h2>
          {editId ? (
            <form onSubmit={guardarCambios} className={styles.form}>
              <div className={styles.formGroup}>
                <label>ID Convocatoria:</label>
                <input
                  type="text"
                  value={editId}
                  disabled
                  className={styles.inputDisabled}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nombre de la Convocatoria:</label>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  maxLength={20}
                  required
                  className={styles.input}
                  placeholder="Ej. JU6"
                />
              </div>
              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.buttonSave}>
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className={styles.buttonCancel}
                  onClick={cancelarEdicion}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <p className={styles.placeholderText}>
              Haga clic en el botón "Editar" de cualquier convocatoria para comenzar a modificarla.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}