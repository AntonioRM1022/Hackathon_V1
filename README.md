# DevHack 2026 - Proyecto Fullstack
Documentación del Proyecto: DevHack 2026
Descripción General
DevHack 2026 es una plataforma integral (Fullstack) diseñada para la gestión y registro de equipos en eventos tecnológicos. El sistema incluye una interfaz de usuario interactiva, un servidor de procesamiento de datos y persistencia en una base de datos relacional.

Servicios y Despliegue
La aplicación se encuentra distribuida en los siguientes servicios de infraestructura:

Frontend (Interfaz Web): Desplegado en Netlify. Gestiona la experiencia del usuario y las validaciones de cliente.

Backend (API): Alojado en Render. Se encarga de la lógica de negocio y la comunicación con la base de datos.

Base de Datos: Implementada en MySQL. Almacena la información de los escuadrones registrados de forma persistente.

Diseño (Prototipado): El modelado visual y la arquitectura de información se encuentran en Figma.

Arquitectura y Funcionalidades
1. Frontend (Angular 17+)
La interfaz fue desarrollada utilizando componentes independientes (Standalone) para optimizar la carga. Sus funciones principales son:

Galería Multimedia: Presentación dinámica de contenido mediante un carrusel infinito que soporta video y fotografía con gestión de audio.

Control de Sesión: Implementación de un temporizador de 60 segundos. Al expirar, el sistema bloquea el acceso al formulario de registro para garantizar la disponibilidad de la red.

Seguridad de Usuario: Integración de Google reCAPTCHA v2 para prevenir registros automatizados (bots) y validación de sintaxis para correos electrónicos con dominio exclusivo de Gmail.

2. Backend (Python / FastAPI)
El servidor actúa como intermediario seguro entre el usuario y los datos:

Procesamiento de Registros: Recibe y sanitiza los datos enviados desde el formulario (nombre de equipo, correo y especialidad).

Gestión de Datos: Realiza consultas e inserciones en el servidor MySQL.

Sincronización: Expone un endpoint para consultar en tiempo real la lista de escuadrones ya indexados en el sistema.

3. Notificaciones y Terceros
EmailJS: Se utiliza para el envío automático de correos de confirmación una vez que el backend valida el registro exitoso.

Enlaces del Proyecto
Sitio Web (Netlify): [AQUÍ_VA_TU_LINK_DE_NETLIFY]

API (Render): [AQUÍ_VA_TU_LINK_DE_RENDER]

Prototipo (Figma): [AQUÍ_VA_TU_LINK_DE_FIGMA]

Notas de Entrega
El código fuente está organizado en una estructura de monorepo bajo las carpetas /frontend y /backend. Para la evaluación de la arquitectura, se puede revisar la lógica de conexión en el archivo de configuración del servidor y los modelos de datos en el directorio correspondiente.
