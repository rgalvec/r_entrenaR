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
			D: "Es un paquete para transformar texto de manera eficiente; lanzado en 2022.",
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
	},
	{
		"question": "¿Cuál fue un caso notable que subrayó la importancia de la reproducibilidad en la investigación, mencionado en el texto?",
		"options": {
			"A": "El descubrimiento de la estructura del ADN.",
			"B": "El escándalo de los ensayos de cáncer en Duke en 2011.",
			"C": "La publicación del primer paquete de R.",
			"D": "El desarrollo del framework Shiny."
		},
		"correctAnswer": "B",
		"explanation": "El texto menciona explícitamente el escándalo de los ensayos de cáncer en Duke en 2011 como un caso que resalta la necesidad de la verificación de resultados por terceros y, por lo tanto, la reproducibilidad."
	},
	{
		"question": "¿Qué herramientas se mencionan como facilitadoras para crear informes reproducibles con contenidos en ficheros de texto plano?",
		"options": {
			"A": "Microsoft Word y Excel.",
			"B": "RStudio y CRAN.",
			"C": "R Markdown y Quarto.",
			"D": "Shiny y leaflet."
		},
		"correctAnswer": "C",
		"explanation": "El texto indica que 'R Markdown y Quarto permiten crear informes reproducibles', utilizando ficheros de texto plano que combinan código y texto explicativo."
	},
	{
		"question": "¿Cómo se pueden insertar resultados de R de forma 'inline' dentro del texto en R Markdown o Quarto?",
		"options": {
			"A": "Usando el operador pipe (%>%).",
			"B": "Incluyendo el código entre `r` y tildes graves (```r expresion_de_R```).",
			"C": "Utilizando la sintaxis `r expresion_de_R` entre tildes graves.",
			"D": "Definiendo parámetros en el encabezado YAML."
		},
		"correctAnswer": "C",
		"explanation": "El texto describe la inserción inline de resultados de R 'utilizando tildes graves, la letra r y una expresión de R imprimible como cadena de texto (r expresion_de_R)'."
	},
	{
		"question": "¿Qué permite la opción de parametrización en Quarto, definida en el encabezado YAML?",
		"options": {
			"A": "Cambiar el formato de salida del documento (HTML, PDF).",
			"B": "Incluir código de otros lenguajes además de R.",
			"C": "Crear informes automatizados que cambian según valores como ficheros de datos o fechas.",
			"D": "Definir las opciones de los chunks de código."
		},
		"correctAnswer": "C",
		"explanation": "Según el texto, 'Quarto ofrece la opción de parametrización para informes automatizados que pueden cambiar según valores como ficheros de datos o fechas. Estos parámetros se definen en el encabezado YAML'."
	},
	{
		"question": "¿Qué combinación de teclas es útil para obtener ayuda contextual al escribir opciones de chunks en R Markdown o Quarto?",
		"options": {
			"A": "CTRL + S",
			"B": "CTRL + ENTER",
			"C": "CTRL + ESPACIO",
			"D": "CTRL + C"
		},
		"correctAnswer": "C",
		"explanation": "El texto menciona que 'la ayuda contextual es muy útil, mostrando las opciones disponibles al comenzar a escribir o al pulsar CTRL+ESPACIO'."
	},
	{
		"question": "¿Qué caracteres básicos se pueden usar para crear tablas simples en formato Markdown dentro de R Markdown o Quarto?",
		"options": {
			"A": "Asteriscos (*) y guiones bajos (_).",
			"B": "Corchetes ([]) y paréntesis (()).",
			"C": "Guiones medios (-) y barras verticales (|).",
			"D": "Comillas dobles (\") y simples (')."
		},
		"correctAnswer": "C",
		"explanation": "El texto explica que para las tablas básicas 'se pueden usar guiones medios y barras verticales para separar filas y columnas'."
	},
	{
		"question": "¿Qué función de qué paquete se menciona específicamente para formatear tablas de calidad en R Markdown según el formato de salida (HTML, PDF, Word)?",
		"options": {
			"A": "plot() del paquete base.",
			"B": "filter() del paquete dplyr.",
			"C": "kable() del paquete knitr.",
			"D": "ggplot() del paquete ggplot2."
		},
		"correctAnswer": "C",
		"explanation": "El texto sugiere usar 'funciones que formatean la tabla según el formato de salida... Funciones como kable del paquete knitr preparan automáticamente el formato según el fichero de salida'."
	},
	{
		"question": "¿Cómo se puede incluir información matemática en formato tabla utilizando LaTeX dentro de R Markdown?",
		"options": {
			"A": "Usando la función `math_table()`.",
			"B": "Con la sintaxis `$$\begin{array}{} ... \end{array}$$`.",
			"C": "Mediante el paquete `latex2table`.",
			"D": "Configurando la opción `results` del chunk como 'latex'."
		},
		"correctAnswer": "B",
		"explanation": "El texto indica que 'Para incluir información matemática en formato tabla, se puede utilizar el entorno LaTeX dentro de R Markdown con la sintaxis $$\begin{array}{} ... \end{array}$$'."
	},
	{
		"question": "¿Cuál es el primer paso recomendado si la información para una tabla en R Markdown ya está en un formato digital reconocible por R (como CSV, Excel, RData)?",
		"options": {
			"A": "Escribirla manualmente en formato Markdown.",
			"B": "Importar los datos utilizando funciones de librerías de R.",
			"C": "Incluirla como una imagen (captura de pantalla).",
			"D": "Usar librerías para facilitar la conversión a formato digital."
		},
		"correctAnswer": "B",
		"explanation": "El texto dice que 'si la información ya está en un formato digital reconocible por R... el primer paso es importar los datos utilizando las funciones de las librerías básicas o especializadas de R'."
	},
	{
		"question": "¿Qué son los Addins en RStudio y para qué pueden servir?",
		"options": {
			"A": "Son paquetes de R para análisis estadístico avanzado.",
			"B": "Son funciones para crear gráficos interactivos.",
			"C": "Son extensiones a las que se pueden asociar combinaciones de teclas para acceso rápido.",
			"D": "Son opciones para publicar documentos en línea."
		},
		"correctAnswer": "C",
		"explanation": "El texto explica que 'RStudio ofrece Addins, a los cuales se les pueden asociar combinaciones de teclas para un acceso más rápido'."
	},
	{
		"question": "¿Cómo debe comenzar la leyenda o subtítulo de una tabla en R Markdown según las indicaciones del texto?",
		"options": {
			"A": "Con el número de la tabla seguido de un punto.",
			"B": "Con el término 'Figura' en cursiva.",
			"C": "Con el término 'Tabla' en negrita, seguido del número de la tabla también en negrita.",
			"D": "Con una referencia a la fuente original."
		},
		"correctAnswer": "C",
		"explanation": "El texto especifica que 'Las leyendas o subtítulos de las tablas en R Markdown comienzan con el término 'Tabla' en negrita, seguido del número de la tabla también en negrita'."
	},
	{
		"question": "¿Qué paquete, similar a `column_spec` para columnas, permite definir especificaciones para filas (como poner en negrita o cursiva) en tablas creadas con `kable`?",
		"options": {
			"A": "dplyr",
			"B": "ggplot2",
			"C": "kableExtra",
			"D": "tidyr"
		},
		"correctAnswer": "C",
		"explanation": "El texto menciona que 'Con el paquete kableExtra, similar a column_spec para columnas, se pueden definir especificaciones para filas, como poner en negrita o cursiva una fila completa'."
	},
	{
		"question": "¿Cuál es una ventaja clave de utilizar Shiny para crear Dashboards con R, según el texto?",
		"options": {
			"A": "Solo permite incluir gráficos tradicionales.",
			"B": "Ofrece la posibilidad de incluir análisis complejos y una interfaz interactiva para el usuario.",
			"C": "Requiere un conocimiento profundo de HTML y JavaScript.",
			"D": "Solo funciona dentro del entorno de RStudio."
		},
		"correctAnswer": "B",
		"explanation": "El texto destaca que Shiny 'ofrece la ventaja de incluir mucho más que gráficos tradicionales, desde análisis simples hasta muy complejos, y proporcionar una interfaz para que el usuario interactúe directamente con la información presentada'."
	},
	{
		"question": "¿Cuáles son los dos elementos principales que crea el proyecto por defecto de Shiny en RStudio al comenzar uno nuevo?",
		"options": {
			"A": "header y footer.",
			"B": "input y output.",
			"C": "ui (interfaz de usuario) y server (lógica de negocio).",
			"D": "data y visualization."
		},
		"correctAnswer": "C",
		"explanation": "El texto indica que el proyecto por defecto en RStudio 'crea una estructura base con dos elementos principales: ui (interfaz de usuario) y server (lógica de negocio)'."
	},
	{
		"question": "¿Qué función se utiliza para correr una aplicación Shiny localmente en RStudio?",
		"options": {
			"A": "plotApp().",
			"B": "runShiny().",
			"C": "executeApp().",
			"D": "runApp()."
		},
		"correctAnswer": "D",
		"explanation": "Según el texto, 'Para correr una aplicación Shiny localmente en RStudio, se puede usar la función runApp()'."
	},
	{
		"question": "¿En qué framework se basa Shiny para su diseño, aunque los usuarios de R no necesiten conocer sus detalles?",
		"options": {
			"A": "React.",
			"B": "Angular.",
			"C": "Bootstrap.",
			"D": "jQuery."
		},
		"correctAnswer": "C",
		"explanation": "El texto menciona que 'Shiny se basa en el framework Bootstrap para su diseño, aunque los usuarios de R no necesiten conocer los detalles de Bootstrap para crear interfaces atractivas'."
	},
	{
		"question": "¿Cómo facilita Shiny la creación de mapas interactivos dentro de R?",
		"options": {
			"A": "Requiere el uso de librerías externas complejas.",
			"B": "Permite utilizar librerías como leaflet con relativamente pocas líneas de código.",
			"C": "Solo soporta mapas estáticos.",
			"D": "No tiene capacidades para crear mapas."
		},
		"correctAnswer": "B",
		"explanation": "El texto afirma que 'Shiny facilita la creación de mapas interactivos utilizando librerías como leaflet dentro de R con relativamente pocas líneas de código'."
	},
	{
		"question": "¿Qué tecnología se menciona como una forma de simplificar la implementación de aplicaciones Shiny al no requerir la instalación de R en el entorno de ejecución?",
		"options": {
			"A": "Máquinas virtuales.",
			"B": "Contenedores Docker.",
			"C": "Servidores FTP.",
			"D": "Bases de datos SQL."
		},
		"correctAnswer": "B",
		"explanation": "El texto indica que 'es posible desplegar aplicaciones Shiny utilizando contenedores Docker, lo que simplifica la implementación al no requerir la instalación de R en el entorno de ejecución'."
	},
	{
		"question": "¿A qué servidor se pueden subir por defecto las aplicaciones Shiny, facilitando su publicación?",
		"options": {
			"A": "GitHub Pages.",
			"B": "Google Drive.",
			"C": "RStudio Connect.",
			"D": "Dropbox."
		},
		"correctAnswer": "C",
		"explanation": "El texto especifica que 'Las aplicaciones Shiny se pueden subir por defecto al servidor de RStudio Connect'."
	},
	{
		"question": "¿Qué librería de R se utiliza para la creación de gráficos, mencionada como punto de partida para este tema?",
		"options": {
			"A": "base.",
			"B": "dplyr.",
			"C": "ggplot2.",
			"D": "tidyr."
		},
		"correctAnswer": "C",
		"explanation": "El texto introduce el tema de gráficos diciendo que 'ggplot2 es una librería de R utilizada para la creación de gráficos'."
	},
	{
		"question": "¿Cuál es la función inicial que se llama para comenzar a crear un gráfico con ggplot2, y qué se especifica en ella?",
		"options": {
			"A": "plot() y se especifica el tipo de gráfico.",
			"B": "create_plot() y se especifica el título.",
			"C": "ggplot() y se especifican los datos y las estéticas.",
			"D": "draw() y se especifican los colores."
		},
		"correctAnswer": "C",
		"explanation": "Según el texto, 'Para comenzar a crear un gráfico con ggplot2, primero se llama a la función ggplot() y se especifican los datos y las estéticas (variables a usar en el gráfico)'."
	},
	{
		"question": "¿Qué operador se utiliza en ggplot2 para añadir más capas al gráfico (como geometrías o elementos de formato)?",
		"options": {
			"A": "|",
			"B": "%>%",
			"C": "+",
			"D": "-"
		},
		"correctAnswer": "C",
		"explanation": "El texto indica que 'Las instrucciones en ggplot2 suelen seguir con el operador + para añadir más capas al gráfico'."
	},
	{
		"question": "¿Qué geometría (`geom_...()`) es adecuada en ggplot2 para visualizar la correlación entre dos variables numéricas?",
		"options": {
			"A": "geom_bar().",
			"B": "geom_point().",
			"C": "geom_line().",
			"D": "geom_histogram()."
		},
		"correctAnswer": "B",
		"explanation": "El texto señala que 'El gráfico de puntos es adecuado para visualizar la correlación entre dos variables, y en ggplot2 se crea con geom_point()'."
	},
	{
		"question": "¿Qué función se utiliza en ggplot2 para añadir texto y contexto a los gráficos, como el título, subtítulo y etiquetas de los ejes?",
		"options": {
			"A": "theme().",
			"B": "annotate().",
			"C": "labs().",
			"D": "text()."
		},
		"correctAnswer": "C",
		"explanation": "El texto explica que 'Para añadir texto y contexto a los gráficos, se utiliza la función labs() para definir el título (title), subtítulo (subtitle) y etiquetas de los ejes (x, y)'."
	},
	{
		"question": "¿Qué función del paquete dplyr se utiliza específicamente para filtrar filas de un data frame según una o varias condiciones?",
		"options": {
			"A": "select().",
			"B": "mutate().",
			"C": "filter().",
			"D": "arrange()."
		},
		"correctAnswer": "C",
		"explanation": "El texto establece claramente que 'La función filter() de dplyr se utiliza para filtrar filas de un data frame según una o varias condiciones'."
	},
	{
		"question": "¿Qué función de dplyr se utiliza para ordenar las filas de un data frame por una o más columnas?",
		"options": {
			"A": "sort().",
			"B": "order().",
			"C": "arrange().",
			"D": "group_by()."
		},
		"correctAnswer": "C",
		"explanation": "Según el texto, 'La función arrange() de dplyr se utiliza para ordenar las filas de un data frame por una o más columnas'."
	},
	{
		"question": "¿Qué función de dplyr se utiliza para encontrar y devolver las filas únicas de un data frame?",
		"options": {
			"A": "unique().",
			"B": "distinct().",
			"C": "summarise().",
			"D": "count()."
		},
		"correctAnswer": "B",
		"explanation": "El texto describe que 'La función distinct() de dplyr encuentra y devuelve las filas únicas de un data frame'."
	},
	{
		"question": "¿Qué función de dplyr se utiliza para añadir nuevas columnas a un data frame o modificar las existentes?",
		"options": {
			"A": "add_column().",
			"B": "create_var().",
			"C": "mutate().",
			"D": "rename()."
		},
		"correctAnswer": "C",
		"explanation": "El texto indica que 'La función mutate() de dplyr añade nuevas columnas a un data frame o modifica las existentes'."
	},
	{
		"question": "¿Qué función de dplyr se utiliza para seleccionar un subconjunto de columnas de un data frame?",
		"options": {
			"A": "filter().",
			"B": "select().",
			"C": "slice().",
			"D": "pull()."
		},
		"correctAnswer": "B",
		"explanation": "Según el texto, 'La función select() de dplyr se utiliza para seleccionar un subconjunto de columnas de un data frame'."
	},
	{
		"question": "¿Qué función de dplyr se utiliza específicamente para cambiar los nombres de las columnas de un data frame?",
		"options": {
			"A": "select() (también puede hacerlo).",
			"B": "rename().",
			"C": "mutate().",
			"D": "arrange()."
		},
		"correctAnswer": "B",
		"explanation": "El texto menciona que 'La función rename() de dplyr se utiliza para cambiar los nombres de las columnas de un data frame', aunque también señala que `select()` puede hacerlo."
	},
	{
		"question": "¿Qué función de dplyr se utiliza para agrupar las filas de un data frame según los valores de una o más columnas, preparando para operaciones a nivel de grupo?",
		"options": {
			"A": "summarise().",
			"B": "arrange().",
			"C": "count().",
			"D": "group_by()."
		},
		"correctAnswer": "D",
		"explanation": "El texto explica que 'La función group_by() de dplyr agrupa las filas de un data frame según los valores de una o más columnas'."
	},
	{
		"question": "¿Qué función de dplyr se utiliza para resumir múltiples valores a un único valor por grupo (o para todo el data frame)?",
		"options": {
			"A": "mutate().",
			"B": "filter().",
			"C": "summarise().",
			"D": "distinct()."
		},
		"correctAnswer": "C",
		"explanation": "El texto describe que 'La función summarise() de dplyr resume múltiples valores a un único valor por grupo... o para todo el data frame'."
	},
	{
		"question": "¿Qué paquete, que forma parte de tidyverse, contiene las funciones `pivot_longer()` y `pivot_wider()` para transformar datos entre formatos ancho y largo?",
		"options": {
			"A": "dplyr.",
			"B": "ggplot2.",
			"C": "readr.",
			"D": "tidyr."
		},
		"correctAnswer": "D",
		"explanation": "El texto menciona que 'La función pivot_longer() de tidyr (que forma parte de tidyverse)' y `pivot_wider()` pertenecen a este paquete."
	},
	{
		"question": "¿Qué función del paquete readr (incluido en tidyverse) se puede utilizar para importar datos directamente desde sitios web en RStudio, proporcionando la URL?",
		"options": {
			"A": "read.csv().",
			"B": "import_web().",
			"C": "read_csv().",
			"D": "get_url()."
		},
		"correctAnswer": "C",
		"explanation": "El texto indica que 'Para importar datos directamente desde sitios web en RStudio, se puede utilizar la función read_csv()... del paquete readr... proporcionando la URL'."
	},
	{
		"question": "¿Qué aspecto del código es fundamental para su claridad y legibilidad, según el texto, y se menciona como clave para lograrla?",
		"options": {
			"A": "El uso exclusivo del operador pipe (%>%).",
			"B": "La reescritura.",
			"C": "Evitar el uso de funciones.",
			"D": "Mantener todo el código en un solo archivo."
		},
		"correctAnswer": "B",
		"explanation": "El texto señala que 'Escribir código claro y legible es fundamental, y la reescritura es clave para lograr claridad'."
	},
	{
		"question": "¿Qué se logra al crear funciones para encapsular código repetitivo, según el texto?",
		"options": {
			"A": "Aumentar la complejidad del código.",
			"B": "Mejorar la organización y reducir errores.",
			"C": "Disminuir la velocidad de ejecución.",
			"D": "Hacer el código más difícil de leer."
		},
		"correctAnswer": "B",
		"explanation": "El texto sugiere que 'Crear funciones para encapsular código repetitivo puede mejorar la organización y reducir errores'."
	},
	{
		"question": "¿Para qué se utilizan las ejecuciones condicionales (`if ... else`) en R?",
		"options": {
			"A": "Para crear bucles.",
			"B": "Para definir funciones.",
			"C": "Para ejecutar diferentes bloques de código según una condición.",
			"D": "Para importar datos."
		},
		"correctAnswer": "C",
		"explanation": "El texto explica que 'Las ejecuciones condicionales (if ... else) en R se utilizan para ejecutar diferentes bloques de código según una condición'."
	},
	{
		"question": "¿Cómose puede agregar una nueva columna a un data frame existente en R, según las opciones mencionadas en el texto?",
		"options": {
			"A": "Solo usando la función `add_column()`.",
			"B": "Directamente asignando valores con el operador `$`, o usando `mutate()` de dplyr.",
			"C": "Mediante la función `summarise()`.",
			"D": "Solo usando el operador pipe (%>%)."
		},
		"correctAnswer": "B",
		"explanation": "El texto indica que 'Para agregar una columna a un data frame existente, se puede hacer directamente asignando valores a una nueva columna usando el operador $, o utilizando funciones como mutate() de dplyr'."
	},
	{
		"question": "¿Qué sucede si se asigna `NULL` a una columna existente en un data frame en R?",
		"options": {
			"A": "Se llena la columna con valores faltantes (NA).",
			"B": "Se renombra la columna a 'NULL'.",
			"C": "Se elimina la columna.",
			"D": "Se convierte la columna a tipo lógico."
		},
		"correctAnswer": "C",
		"explanation": "El texto menciona que 'Asignar NULL a una columna existente la elimina'."
	}
];
