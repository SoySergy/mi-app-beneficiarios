// import Image from "next/image";
// import styles from "./page.module.css";

// export default function Home() {
//   return (
//     <div className={styles.page}>
//       <main className={styles.main}>
//         <Image
//           className={styles.logo}
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className={styles.intro}>
//           <h1>To get started, edit the page.js file.</h1>
//           <p>
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className={styles.ctas}>
//           <a
//             className={styles.primary}
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className={styles.logo}
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className={styles.secondary}
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


// app/page.js
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* Banner de Bienvenida */}
      <header className={styles.hero}>
        <h1>Panel de Beneficiarios</h1>
        <p>
          Bienvenido
        </p>
      </header>

      <div className={styles.gridContainer}>
        {/* Grupo 1: Consultas */}
        <div className={`${styles.cardGroup} ${styles.consultaGroup}`}>
          <h2>Consultas y Reportes</h2>
          <p className={styles.groupDescription}>Visualiza y explora los datos de los beneficiarios y catálogos.</p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3>Reporte de Beneficiarios</h3>
              <p>Visualiza la tabla de hechos.</p>
              <Link href="/beneficiarios" className={styles.btnBlue}>Ir a Reporte</Link>
            </div>
            <div className={styles.card}>
              <h3>Lista de Instituciones</h3>
              <p>Explora el catálogo de universidades e instituciones de educación superior.</p>
              <Link href="/instituciones" className={styles.btnBlue}>Ver Instituciones</Link>
            </div>
            <div className={styles.card}>
              <h3>Núcleos Académicos</h3>
              <p>Consulta los diferentes núcleos de conocimiento registrados en el sistema.</p>
              <Link href="/nucleos" className={styles.btnBlue}>Ver Núcleos</Link>
            </div>
          </div>
        </div>

        {/* Grupo 2: Actualizaciones */}
        <div className={`${styles.cardGroup} ${styles.updateGroup}`}>
          <h2>Actualizaciones</h2>
          <p className={styles.groupDescription}>Modifica y actualiza la información.</p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3>Editar Convocatorias</h3>
              <p>Actualiza los nombres de las convocatorias vigentes de la base de datos.</p>
              <Link href="/convocatorias" className={styles.btnOrange}>Gestionar</Link>
            </div>
            <div className={styles.card}>
              <h3>Editar SISBEN</h3>
              <p>Modifica la clasificación o nombres de las categorías del SISBEN.</p>
              <Link href="/sisben" className={styles.btnOrange}>Gestionar</Link>
            </div>
          </div>
        </div>

        {/* Grupo 3: Inserciones */}
        <div className={`${styles.cardGroup} ${styles.insertGroup}`}>
          <h2>Registros Nuevos</h2>
          <p className={styles.groupDescription}>Añade nuevos elementos.</p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3>Grupos Étnicos</h3>
              <p>Registra nuevas clasificaciones étnicas dentro de la base de datos.</p>
              <Link href="/grupos-etnicos" className={styles.btnGreen}>Agregar</Link>
            </div>
            <div className={styles.card}>
              <h3>Modalidades de Corte</h3>
              <p>Registra nuevas modalidades de corte.</p>
              <Link href="/modalidades" className={styles.btnGreen}>Agregar</Link>
            </div>
          </div>
        </div>

        {/* Grupo 4: Eliminaciones */}
        <div className={`${styles.cardGroup} ${styles.deleteGroup}`}>
          <h2>Eliminación de Registros</h2>
          <p className={styles.groupDescription}>Elimina registros existentes.</p>
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <h3>Sectores de Colegio</h3>
              <p>Elimina sectores educativos evaluando si están asociados a la tabla hechos.</p>
              <Link href="/sectores" className={styles.btnRed}>Eliminar</Link>
            </div>
            <div className={styles.card}>
              <h3>Zonas de Colegio</h3>
              <p>Remueve clasificaciones geográficas, previniendo romper registros de beneficiarios.</p>
              <Link href="/zonas" className={styles.btnRed}>Eliminar</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
