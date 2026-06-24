// models/localidadModel.js
import pool from '../db/connection';

const LocalidadModel = {
  // 1. LEER (READ): Obtener todas las localidades
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM localidad');
    return rows;
  },

  // 2. CREAR (CREATE): Insertar una nueva localidad
  create: async (nombre) => {
    const query = 'INSERT INTO localidad (nombre) VALUES (?)';
    const [result] = await pool.query(query, [nombre]);
    return result;
  },

  // 3. ACTUALIZAR (UPDATE): Modificar una localidad existente
  update: async (id_localidad, nombre) => {
    const query = 'UPDATE localidad SET nombre = ? WHERE id_localidad = ?';
    const [result] = await pool.query(query, [nombre, id_localidad]);
    return result;
  },

  // 4. BORRAR (DELETE): Eliminar una localidad
  delete: async (id_localidad) => {
    const query = 'DELETE FROM localidad WHERE id_localidad = ?';
    const [result] = await pool.query(query, [id_localidad]);
    return result;
  }
};

export default LocalidadModel;