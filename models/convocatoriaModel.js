// models/convocatoriaModel.js
import pool from '../db/connection';

const ConvocatoriaModel = {
  // Obtener todas las convocatorias
  getAll: async () => {
    const [rows] = await pool.query('SELECT * FROM convocatoria ORDER BY id_convocatoria ASC');
    return rows;
  },

  // Actualizar el nombre de una convocatoria existente
  update: async (id_convocatoria, nombre) => {
    const query = 'UPDATE convocatoria SET nombre = ? WHERE id_convocatoria = ?';
    const [result] = await pool.query(query, [nombre, id_convocatoria]);
    return result;
  }
};

export default ConvocatoriaModel;