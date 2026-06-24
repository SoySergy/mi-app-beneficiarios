// models/modalidadModel.js
import pool from '../db/connection';

const ModalidadModel = {
  // Obtener todas las modalidades ordenadas de forma descendente
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM modalidad_corte ORDER BY id_modalidad DESC');
    return rows;
  },

  // Crear una nueva modalidad (INSERT INTO)
  create: async (nombre) => {
    const query = 'INSERT INTO modalidad_corte (nombre) VALUES (?)';
    const [result] = await pool.query(query, [nombre]);
    return result;
  }
};

export default ModalidadModel;