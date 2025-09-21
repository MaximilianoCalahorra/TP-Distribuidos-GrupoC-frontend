# TP Sistemas Distribuidos - Grupo C - Frontend

Este proyecto es el **frontend web** del sistema de la **ONG Empuje Comunitario**, desarrollado en **React**.
Se conecta al **cliente gRPC** para consumir los distintos servicios y mostrar la información en la interfaz de usuario.

---

### 🏗️ **Tecnologías y librerías principales**

- **React** (v19)

- **Vite** como bundler y dev server

- **Material UI (@mui/material + @mui/icons-material + @emotion/react/styled)** para los componentes y estilos

- **Axios** para realizar las llamadas HTTP al cliente gRPC

- **React Router DOM** para navegación entre vistas

- **Next-themes** para manejo de temas (dark/light)

- **PropTypes** para validación de props de componentes

---

### 📂 **Estructura del proyecto**

```bash
TP-Distribuidos-GrupoC-frontend/
├── components/
│   ├── Inventories/
│   │   ├── Inventories.jsx
│   │   └── styles.module.css
│   ├── Login/
│   │   ├── Login.jsx
│   │   └── styles.module.css
│   ├── ManageDonations/
│   │   ├── ManageDonations.jsx
│   │   └── styles.module.css
│   ├── ManageInventories/
│   │   ├── ManageInventories.jsx
│   │   └── styles.module.css
│   ├── ManageSolidarityEvents/
│   │   ├── ManageSolidarityEvents.jsx
│   │   └── styles.module.css
│   ├── ManageUsers/
│   │   ├── ManageUsers.jsx
│   │   └── styles.module.css
│   ├── SolidarityEvents/
│   │   ├── SolidarityEvents.jsx
│   │   └── styles.module.css
│   └── Users/
│       ├── Users.jsx
│       └── styles.module.css
├── services/
│   ├── UsuarioService.js
│   ├── InventarioService.js
│   ├── DonacionService.js
│   └── EventoSolidarioService.js
├── App.jsx
└── main.jsx/
```

---

### 🌐 **Servicios**

Cada entidad tiene un ```Service``` encargado de **realizar las llamadas HTTP al cliente gRPC**:

- **UsuarioService**: métodos para listar usuarios, crear, modificar, desactivar y login.

- **InventarioService**: listar inventarios, obtener por categoría+descripción, crear, modificar, habilitar/deshabilitar.

- **DonacionService**: crear donaciones y listar por evento.

- **EventoSolidarioService**: listar, crear, modificar, eliminar eventos; gestionar participantes; registrar donaciones.

Los componentes consumen estos servicios para **mostrar tablas, llenar formularios y realizar acciones** según el rol del usuario.

---

### 🚀 **Ejecución**

1. Clonar el repositorio:

```bash
git clone https://github.com/MaximilianoCalahorra/TP-Distribuidos-GrupoC-frontend
cd TP-Distribuidos-GrupoC-frontend
```

2. Instalar dependencias:

```bash:
npm install
```

3. Ejecutar en desarrollo:

```bash:
npm start
```

El frontend quedará disponible en ```http://localhost:5173```.

---

### 📌 **Resumen de funcionalidades**

- **Usuarios**: listado, alta, modificación, baja lógica y login.

- **Inventarios**: listado, alta, modificación, habilitar/deshabilitar.

- **Donaciones**: creación y listado por evento.

- **Eventos Solidarios**: listado, alta, modificación, eliminación, gestión de participantes y registro de donaciones.