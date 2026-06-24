// app/sisben/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function SisbenPage() {
  const [categorias, setCategorias] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState('');

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/sisben');
      const data = await res.json();
      if (res.ok) {
        setCategorias(data);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error cargando categorías del SISBEN:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const iniciarEdicion = (sisben) => {
    setEditId(sisben.id_sisben);
    setEditNombre(sisben.nombre);
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
      const res = await fetch('/api/sisben', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: editId, nombre: editNombre }),
      });
      const data = await res.json();

      if (res.ok) {
        setMensaje('¡Categoría SISBEN actualizada correctamente!');
        setEditId(null);
        setEditNombre('');
        fetchCategorias();
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error al actualizar:", error);
      setMensaje('Error de conexión.');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edición de Categorías SISBEN</h1>
      <p className={styles.description}>
        Modifique los nombres o clasificaciones de las categorías de SISBEN registradas.
      </p>

      {mensaje && <div className={styles.alert}>{mensaje}</div>}

      <div className={styles.grid}>
        {/* Lado izquierdo: Lista */}
        <div className={styles.card}>
          <h2>Categorías de SISBEN</h2>
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Categoría / Nombre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((s) => (
                  <tr key={s.id_sisben}>
                    <td>{s.id_sisben}</td>
                    <td>{s.nombre}</td>
                    <td>
                      <button
                        className={styles.buttonEdit}
                        onClick={() => iniciarEdicion(s)}
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
          <h2>Actualizar Categoría</h2>
          {editId ? (
            <form onSubmit={guardarCambios} className={styles.form}>
              <div className={styles.formGroup}>
                <label>ID SISBEN:</label>
                <input
                  type="text"
                  value={editId}
                  disabled
                  className={styles.inputDisabled}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nombre de Categoría:</label>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  maxLength={50}
                  required
                  className={styles.input}
                  placeholder="Ej. B - POBREZA MODERADA"
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
              Seleccione una categoría de SISBEN de la lista para modificarla.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}