# 📊 Entramiento Interactivo: Fundamentos y uso de R para Trabajo con datos.
¡Bienvenido al Entrenamiento Interactivo de Fundamentos de R! Esta aplicación está diseñada para ayudarte a poner a prueba y reforzar tus conocimientos sobre algunas de las herramientas más importantes en el ecosistema de R para el análisis de datos, la creación de informes reproducibles y el desarrollo de aplicaciones web interactivas.

## ✨ Descripción

Este proyecto es una aplicación de entrenamiento (tipo quiz) que carga preguntas desde un archivo de datos estructurado. El quiz se enfoca en conceptos clave y el uso práctico de:

* **R Markdown y Quarto:** Creación de informes y documentos dinámicos y reproducibles.
* **Shiny:** Desarrollo de aplicaciones web interactivas y dashboards directamente en R.
* **Tidyverse:** Manipulación, transformación y visualización de datos con paquetes como `dplyr`, `tidyr` y `ggplot2`.
* Características del entorno **RStudio** relevantes para estas tareas.

Es una herramienta ideal para personas que están aprendiendo o ya utilizan R y desean consolidar su comprensión de estas herramientas esenciales.

## 🚀 Características Principales

* **Preguntas Variadas:** Amplia colección de preguntas que cubren diferentes aspectos de R Markdown, Quarto, Shiny y Tidyverse.
* **Formato de Opción Múltiple:** Interfaz clara y sencilla para seleccionar respuestas.
* **Retroalimentación Inmediata:** Obtén la respuesta correcta y una explicación detallada después de responder cada pregunta (esto dependerá de la implementación de la app que use estos datos).
* **Basado en Datos Estructurados:** Las preguntas se cargan desde un archivo JavaScript (`quiz.js`), facilitando su modificación y expansión.

## 💻 Uso e Instalación

*(**Nota:** Estas instrucciones son generales y asumen una implementación típica de una aplicación web que consume los datos del quiz. Los pasos exactos pueden variar dependiendo del framework y la tecnología específica utilizada para construir la interfaz del quiz.)*

1.  **Clonar el Repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_REPOSITORIO>
    ```
    *(Reemplaza `<URL_DEL_REPOSITORIO>` y `<NOMBRE_DEL_DIRECTORIO_DEL_REPOSITORIO>` con la información real del proyecto si está alojado en un repositorio Git).*

2. **Visualizar desde el editor**

	Puedes abrila con tu editor favorito y arrancar el archivo 'index.html' en tu navegador. 

3.  **Instalar Dependencias:**
    Si la aplicación es una aplicación web construida con tecnologías como React, Vue, Angular u otro framework, necesitarás instalar las dependencias del proyecto (generalmente usando npm o yarn). Asegúrate de tener [Node.js](https://nodejs.org/) instalado.
    ```bash
    npm install
    # o si usas yarn
    yarn install
    ```

4.  **Ejecutar la Aplicación:**
    El comando para iniciar la aplicación dependerá de cómo esté configurado el proyecto. Los comandos comunes incluyen:
    ```bash
    npm start
    # o
    yarn dev
    # o
    npm run serve
    ```
    La aplicación debería abrirse en tu navegador web por defecto (comúnmente en `http://localhost:3000` o similar).

## 📚 Datos del entrenamiento

Las preguntas y respuestas del entrenamiento están definidas en el archivo `src/data/originalQuizData.js` (la ruta puede variar según la estructura del proyecto).

La estructura es un array de objetos JavaScript, donde cada objeto representa una pregunta con el siguiente formato:

```javascript
{
  question: "Texto de la pregunta...",
  options: {
    A: "Opción A",
    B: "Opción B",
    C: "Opción C",
    D: "Opción D"
  },
  correctAnswer: "Letra de la respuesta correcta (ej: 'C')",
  explanation: "Explicación detallada de la respuesta."
}
```

## Créditos

Este repositorio fue creado por el equipo de la [Escuela de Datos](https://aulavirtual.escuelasol.cl/escuela-de-datos#scrollTop=0) de la [Fundación SOL](www.fundacionsol.cl)
Puedes utilizarlo para tu proyectos, pero ten presente comentar de donde provino el código original para seguir nutriendo este código.