// models/sectorModel.js
import pool from '../db/connection';

const SectorModel = {
  // Obtener todos los sectores
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM sector_colegio ORDER BY id_sector ASC');
    return rows;
  },

  // Eliminar un sector por ID (DELETE FROM)
  delete: async (id_sector) => {
    const query = 'DELETE FROM sector_colegio WHERE id_sector = ?';
    const [result] = await pool.query(query, [id_sector]);
    return result;
  }
};

export default SectorModel;