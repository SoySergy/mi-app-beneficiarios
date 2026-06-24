// models/grupoEtnicoModel.js
import pool from '../db/connection';

const GrupoEtnicoModel = {
  // Obtener todos los grupos étnicos
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM grupo_etnico ORDER BY id_grupo_etnico DESC');
    return rows;
  },

  // Registrar un nuevo grupo étnico (INSERT INTO SQL)
  create: async (nombre) => {
    const query = 'INSERT INTO grupo_etnico (nombre) VALUES (?)';
    const [result] = await pool.query(query, [nombre]);
    return result;
  }
};

export default GrupoEtnicoModel;