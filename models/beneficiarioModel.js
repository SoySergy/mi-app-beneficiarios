// models/beneficiarioModel.js
import pool from '../db/connection';

const BeneficiarioModel = {
  // 1. Obtener datos con límites y saltos (Paginación)
  getPaginated: async (limit, offset) => {
    const query = `
      SELECT 
        h.id_hecho,
        c.nombre AS convocatoria,
        l.nombre AS localidad,
        i.nombre AS institucion,
        ge.nombre AS grupo_etnico,
        s.nombre AS sisben,
        se.nombre AS sexo,
        e.rango AS edad,
        h.beneficiarios
      FROM hechos h
      INNER JOIN convocatoria c ON h.id_convocatoria = c.id_convocatoria
      INNER JOIN localidad l ON h.id_localidad = l.id_localidad
      INNER JOIN institucion i ON h.id_institucion = i.id_institucion
      INNER JOIN grupo_etnico ge ON h.id_grupo_etnico = ge.id_grupo_etnico
      INNER JOIN sisben s ON h.id_sisben = s.id_sisben
      INNER JOIN sexo se ON h.id_sexo = se.id_sexo
      INNER JOIN edad e ON h.id_edad = e.id_edad
      ORDER BY h.id_hecho DESC
      LIMIT ? OFFSET ?;
    `;
    
    // Al enviar parámetros numéricos, mysql2 los interpreta de forma segura
    const [rows] = await pool.query(query, [limit, offset]);
    return rows;
  },

  // 2. Obtener el total de beneficiarios (Hechos) en el sistema
  getTotalCount: async () => {
    const [rows] = await pool.query('SELECT COUNT(*) AS total FROM hechos');
    return rows[0].total;
  }
};

export default BeneficiarioModel;