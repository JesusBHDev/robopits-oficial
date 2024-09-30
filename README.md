# RoboPits - Sistema de Pedidos de Componentes Electrónicos

## Descripción del Proyecto
Este proyecto tiene como objetivo desarrollar una **aplicación web** para la empresa **RoboPits**, que permita realizar pedidos de componentes electrónicos de forma eficiente y fácil para los usuarios. Además, se desarrolló una **Aplicación Web Progresiva (PWA)** para ofrecer una mejor experiencia en dispositivos móviles.

El proyecto fue desarrollado utilizando las siguientes tecnologías:
- **React.js** para el frontend.
- **TailwindCSS** para los estilos y diseño responsivo.
- **Git** para el control de versiones.

### Objetivos:
- Desarrollar una plataforma completa que permita a los usuarios realizar pedidos de componentes electrónicos.
- Implementar una PWA para mejorar la experiencia del usuario en dispositivos móviles.
- Utilizar la metodología ágil **Scrum** para el desarrollo del proyecto, garantizando una entrega continua de valor.

## Metodología de Trabajo

Utilizamos la metodología **Scrum**, que incluye las siguientes fases clave:
- **Sprints**: Ciclos cortos de desarrollo con una duración de 1 a 2 semanas.
- **Reuniones diarias : Para el seguimiento continuo del progreso .

## Herramienta de Control de Versiones y Flujo de Trabajo

Se utilizó **Git** como herramienta de control de versiones, y el proyecto está alojado en **GitHub**. El flujo de trabajo implementado sigue la estrategia de **Gitflow**, que consiste en:
- **Rama `main`**: Contiene la versión estable y lista para producción del proyecto.

## Estrategia de Versionamiento y Gestión de Ramas

La estrategia de versionamiento sigue el esquema **SemVer (Versionado Semántico)**, lo que significa:
- **v1.0.0**: Primera versión estable.
- Los incrementos de versión se manejan de la siguiente forma:
  - **Mayor**: Cuando se hacen cambios incompatibles con versiones anteriores.
  - **Menor**: Para nuevas funcionalidades compatibles con versiones anteriores.
  - **Patch**: Para correcciones menores o bugs.

## Estrategia de Despliegue y CI/CD

Utilizamos la herramienta **Vercel** para el despliegue continuo de la aplicación. El entorno de CI/CD está integrado con GitHub, de manera que cada push a las ramas principales (mai) despliega automáticamente la última versión de la aplicación en el entorno adecuado.

Pasos del CI/CD:
1. **Build manual** con cada push.
2. **Testing** antes de realizar el despliegue.
3. **Despliegue manual** a los entornos de producción o desarrollo.

## Instrucciones para Clonar el Repositorio, Instalar Dependencias y Ejecutar el Proyecto

Para clonar el repositorio y ejecutar el proyecto en tu entorno local, sigue los siguientes pasos:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/JesusBHDev/robopits-oficial
   cd repo-robopits
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Ejecutar el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Para construir el proyecto para producción:
   ```bash
   npm run build
   ```
