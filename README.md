# 📋 Sistema de Gestión de Beneficiarios

Aplicación web desarrollada con **Next.js** y **MySQL** para la consulta y gestión de datos de beneficiarios del programa de educación superior del Distrito Capital de Bogotá. El sistema permite visualizar, registrar, actualizar y eliminar información de las diferentes dimensiones que conforman el universo de beneficiarios.

> Proyecto desarrollado como parte de la etapa productiva del programa **Tecnólogo ADSI** del **SENA** — 2024/2025.

---

## 🚀 Tecnologías Utilizadas

| Capa | Tecnología |
|---|---|
| Frontend | Next.js 16 (App Router) · JavaScript · CSS Modules |
| Backend | Next.js API Routes (Route Handlers) |
| Base de datos | MySQL 8 · Railway (cloud) |
| Conector BD | mysql2/promise |
| Arquitectura | Patrón MVC |

---

## 🗂️ Arquitectura del Proyecto (MVC)

```
mi-app-beneficiarios/
├── db/
│   └── connection.js          → Conexión al pool de MySQL (Railway)
├── models/                    → Lógica SQL de cada tabla (Modelo)
│   ├── localidadModel.js
│   ├── institucionModel.js
│   ├── nucleoModel.js
│   └── ...
├── app/
│   ├── api/                   → Controladores (Route Handlers)
│   │   ├── localidades/
│   │   │   ├── route.js       → GET, POST
│   │   │   └── [id]/route.js  → PUT, DELETE
│   │   ├── instituciones/
│   │   │   └── route.js       → GET
│   │   └── ...
│   ├── localidades/           → Vista CRUD completo
│   ├── instituciones/         → Vista de Consulta
│   ├── nucleos/               → Vista de Consulta
│   └── ...
└── .env.local                 → Variables de entorno (no incluido en el repo)
```

---

## 🗃️ Esquema de la Base de Datos

La base de datos `beneficiarios` sigue un esquema dimensional normalizado en **3FN**, compuesto por **14 tablas de dimensiones** y una **tabla de hechos** central.

### Tablas de Dimensiones

| Tabla | Descripción |
|---|---|
| `localidad` | Localidades de Bogotá D.C. |
| `institucion` | Instituciones de educación superior |
| `nucleo_conocimiento` | Núcleos de conocimiento académico |
| `convocatoria` | Convocatorias del programa (JE, JU) |
| `modalidad_corte` | Modalidad de corte del beneficiario |
| `sector_colegio` | Sector del colegio de origen |
| `zona_colegio` | Zona del colegio de origen |
| `saber11_percentil` | Rango de percentil en pruebas Saber 11 |
| `sexo` | Género del beneficiario |
| `edad` | Rango de edad |
| `grupo_etnico` | Grupo étnico del beneficiario |
| `victima_conflicto` | Condición de víctima del conflicto |
| `discapacidad` | Condición de discapacidad |
| `sisben` | Categoría SISBEN |

### Tabla de Hechos

`hechos` — Registra cada beneficiario como un hecho con referencias FK a todas las dimensiones anteriores, más el campo `beneficiarios` (cantidad).

---

## 🖥️ Vistas Disponibles

### Consulta (solo lectura)
| Ruta | Descripción |
|---|---|
| `/beneficiarios` | Tabla de beneficiarios con JOINs a todas las dimensiones |
| `/instituciones` | Lista de instituciones de educación superior |
| `/nucleos` | Lista de núcleos de conocimiento |

### Update
| Ruta | Descripción |
|---|---|
| `/convocatorias` | Edición de nombres de convocatorias |
| `/sisben` | Edición de categorías SISBEN |

### Insert
| Ruta | Descripción |
|---|---|
| `/grupos-etnicos` | Registro de nuevos grupos étnicos |
| `/modalidades` | Registro de nuevas modalidades de corte |

### Delete
| Ruta | Descripción |
|---|---|
| `/sectores` | Eliminación de sectores de colegio |
| `/zonas` | Eliminación de zonas de colegio |

---

## ⚙️ Instalación y Configuración Local

### Prerequisitos
- Node.js 18+ (LTS)
- Acceso a una instancia MySQL (local o Railway)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/SoySergy/mi-app-beneficiarios.git
cd mi-app-beneficiarios

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crear archivo .env.local en la raíz del proyecto
```

Contenido del archivo `.env.local`:
```env
DATABASE_URL="mysql://usuario:contraseña@host:puerto/beneficiarios"
```

```bash
# 4. Iniciar el servidor de desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

> ⚠️ El archivo `.env.local` **no se incluye en el repositorio** por seguridad. Nunca subas credenciales a GitHub.

---

## 📸 Evidencias

### Inicio
<img src="./capturas del front/Inicio.png" alt="Inicio" width="800"/>

---

### Beneficiarios — Consulta con JOINs
<img src="./capturas del front/beneficiarios.png" alt="Beneficiarios" width="800"/>

---

### Convocatorias — Update
<img src="./capturas del front/Convocatorias.png" alt="Convocatorias" width="800"/>

---

### SISBEN — Update
<img src="./capturas del front/SISBEN.png" alt="SISBEN" width="800"/>

---

### Grupos Étnicos — Insert
<img src="./capturas del front/Grupos Étnicos.png" alt="Grupos Étnicos" width="800"/>

---

### Modalidades de Corte — Insert
<img src="./capturas del front/Modalidades de Corte.png" alt="Modalidades de Corte" width="800"/>

---

### Sectores de Colegio — Delete
<img src="./capturas del front/Sectores de Colegio.png" alt="Sectores de Colegio" width="800"/>

---

### Zonas de Colegio — Delete
<img src="./capturas del front/Zonas de Colegio.png" alt="Zonas de Colegio" width="800"/>

---

## 👤 Autor

**Sergio** — Aprendiz Tecnólogo ADSI · SENA  
Etapa Productiva — 2025  
[github.com/SoySergy](https://github.com/SoySergy)