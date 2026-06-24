// models/zonaModel.js
import pool from '../db/connection';

const ZonaModel = {
  // Obtener todas las zonas
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM zona_colegio ORDER BY id_zona ASC');
    return rows;
  },

  // Eliminar una zona por ID (DELETE FROM)
  delete: async (id_zona) => {
    const query = 'DELETE FROM zona_colegio WHERE id_zona = ?';
    const [result] = await pool.query(query, [id_zona]);
    return result;
  }
};

export default ZonaModel;