# Proyecto: DevHack 2026 - Plataforma Fullstack

## Descripción General
DevHack 2026 es una plataforma integral diseñada para la gestión, promoción y registro de equipos para eventos tecnológicos. El sistema se basa en una arquitectura desacoplada con un cliente interactivo, un servidor de lógica de negocio y una base de datos relacional alojada en la nube.

## Infraestructura y Despliegue
La aplicación utiliza los siguientes servicios para su funcionamiento en producción:

* **Interfaz de Usuario (Frontend):** Desplegada en **Netlify**. Gestiona la navegación, interactividad y validaciones de cliente.
* **Servidor de Aplicaciones (Backend):** Alojado en **Render**. Administra los procesos lógicos y la comunicación con servicios externos.
* **Persistencia de Datos:** Implementada en **MySQL** y distribuida en la nube mediante **Aiven**, permitiendo el acceso global y seguro a la información.
* **Diseño y Prototipado:** El modelado visual y la arquitectura de experiencia de usuario (UX/UI) se encuentran documentados en **Figma**.

## Arquitectura del Sistema

### 1. Frontend (Angular 17+)
Desarrollado con componentes independientes (Standalone) para una carga optimizada:
* **Galería Multimedia:** Carrusel de flujo infinito con soporte para video e imagen y controladores de audio dinámicos.
* **Control de Registro:** Implementación de un temporizador de 60 segundos por sesión. Al agotarse el tiempo, el sistema bloquea el acceso al formulario para garantizar la integridad de la red.
* **Seguridad y Validación:** Integración de Google reCAPTCHA v2 y filtros de dominio exclusivos para cuentas de Gmail.

### 2. Backend (Python / FastAPI)
Funciona como el núcleo de procesamiento de datos:
* **Procesamiento REST:** Recibe y valida los payloads enviados desde el cliente (Nombre de equipo, correo y especialidad).
* **Gestión de Base de Datos:** Realiza la conexión remota con el servidor MySQL para el registro y consulta de escuadrones activos en tiempo real.

### 3. Integraciones de Terceros
* **EmailJS:** Automatización de notificaciones de confirmación enviadas al correo del usuario tras un registro exitoso.

## Enlaces del Proyecto
* **Página Web (Netlify):** https://devhack2026summer.netlify.app/
* **Servicios API (Render):** https://hackathon-backend-u9kp.onrender.com/docs
* **Prototipo de Diseño (Figma):** https://www.figma.com/design/AkQS4zx98vvueRKNzXq9ZE/Dise%C3%B1o-Hackaton?node-id=0-1&t=RA5R8K1bBX6ASTas-1

---
*Este repositorio sigue una estructura de monorepo organizada en las carpetas `/frontend` y `/backend`.*
