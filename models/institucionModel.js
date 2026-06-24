// models/institucionModel.js
import pool from '../db/connection';

const InstitucionModel = {
  getAll: async () => {
    //const [rows] = await pool.query('SELECT * FROM institucion ORDER BY nombre ASC');
    const [rows] = await pool.query('SELECT * FROM institucion ORDER BY id_institucion ASC');
    return rows;
  }
};

export default InstitucionModel;