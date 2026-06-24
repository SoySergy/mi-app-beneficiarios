// app/beneficiarios/page.js
'use client';

import { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function BeneficiariosConsulta() {
  const [beneficiarios, setBeneficiarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados exclusivos para controlar la paginación
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchBeneficiarios = async (currentPage) => {
    try {
      setLoading(true);
      // Solicitamos la página actual con un límite estándar de 50 registros
      const res = await fetch(`/api/beneficiarios?page=${currentPage}&limit=50`);
      if (!res.ok) {
        throw new Error('Error de comunicación con el servidor.');
      }
      const result = await res.json();
      
      setBeneficiarios(result.data);
      setTotalPages(result.pagination.totalPages);
      setTotalRecords(result.pagination.total);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Vuelve a solicitar los datos cada vez que cambia la página actual
  useEffect(() => {
    fetchBeneficiarios(page);
  }, [page]);

  // Funciones de control de paginación
  const irAPrimera = () => setPage(1);
  const irAAnterior = () => setPage((prev) => Math.max(prev - 1, 1));
  const irASiguiente = () => setPage((prev) => Math.min(prev + 1, totalPages));
  const irAUltima = () => setPage(totalPages);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Consulta de Beneficiarios</h1>
        <p className={styles.subtitle}>
          Total de registros: <strong>{totalRecords.toLocaleString()}</strong>
        </p>
      </header>

      {error && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>⚠️ Error: {error}</p>
          <button className={styles.retryButton} onClick={() => fetchBeneficiarios(page)}>
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <div className={styles.loading}>
          <p>Cargando datos de la página {page}...</p>
        </div>
      ) : !error && beneficiarios.length === 0 ? (
        <p className={styles.noData}>No se encontraron registros de beneficiarios.</p>
      ) : (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID Hecho</th>
                  <th>Convocatoria</th>
                  <th>Localidad</th>
                  <th>Institución (Universidad)</th>
                  <th>Grupo Étnico</th>
                  <th>SISBEN</th>
                  <th>Sexo</th>
                  <th>Rango de Edad</th>
                  <th>Beneficiarios</th>
                </tr>
              </thead>
              <tbody>
                {beneficiarios.map((b) => (
                  <tr key={b.id_hecho}>
                    <td>{b.id_hecho}</td>
                    <td>{b.convocatoria}</td>
                    <td>{b.localidad}</td>
                    <td>{b.institucion}</td>
                    <td>{b.grupo_etnico}</td>
                    <td>{b.sisben}</td>
                    <td>{b.sexo}</td>
                    <td>{b.edad}</td>
                    <td className={styles.boldCell}>{b.beneficiarios}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Controles de navegación de página */}
          <div className={styles.paginationContainer}>
            <button 
              className={styles.paginationButton} 
              onClick={irAPrimera} 
              disabled={page === 1}
            >
              « Primero
            </button>
            <button 
              className={styles.paginationButton} 
              onClick={irAAnterior} 
              disabled={page === 1}
            >
              ‹ Anterior
            </button>
            <span className={styles.pageInfo}>
              Página <strong>{page}</strong> de {totalPages.toLocaleString()}
            </span>
            <button 
              className={styles.paginationButton} 
              onClick={irASiguiente} 
              disabled={page === totalPages}
            >
              Siguiente ›
            </button>
            <button 
              className={styles.paginationButton} 
              onClick={irAUltima} 
              disabled={page === totalPages}
            >
              Último »
            </button>
          </div>
        </>
      )}
    </div>
  );
}