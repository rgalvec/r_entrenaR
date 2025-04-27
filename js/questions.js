// Este archivo contiene los datos de las preguntas del quiz.
// Puedes modificar este array para añadir, eliminar o cambiar preguntas y opciones.

export const originalQuizData = [
	{
		question: "¿Cuál es la función principal del menú 'Publish' en el contexto de R Markdown o Quarto?",
		options: {
			A: "Ejecutar todos los chunks de código del documento.",
			B: "Formatear automáticamente el código fuente del documento.",
			C: "Compartir el documento renderizado en servicios online como RPubs.",
			D: "Guardar el documento en un formato específico como PDF o Word."
		},
		correctAnswer: "C",
		explanation: "La función del menú Publish es precisamente permitir a los usuarios compartir sus documentos renderizados en servicios en línea como RPubs, lo que simplifica la difusión de análisis y resultados a una audiencia más amplia."
	},
	{
		question: "¿Qué indica el botón 'Outline' en el editor de R Markdown o Quarto y cómo se activa?",
		options: {
			A: "Indica los errores de sintaxis en el código R; se activa al guardar el archivo.",
			B: "Muestra una vista previa del documento final renderizado; se activa con CTRL+Enter.",
			C: "Indica la estructura de carpetas del proyecto; se activa en el menú 'File'.",
			D: "Muestra un esquema navegable del documento basado en encabezados Markdown; se activa haciendo clic en su botón en la interfaz."
		},
		correctAnswer: "D",
		explanation: "El botón Outline muestra un esquema navegable del documento, construido a partir de los encabezados formateados con Markdown. Se activa simplemente haciendo clic en el botón correspondiente en la interfaz del editor, facilitando la navegación y comprensión de la estructura."
	},
	{
		question: "Describe la función de los botones 'Source' y 'Visual' en el editor.",
		options: {
			A: "'Source' es para ver el código R y 'Visual' es para ver los gráficos generados.",
			B: "'Source' es para editar archivos de datos y 'Visual' es para editar el texto.",
			C: "Permiten alternar entre la vista del código fuente Markdown y una vista WYSIWYG (Lo que ves es lo que obtienes) más amigable para la edición.",
			D: "'Source' compila el documento y 'Visual' lo abre en el navegador."
		},
		correctAnswer: "C",
		explanation: "Los botones Source y Visual son fundamentales para la edición, permitiendo alternar fácilmente entre la manipulación directa del código fuente Markdown y una vista más visual y amigable (WYSIWYG), adaptándose a diferentes preferencias de edición."
	},
	{
		question: "¿Cómo se genera un documento final (renderizado) en R Markdown o Quarto, y qué opciones de formato de salida existen?",
		options: {
			A: "Se utiliza el comando render() en la consola de R; solo se puede generar HTML por defecto.",
			B: "Se guarda el archivo y se utiliza el botón 'Knit' o 'Render'; solo se pueden generar PDF y Word.",
			C: "Se ejecuta el código R del documento; el formato de salida es siempre texto plano.",
			D: "Se guarda el archivo y se utiliza el icono de 'renderizado', pudiendo elegir formatos como HTML, PDF o Word (especificados en YAML), con PDF requiriendo LaTeX."
		},
		correctAnswer: "D",
		explanation: "Para generar el documento final, se guarda el archivo y se usa el icono de renderizado. El triángulo junto a él permite elegir formatos de salida como HTML, PDF o Word, siempre que estén definidos en el encabezado YAML. Es importante recordar que PDF requiere la instalación de LaTeX."
	},
	{
		question: "¿Qué es un chunk en R Markdown o Quarto y cuál es su propósito principal?",
		options: {
			A: "Es una sección de texto narrativo con formato especial.",
			B: "Es un bloque de configuración inicial del documento (YAML).",
			C: "Es un bloque de código R incrustado, delimitado por marcadores, cuyo propósito es ejecutar código y mostrar sus resultados en el documento.",
			D: "Es un enlace a un recurso externo o una imagen."
		},
		correctAnswer: "C",
		explanation: "Un chunk es la parte central de la reproducibilidad: un bloque de código R (u otro lenguaje en Quarto) delimitado por ```{r} y ``` que se ejecuta durante el renderizado para incluir los resultados (código, texto, tablas, gráficos) directamente en el documento final."
	},
	{
		question: "Menciona dos formas de insertar un nuevo chunk de código en el editor.",
		options: {
			A: "Copiar y pegar un chunk existente; usar el menú 'Edit'.",
			B: "Escribir manualmente los delimitadores ``` y {r}; usar la consola de R.",
			C: "Usar el atajo de teclado CTRL+ALT+I; hacer clic en el icono 'Insert a new code chunk' en la barra de herramientas.",
			D: "Usar el menú 'Tools'; arrastrar y soltar un script R."
		},
		correctAnswer: "C",
		explanation: "Las dos formas más directas y eficientes de insertar un chunk son mediante el atajo de teclado universal CTRL+ALT+I o haciendo clic en el icono dedicado ('Insert a new code chunk') en la barra de herramientas del editor."
	},
	{
		question: "¿Qué diferencia existe entre las opciones de chunk echo: false e include: false?",
		options: {
			A: "echo: false oculta los resultados del código, mientras que include: false oculta solo el código fuente.",
			B: "echo: false se usa para texto, include: false se usa para código.",
			C: "echo: false ejecuta el código pero oculta el código fuente en el documento final; include: false ejecuta el código pero oculta tanto el código fuente como sus resultados.",
			D: "echo: false detiene la ejecución del chunk, mientras que include: false la permite."
		},
		correctAnswer: "C",
		explanation: "La distinción es crucial para controlar qué se muestra en el documento. echo: false es útil cuando quieres mostrar solo el resultado de un cálculo o gráfico sin el código que lo generó. include: false oculta todo del chunk, útil para código que genera objetos que se usan más adelante pero no necesitas mostrar."
	},
	{
		question: "¿Cuál es la función principal del paquete Shiny y cuándo se lanzó su primera versión beta pública?",
		options: {
			A: "Es un paquete para crear informes estáticos y publicarlos en RPubs; lanzado en 2010.",
			B: "Es un paquete para limpiar y transformar datos de manera eficiente; lanzado en 2015.",
			C: "Permite la creación de aplicaciones web interactivas y dashboards directamente desde R; su primera versión beta pública se lanzó en 2013.",
		},
		correctAnswer: "C",
		explanation: "Shiny revolucionó la capacidad de los usuarios de R para compartir resultados, permitiendo construir potentes aplicaciones web interactivas y dashboards sin necesidad de conocimientos avanzados de desarrollo web. Su lanzamiento beta en 2013 marcó un hito importante."
	},
	{
		question: "Describe brevemente la separación entre las capas UI (interfaz de usuario) y Server en una aplicación Shiny.",
		options: {
			A: "La capa UI contiene el código R, y la capa Server define el diseño visual.",
			B: "La capa UI maneja la lógica de base de datos, y la capa Server maneja la visualización.",
			C: "Ambas capas contienen el mismo tipo de código R, pero se ejecutan en paralelo.",
			D: "La capa UI define la apariencia y los elementos interactivos (inputs/outputs), mientras que la capa Server contiene la lógica de R que procesa datos y genera las salidas en respuesta a las interacciones."
		},
		correctAnswer: "D",
		explanation: "Esta separación es el corazón de la arquitectura Shiny. UI se encarga de lo que el usuario ve e interactúa (botones, sliders, placeholders para gráficos), mientras que Server es el 'cerebro' que realiza los cálculos, filtra datos, genera gráficos y actualiza los elementos en la UI basándose en la actividad del usuario."
	},
	{
		question: "¿Qué significa el concepto de 'reactividad' en el contexto de Shiny?",
		options: {
			A: "La capacidad de la aplicación para conectarse a diferentes bases de datos.",
			B: "La velocidad con la que el código R se ejecuta en el servidor.",
			C: "La habilidad de la aplicación para generar informes PDF de forma automática.",
			D: "La capacidad de la aplicación para actualizar automáticamente partes de la interfaz de usuario (outputs) en respuesta a cambios en las entradas del usuario (inputs) o datos, sin recargar la página completa."
		},
		correctAnswer: "D",
		explanation: "La reactividad es la característica distintiva de Shiny que permite crear experiencias de usuario dinámicas e interactivas. Los outputs 'reaccionan' a los cambios en los inputs del usuario, actualizándose en tiempo real, lo que facilita la exploración de datos interactiva."
	}
];
