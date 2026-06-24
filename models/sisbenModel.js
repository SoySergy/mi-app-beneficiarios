// models/sisbenModel.js
import pool from '../db/connection';

const SisbenModel = {
  // Obtener todas las categorías del SISBEN
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM sisben ORDER BY id_sisben ASC');
    return rows;
  },

  // Actualizar una categoría del SISBEN
  update: async (id_sisben, nombre) => {
    const query = 'UPDATE sisben SET nombre = ? WHERE id_sisben = ?';
    const [result] = await pool.query(query, [nombre, id_sisben]);
    return result;
  }
};

export default SisbenModel;