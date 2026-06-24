'use client';
import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function LocalidadesCrud() {
  const [localidades, setLocalidades] = useState([]);
  const [nombreLocalidad, setNombreLocalidad] = useState('');
  const [editando, setEditando] = useState(null);
  const [nombreEditar, setNombreEditar] = useState('');

  const fetchLocalidades = async () => {
    const res = await fetch('/api/localidades');
    const data = await res.json();
    setLocalidades(data);
  };

  useEffect(() => { fetchLocalidades(); }, []);

  const guardarLocalidad = async (e) => {
    e.preventDefault();
    await fetch('/api/localidades', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreLocalidad })
    });
    setNombreLocalidad('');
    fetchLocalidades();
  };

  const borrarLocalidad = async (id) => {
    await fetch(`/api/localidades/${id}`, { method: 'DELETE' });
    fetchLocalidades();
  };

  const actualizarLocalidad = async (id) => {
    await fetch(`/api/localidades/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreEditar })
    });
    setEditando(null);
    setNombreEditar('');
    fetchLocalidades();
  };

  return (
    <div className={styles.container}>
      <h1>Gestión de Localidades (CRUD)</h1>

      <form onSubmit={guardarLocalidad} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Nombre (Ej. Usaquén)"
          value={nombreLocalidad}
          onChange={(e) => setNombreLocalidad(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>Crear Localidad</button>
      </form>

      <div>
        {localidades.map((loc) => (
          <div key={loc.id_localidad} className={styles.card}>
            {editando === loc.id_localidad ? (
              <>
                <input
                  className={styles.input}
                  value={nombreEditar}
                  onChange={(e) => setNombreEditar(e.target.value)}
                />
                <button className={styles.button} onClick={() => actualizarLocalidad(loc.id_localidad)}>Guardar</button>
                <button className={`${styles.button} ${styles.buttonDelete}`} onClick={() => setEditando(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{loc.id_localidad}</strong> - {loc.nombre}
                <button className={styles.button} style={{marginLeft:'10px'}} onClick={() => { setEditando(loc.id_localidad); setNombreEditar(loc.nombre); }}>Editar</button>
                <button className={`${styles.button} ${styles.buttonDelete}`} onClick={() => borrarLocalidad(loc.id_localidad)}>Borrar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}