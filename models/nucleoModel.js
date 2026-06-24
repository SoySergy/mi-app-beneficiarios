// models/nucleoModel.js
import pool from '../db/connection';

const NucleoModel = {
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM nucleo_conocimiento ORDER BY id_nucleo ASC');
    return rows;
  }
};

export default NucleoModel;