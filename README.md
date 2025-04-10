# 🧩 TaskFlow – Administrador de Proyectos con Roles y Colaboración en Tiempo Real

**TaskFlow** es una aplicación web avanzada de gestión de proyectos que implementa funcionalidades modernas como autenticación segura, manejo de roles, colaboración en equipo, control detallado de tareas y validaciones en cada paso. Desarrollado con un enfoque profesional y robusto, es ideal para freelancers, equipos de desarrollo y empresas que buscan mantener el control de sus flujos de trabajo.

---

## 📌 Descripción del Proyecto

TaskFlow permite a los usuarios:

✅ Crear cuentas con validación vía correo electrónico.  
🔐 Confirmar su cuenta usando un token con expiración de seguridad.  
👤 Iniciar sesión solo tras confirmar la cuenta, protegiendo el sistema de bots.  
📁 Crear y administrar múltiples proyectos.  
👥 Asignar colaboradores a proyectos mediante su correo electrónico.  
🔑 Controlar permisos con un sistema de roles personalizado (Manager vs Colaborador).  
📌 Crear tareas y gestionarlas a través de cinco estados personalizados:  
   - Pendiente  
   - En espera  
   - En progreso  
   - En revisión  
   - Completado  
🧲 Utilizar **drag and drop** para mover tareas entre estados.  
📜 Ver historial detallado de cambios por tarea (quién hizo qué y cuándo).  
📝 Añadir notas colaborativas a cada tarea.  
👤 Editar el perfil del usuario (nombre, email, contraseña).  
🧨 Eliminar proyectos solo con validación de contraseña para evitar acciones accidentales.  

---

## 🧠 Fundamentos de Desarrollo Aplicados

Este proyecto fue construido bajo principios sólidos de desarrollo de software y buenas prácticas:

- ✨ **TypeScript Fullstack**: Seguridad de tipos en frontend y backend.
- 🔁 **Validación exhaustiva** en ambos lados con formularios reactivos.
- 🔐 **Autenticación segura** con tokens, expiraciones y doble verificación.
- 🎭 **Gestión de roles** para un control claro de permisos.
- ⚠️ **Feedback y control de errores** en cada paso.
- 📚 **Historial de acciones y auditoría** para trazabilidad completa.
- 🧩 **Arquitectura modular y escalable**, usando principios como **SRP** (Single Responsibility Principle).
- 📦 Pensado para escalar a múltiples usuarios, equipos y proyectos.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

| 🛠 Tecnología        | 💡 Descripción                                                                 |
|----------------------|------------------------------------------------------------------------------|
| **Next.js**           | Framework React para frontend moderno.                                       |
| **TypeScript**        | Tipado estático en todo el proyecto.                                        |
| **Tailwind CSS**      | Estilos modernos y responsivos con utilidades.                             |
| **React Hook Form**   | Formularios controlados con gran rendimiento.                              |
| **Zod**               | Validación de esquemas segura para formularios y APIs.                      |
| **React Query**       | Manejo de datos eficiente con caché, sincronización y actualizaciones.      |
| **Node.js + Express** | Backend robusto para la API REST.                                           |
| **MongoDB**           | Base de datos NoSQL flexible y escalable.                                   |
| **Mongoose**          | ODM para modelado de datos en MongoDB.                                      |
| **Nodemailer**        | Envío de correos para confirmación de cuenta.                               |
| **JWT**               | Tokens seguros para autenticación persistente.                             |
| **Bcrypt.js**         | Encriptación de contraseñas.                                                |

---

## 🚀 Cómo levantar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/afgomezv/backend-taskflow.git
cd backend-taskflow
```
### 2. Instalar dependencias
```bash
npm install
```

### 3. Renombra el archivo `.env.template` en `.env` y configurar variables de entorno.
```bash
DATABASE_URL= mongodb+srv://<user>:<password>@cluster0.41ocz.mongodb.net/<name-database>
FRONTEND_URL= http://localhost:5173

SMTP_HOST= hosts_servicio_mensajeria
SMTP_PORT= port_servicio_mensajeria
SMTP_USER= user_servicio_mensajeria
SMTP_PASS= pass_servicio_mensajeria

JWT_TOKEN=yourwordsecret
````

### 4. Ejecutar el servidor en desarrollo
```bash
npm run dev
```
