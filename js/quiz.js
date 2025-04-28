// Importar los datos de las preguntas desde el archivo questions.js
import { originalQuizData } from './questions.js';

// Variables globales para el estado del quiz
let shuffledQuizData = []; // Array para almacenar las preguntas aleatorizadas para la sesión actual
let currentQuestionIndex = 0; // Índice de la pregunta actual (pregunta actual que se está mostrando)
let score = 0; // Puntaje del usuario (solo correctas)
let attemptedQuestionsCount = 0; // Contador de preguntas que han sido intentadas (respondidas o tiempo agotado)

let timerInterval; // Variable para almacenar el intervalo del temporizador
let totalQuizTime = 60; // Tiempo total en segundos para todo el quiz (configurable)
let numberOfQuestions = 10; // Cantidad de preguntas a mostrar (configurable)
let timeLeft = totalQuizTime; // Tiempo restante total del quiz
let quizActive = false; // Bandera para saber si el quiz está activo (inicia inactivo)

const SESSIONS_TO_SHOW_INITIALLY = 10; // Número de sesiones a mostrar inicialmente
let showingAllSessions = false; // Bandera para saber si se están mostrando todas las sesiones

// Referencias a elementos del DOM (se obtienen en window.onload)
let questionTextElement;
let optionsAreaElement;
let submitButton;
let nextButton;
let restartButton;
let feedbackAreaElement;
// Eliminamos las referencias a los botones de puntaje individuales aquí,
// ya que el contenedor score-area se ocultará y se creará uno nuevo en la pantalla final.
// let scoreAttemptedButton; // Botón para Intentadas
// let scoreCorrectButton;   // Botón para Correctas
// let scoreIncorrectButton; // Botón para Incorrectas
let timerAreaElement;
let quizContentElement;
let endScreenElement;
let scoreContainerElement; // Contenedor de los botones de puntaje principal
let darkModeToggle; // Botón de modo oscuro
let sessionHistoryList; // Lista para el historial de sesiones
let clearHistoryButton; // Botón para borrar historial
let progressChartContainer; // Contenedor del gráfico de progreso
let progressChartElement; // Elemento donde se dibuja el gráfico
let tabButtons; // Botones de pestaña
let tabContents; // Contenido de las pestañas
let downloadCsvButton; // Botón de descarga CSV
let numQuestionsInput; // Input para número de preguntas
let quizTimeInput; // Input para tiempo del quiz
let startQuizButton; // Botón para iniciar quiz desde config
let showMoreSessionsButton; // Nuevo botón para mostrar más sesiones

// Referencias a elementos del mensaje personalizado
let customMessageOverlay;
let messageTitleElement;
let messageTextElement;
let messageOkButton;


// Función para mostrar el mensaje personalizado
function showCustomMessage(title, message) {
	if (customMessageOverlay && messageTitleElement && messageTextElement && messageOkButton) {
		messageTitleElement.textContent = title;
		messageTextElement.textContent = message;
		customMessageOverlay.classList.remove('hidden');
	} else {
		// Fallback a alert si los elementos no están disponibles (no debería pasar después de window.onload)
		alert(`${title}\n\n${message}`);
	}
}

// Función para ocultar el mensaje personalizado
function hideCustomMessage() {
	if (customMessageOverlay) {
		customMessageOverlay.classList.add('hidden');
	}
}


// Función para mezclar un array (Algoritmo Fisher-Yates (Knuth) Shuffle)
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Intercambiar elementos
	}
	return array;
}

// Función para mezclar las opciones de un objeto de opciones
function shuffleOptions(optionsObject) {
	const optionKeys = Object.keys(optionsObject);
	shuffleArray(optionKeys); // Mezclar las claves (A, B, C, D)
	const shuffledOptions = {};
	optionKeys.forEach(key => {
		shuffledOptions[key] = optionsObject[key]; // Reconstruir el objeto con el orden mezclado
	});
	return shuffledOptions;
}


// Función para iniciar el temporizador global del quiz
function startGlobalTimer() {
	timeLeft = totalQuizTime; // Reiniciar tiempo total con el valor configurado
	timerAreaElement.textContent = `Tiempo restante: ${timeLeft}s`; // Mostrar tiempo inicial

	// Limpiar cualquier temporizador existente antes de iniciar uno nuevo
	if (timerInterval) {
		clearInterval(timerInterval);
	}

	timerInterval = setInterval(() => {
		timeLeft--;
		timerAreaElement.textContent = `Tiempo restante: ${timeLeft}s`;

		if (timeLeft <= 0) {
			clearInterval(timerInterval); // Detener el temporizador
			endQuiz(true); // Finalizar el quiz porque el tiempo se agotó
		}
	}, 1000); // Actualizar cada 1 segundo
}

// Función para detener el temporizador
function stopTimer() {
	clearInterval(timerInterval);
}

// Función para cargar y mostrar la pregunta actual
function loadQuestion() {
	if (!quizActive) return; // No cargar pregunta si el quiz no está activo

	// Limpiar área de opciones y feedback
	optionsAreaElement.innerHTML = '';
	feedbackAreaElement.innerHTML = '';
	feedbackAreaElement.classList.add('hidden'); // Ocultar feedback
	feedbackAreaElement.classList.remove('correct', 'incorrect', 'warning'); // Limpiar clases de feedback

	// Asegurarse de que el contenido del quiz esté visible y la pantalla final oculta
	quizContentElement.classList.remove('hidden');
	endScreenElement.classList.add('hidden');
	timerAreaElement.classList.remove('hidden'); // Asegurarse de que el temporizador sea visible
	scoreContainerElement.classList.remove('hidden'); // Asegurarse de que el contenedor de puntaje principal sea visible
	progressChartContainer.classList.add('hidden'); // Ocultar el gráfico de progreso


	// Deseleccionar cualquier radio button previamente seleccionado
	const selectedRadio = optionsAreaElement.querySelector('input[name="answer"]:checked');
	if (selectedRadio) {
		selectedRadio.checked = false;
	}


	// Obtener la pregunta actual del array de preguntas aleatorizadas
	// Asegurarse de no exceder el número de preguntas configurado
	if (currentQuestionIndex >= numberOfQuestions || currentQuestionIndex >= shuffledQuizData.length) {
		endQuiz(false); // Finalizar si ya se mostraron todas las preguntas configuradas o disponibles
		return;
	}

	const currentQuestion = shuffledQuizData[currentQuestionIndex];

	// Mostrar el texto de la pregunta
	questionTextElement.textContent = currentQuestion.question;

	// Mezclar las opciones de la pregunta actual
	const shuffledOptions = shuffleOptions(currentQuestion.options);

	// Crear y mostrar las opciones de respuesta mezcladas
	for (const optionKey in shuffledOptions) {
		if (shuffledOptions.hasOwnProperty(optionKey)) {
			const optionValue = shuffledOptions[optionKey];

			// Crear un div para cada opción para mejor estructura y padding
			const optionDiv = document.createElement('div');

			const input = document.createElement('input');
			input.type = 'radio';
			input.name = 'answer'; // Mismo nombre para que solo una opción sea seleccionable
			input.value = optionKey;
			input.id = `option-${optionKey}`; // ID único para la etiqueta

			const label = document.createElement('label');
			// Eliminar la letra indicadora (A, B, C, D) del texto de la opción
			label.textContent = `${optionValue}`; // Mostrar solo el valor de la opción
			label.htmlFor = `option-${optionKey}`; // Asociar etiqueta con input

			// Añadir input y label al div de la opción
			optionDiv.appendChild(input);
			optionDiv.appendChild(label);

			// Añadir el div de la opción al área de opciones
			optionsAreaElement.appendChild(optionDiv);
		}
	}

	// Habilitar las opciones de respuesta *después* de que se han añadido al DOM
	enableOptions();


	// Mostrar el botón de responder y ocultar el de siguiente
	submitButton.classList.remove('hidden');
	nextButton.classList.add('hidden');

	// Habilitar el botón de responder
	submitButton.disabled = false;

	// Actualizar la visualización del puntaje (Intentadas, Correctas, Incorrectas) en el contenedor principal
	updateScoreDisplay();

	// Deshabilitar opciones si el tiempo se agotó (aunque endQuiz debería manejar esto)
	if (timeLeft <= 0) {
		disableOptions();
		submitButton.disabled = true;
	}
}

// Función para deshabilitar las opciones de respuesta
function disableOptions() {
	const options = optionsAreaElement.querySelectorAll('input[name="answer"]');
	options.forEach(option => {
		option.disabled = true;
	});
}

// Función para habilitar las opciones de respuesta
function enableOptions() {
	const options = optionsAreaElement.querySelectorAll('input[name="answer"]');
	options.forEach(option => {
		option.disabled = false;
	});
}


// Función para verificar la respuesta seleccionada
function checkAnswer() {
	if (!quizActive) return; // No procesar respuesta si el quiz no está activo

	// Obtener la opción seleccionada por el usuario
	const selectedOption = document.querySelector('input[name="answer"]:checked');

	// Si no se seleccionó ninguna opción, mostrar un mensaje y no continuar
	if (!selectedOption) {
		feedbackAreaElement.classList.remove('hidden');
		feedbackAreaElement.classList.remove('correct', 'incorrect'); // Limpiar clases
		feedbackAreaElement.classList.add('warning'); // Usar la clase warning para este tipo de mensaje
		feedbackAreaElement.innerHTML = '<strong>Por favor, selecciona una opción antes de responder.</strong>';
		return; // Salir de la función si no hay selección
	}

	// Deshabilitar el botón de responder para evitar múltiples envíos
	submitButton.disabled = true;
	disableOptions(); // Deshabilitar opciones después de responder

	let userAnswer = selectedOption.value;


	// Obtener la respuesta correcta de la pregunta actual (del array mezclado)
	const correctAnswer = shuffledQuizData[currentQuestionIndex].correctAnswer;
	const explanation = shuffledQuizData[currentQuestionIndex].explanation;

	// Mostrar el área de feedback
	feedbackAreaElement.classList.remove('hidden');

	// Limpiar clases de feedback previas
	feedbackAreaElement.classList.remove('correct', 'incorrect', 'warning');

	// Comprobar si la respuesta es correcta
	if (userAnswer === correctAnswer) {
		score++; // Incrementar puntaje si es correcta
		feedbackAreaElement.classList.add('correct');
		feedbackAreaElement.innerHTML = '<strong>¡Correcto!</strong>';
	} else {
		feedbackAreaElement.classList.add('incorrect');
		// Modificado: Mostrar la respuesta correcta sin la letra indicadora
		const correctAnswerText = shuffledQuizData[currentQuestionIndex].options[correctAnswer];
		feedbackAreaElement.innerHTML = `<strong>Incorrecto.</strong> La respuesta correcta es: ${correctAnswerText}.`;
	}

	// Añadir la explicación al feedback
	const explanationElement = document.createElement('p');
	explanationElement.classList.add('explanation');
	explanationElement.textContent = explanation;
	feedbackAreaElement.appendChild(explanationElement);

	attemptedQuestionsCount++; // Incrementar el contador de preguntas intentadas *después* de procesar la respuesta

	// Ocultar el botón de responder y mostrar el de siguiente
	submitButton.classList.add('hidden');
	// Solo mostrar el botón siguiente si el tiempo no se ha agotó o si ya se respondieron todas las preguntas configuradas
	if (timeLeft > 0 && attemptedQuestionsCount < numberOfQuestions && currentQuestionIndex < shuffledQuizData.length - 1) {
		nextButton.classList.remove('hidden');
	} else {
		// Si el tiempo se agotó o ya se respondieron todas las preguntas configuradas, finalizar el quiz
		endQuiz(timeLeft <= 0);
	}


	// Actualizar la visualización del puntaje (después de incrementar el score si fue correcta)
	updateScoreDisplay();
}

// Función para pasar a la siguiente pregunta o finalizar el quiz
function nextQuestion() {
	if (!quizActive) return; // No pasar de pregunta si el quiz no está activo

	currentQuestionIndex++; // Incrementar el índice de la pregunta mostrada

	// Verificar si hay más preguntas (en el array mezclado, hasta el límite configurado) y si el tiempo no se ha agotado
	if (currentQuestionIndex < numberOfQuestions && currentQuestionIndex < shuffledQuizData.length && timeLeft > 0) {
		loadQuestion(); // Cargar la siguiente pregunta
	} else {
		endQuiz(false); // Finalizar el quiz (ya sea por terminar preguntas o por tiempo agotado)
	}
}

// Función para actualizar la visualización del puntaje en el contenedor principal
function updateScoreDisplay() {
	const correct = score;
	const incorrect = attemptedQuestionsCount - correct; // Usar el contador de intentadas

	// Asegurarse de que los elementos existan antes de intentar actualizar su contenido
	// Esto es crucial si updateScoreDisplay se llama antes de que window.onload complete
	if (scoreContainerElement) {
		// Limpiar el contenido actual para evitar duplicados si se llama varias veces
		scoreContainerElement.innerHTML = '';

		// Crear y añadir los botones de puntaje si no existen
		const attemptedButton = document.createElement('span');
		attemptedButton.classList.add('score-button', 'attempted');
		attemptedButton.textContent = `Preguntas: ${attemptedQuestionsCount}`;
		scoreContainerElement.appendChild(attemptedButton);

		const correctButton = document.createElement('span');
		correctButton.classList.add('score-button', 'correct');
		correctButton.textContent = `Correctas: ${correct}`;
		scoreContainerElement.appendChild(correctButton);

		const incorrectButton = document.createElement('span');
		incorrectButton.classList.add('score-button', 'incorrect');
		incorrectButton.textContent = `Incorrectas: ${incorrect}`;
		scoreContainerElement.appendChild(incorrectButton);
	}
}


// Función para finalizar el quiz
function endQuiz(timeRanOut) {
	if (!quizActive) return; // Evitar finalizar múltiples veces
	quizActive = false; // Marcar el quiz como inactivo

	// Detener el temporizador final
	stopTimer();
	timerAreaElement.classList.add('hidden'); // Ocultar el temporizador al finalizar

	// Ocultar explícitamente el contenedor principal de puntaje
	scoreContainerElement.classList.add('hidden');

	// Ocultar el contenido del quiz
	quizContentElement.classList.add('hidden');


	// Mostrar la pantalla final
	endScreenElement.classList.remove('hidden');

	// Mostrar mensaje de fin de quiz
	const endTitle = document.createElement('h2');
	endTitle.classList.add('text-xl', 'font-bold', 'text-center', 'text-gray-800', 'mb-4');
	if (timeRanOut) {
		endTitle.textContent = '¡Tiempo agotado!';
	} else {
		endTitle.textContent = '¡Entrenamiento Finalizado!'; // Cambiar texto
	}

	// Calcular el puntaje final detallado (usando el contador de intentadas)
	const totalAttempted = attemptedQuestionsCount;
	const finalCorrect = score;
	const finalIncorrect = totalAttempted - finalCorrect;


	// Determinar el mensaje basado en el puntaje
	let scoreMessageText = "";
	if (finalCorrect < 3) {
		scoreMessageText = "Sigue repasando el contenido, cada intento puedes mejorar.";
	} else if (finalCorrect >= 3 && finalCorrect < 5) {
		scoreMessageText = "¡Bien! Estás avanzando por el camino de R, sigue repasando.";
	} else { // finalCorrect >= 5
		scoreMessageText = "¡Sigue así! Estás aprendiendo a trabajar con R.";
	}

	const scoreMessageElement = document.createElement('p');
	scoreMessageElement.classList.add('end-message', 'text-center');
	scoreMessageElement.textContent = scoreMessageText;

	// Crear un nuevo contenedor para los botones de puntaje finales
	const finalScoreContainer = document.createElement('div');
	finalScoreContainer.classList.add('score-container'); // Reutilizar la clase de estilo


	// Crear y añadir los botones de puntaje finales
	const finalAttemptedButton = document.createElement('span');
	finalAttemptedButton.classList.add('score-button', 'attempted');
	finalAttemptedButton.textContent = `Intentos: ${totalAttempted}`;
	finalScoreContainer.appendChild(finalAttemptedButton);

	const finalCorrectButton = document.createElement('span');
	finalCorrectButton.classList.add('score-button', 'correct');
	finalCorrectButton.textContent = `Correctas: ${finalCorrect}`;
	finalScoreContainer.appendChild(finalCorrectButton);

	const finalIncorrectButton = document.createElement('span');
	finalIncorrectButton.classList.add('score-button', 'incorrect');
	finalIncorrectButton.textContent = `Incorrectas: ${finalIncorrect}`;
	finalScoreContainer.appendChild(finalIncorrectButton);


	// Limpiar el contenido anterior de la pantalla final y añadir los nuevos elementos
	endScreenElement.innerHTML = '';
	endScreenElement.appendChild(endTitle);
	endScreenElement.appendChild(finalScoreContainer); // Añadir el contenedor de botones de puntaje finales
	endScreenElement.appendChild(scoreMessageElement); // Añadir el mensaje basado en el puntaje

	// --- Agregar la sección de resumen de preguntas respondidas ---
	const summarySection = document.createElement('div');
	summarySection.classList.add('summary-section');

	const summaryTitle = document.createElement('h3');
	summaryTitle.textContent = 'Resumen de Preguntas Respondidas';
	summarySection.appendChild(summaryTitle);

	// Iterar sobre el número de preguntas intentadas (attemptedQuestionsCount)
	for (let i = 0; i < attemptedQuestionsCount; i++) {
		// Asegurarse de que el índice i sea válido para shuffledQuizData
		if (i < shuffledQuizData.length) {
			const questionData = shuffledQuizData[i]; // Obtener la pregunta del array mezclado

			const summaryItem = document.createElement('div');
			summaryItem.classList.add('summary-item');

			const questionText = document.createElement('p');
			questionText.innerHTML = `<strong>Pregunta ${i + 1}:</strong> ${questionData.question}`; // Usar i+1 para el número de pregunta en el resumen
			summaryItem.appendChild(questionText);

			const correctAnswerElement = document.createElement('p');
			// Encontrar el texto de la respuesta correcta usando la clave
			const correctAnswerText = questionData.options[questionData.correctAnswer];
			// Mostrar solo el texto de la respuesta correcta sin la letra indicadora
			correctAnswerElement.innerHTML = `<span class="correct-answer">Respuesta Correcta: ${correctAnswerText}</span>`;
			summaryItem.appendChild(correctAnswerElement);

			const explanationElement = document.createElement('p');
			explanationElement.classList.add('explanation');
			explanationElement.textContent = `Explicación: ${questionData.explanation}`;
			summaryItem.appendChild(explanationElement);

			summarySection.appendChild(summaryItem);
		}
	}


	// Añadir la sección de resumen a la pantalla final
	endScreenElement.appendChild(summarySection);
	// --- Fin de la sección de resumen ---


	// Mostrar el botón de reiniciar
	restartButton.classList.remove('hidden');
	// Añadir el botón de reiniciar a la pantalla final
	endScreenElement.appendChild(restartButton);

	// Guardar el resultado de la sesión en localStorage
	saveSessionResult({
		attempted: totalAttempted,
		correct: finalCorrect,
		incorrect: finalIncorrect,
		timestamp: new Date().toISOString() // Opcional: guardar la hora del intento
	});

	// Enviar datos al backend (solo esqueleto)
	sendResultToBackend({
		attempted: totalAttempted,
		correct: finalCorrect,
		incorrect: finalIncorrect,
		timestamp: new Date().toISOString(),
		quizId: 'r_markdown_shiny_quiz' // Identificador del quiz
	});
}

// Función para guardar el resultado de la sesión en localStorage
function saveSessionResult(result) {
	const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
	results.push(result);
	localStorage.setItem('quizResults', JSON.stringify(results));
	displaySessionHistory(); // Actualizar la visualización del historial
}

// Función para cargar y mostrar el historial de sesiones
function displaySessionHistory() {
	const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
	sessionHistoryList.innerHTML = ''; // Limpiar la lista actual

	if (results.length === 0) {
		sessionHistoryList.innerHTML = '<p class="text-center text-gray-500">Aún no hay intentos en esta sesión.</p>';
		// Ocultar el gráfico si no hay historial
		progressChartContainer.classList.add('hidden');
		// Ocultar el botón "Mostrar Más" si no hay historial
		if (showMoreSessionsButton) {
			showMoreSessionsButton.classList.add('hidden');
		}
		return;
	}

	// Determinar cuántas sesiones mostrar
	const sessionsToShow = showingAllSessions ? results.length : Math.min(results.length, SESSIONS_TO_SHOW_INITIALLY);

	// Mostrar las sesiones
	for (let i = 0; i < sessionsToShow; i++) {
		const result = results[i];
		const sessionItem = document.createElement('div');
		sessionItem.classList.add('session-item');
		sessionItem.innerHTML = `
                 <p><strong>Prueba ${i + 1}:</strong></p>
                 <p class="score-detail">Preguntas: ${result.attempted}, Correctas: ${result.correct}, Incorrectas: ${result.incorrect}</p>
                 ${result.timestamp ? `<p class="score-detail">Hora: ${new Date(result.timestamp).toLocaleString()}</p>` : ''}
             `;
		sessionHistoryList.appendChild(sessionItem);
	}

	// Mostrar u ocultar el botón "Mostrar Más"
	if (results.length > SESSIONS_TO_SHOW_INITIALLY && !showingAllSessions) {
		if (showMoreSessionsButton) {
			showMoreSessionsButton.textContent = `Mostrar más (${results.length - SESSIONS_TO_SHOW_INITIALLY} intentos más)`;
			showMoreSessionsButton.classList.remove('hidden');
			// Asegurarse de que el botón esté después de la lista
			sessionHistoryList.parentNode.insertBefore(showMoreSessionsButton, sessionHistoryList.nextSibling);
		}
	} else {
		if (showMoreSessionsButton) {
			showMoreSessionsButton.classList.add('hidden');
		}
	}


	// Mostrar el gráfico si hay historial
	progressChartContainer.classList.remove('hidden');
	drawProgressChart(); // Dibujar el gráfico con los datos del historial
}

// Función para borrar el historial de sesiones
function clearSessionHistory() {
	localStorage.removeItem('quizResults');
	showingAllSessions = false; // Reiniciar la bandera al borrar historial
	displaySessionHistory(); // Actualizar la visualización (mostrará el mensaje de "Aún no hay intentos")
}

// Función para descargar el historial como archivo CSV
function downloadCSV() {
	const results = JSON.parse(localStorage.getItem('quizResults') || '[]');

	if (results.length === 0) {
		showCustomMessage("Atención!", "No hay historial para descargar.");
		return;
	}

	// Crear el encabezado del CSV
	const headers = ["Prueba", "Preguntas", "Correctas", "Incorrectas", "Hora"];
	let csvContent = headers.join(",") + "\n";

	// Añadir los datos de cada intento
	results.forEach((result, index) => {
		const row = [
			index + 1,
			result.attempted,
			result.correct,
			result.incorrect,
			result.timestamp ? new Date(result.timestamp).toLocaleString() : '' // Formatear la hora
		];
		csvContent += row.join(",") + "\n";
	});

	// Crear un Blob con el contenido CSV
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

	// Crear un enlace de descarga
	const link = document.createElement('a');
	if (link.download !== undefined) { // Verificar si el atributo download es soportado
		const url = URL.createObjectURL(blob);
		link.setAttribute('href', url);
		link.setAttribute('download', 'historial_entrenamiento_r.csv');
		link.style.visibility = 'hidden';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	} else {
		// Fallback para navegadores que no soportan el atributo download
		showCustomMessage("Atención!", "Tu navegador no soporta la descarga automática. Copia el siguiente texto:\n\n" + csvContent);
	}
}


// Función placeholder para enviar datos al backend
function sendResultToBackend(resultData) {
	// ** ESTO ES SOLO UN ESQUELETO **
	// Para que esto funcione, necesitas un servidor backend configurado
	// para recibir peticiones POST en la URL especificada.
	const backendUrl = 'TU_URL_DEL_BACKEND_PARA_GUARDAR_RESULTADOS'; // <<< Reemplaza con tu URL real

	console.log('Intentando enviar datos al backend:', resultData); // Log para depuración

	// Descomenta el siguiente bloque para intentar enviar datos (requiere backend)
	/*
	fetch(backendUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(resultData),
	})
	.then(response => {
		if (!response.ok) {
			console.error('Error al enviar datos al backend:', response.statusText);
		}
		return response.json();
	})
	.then(data => {
		console.log('Respuesta del backend:', data);
	})
	.catch((error) => {
		console.error('Error en la conexión con el backend:', error);
	});
	*/
}

// Función para dibujar el gráfico de progreso usando D3.js (Línea y Punto)
function drawProgressChart() {
	const results = JSON.parse(localStorage.getItem('quizResults') || '[]');
	progressChartElement.innerHTML = ''; // Limpiar el área del gráfico anterior

	if (results.length === 0) {
		// No dibujar gráfico si no hay datos
		return;
	}

	const data = results.map((r, i) => ({
		attempt: i + 1,
		correct: r.correct,
		incorrect: r.incorrect
	}));

	const margin = { top: 20, right: 20, bottom: 30, left: 40 };
	const width = 600 - margin.left - margin.right;
	const height = 300 - margin.top - margin.bottom;

	// Seleccionar el contenedor y añadir el SVG
	const svg = d3.select("#progress-chart").append("svg")
		.attr("width", "100%") // Usar ancho relativo
		.attr("height", height + margin.top + margin.bottom)
		.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`) // Añadir viewBox para responsividad
		.attr("preserveAspectRatio", "xMidYMid meet") // Mantener aspecto
		.append("g")
		.attr("transform", `translate(${margin.left},${margin.top})`);

	// Escalas
	const xScale = d3.scaleLinear() // Escala lineal para el eje X (intentos)
		.range([0, width])
		// Dominio del eje X debe ir desde 0 hasta el número máximo de intentos
		.domain([0, d3.max(data, d => d.attempt)]);

	const yScale = d3.scaleLinear()
		.range([height, 0])
		// Dominio del eje Y debe ir desde 0 hasta el número máximo de respuestas (correctas + incorrectas)
		.domain([0, d3.max(data, d => d.correct + d.incorrect)]);

	// Eje X (con formato para mostrar números enteros de intentos)
	svg.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", `translate(0,${height})`)
		// Usar tickValues para controlar las etiquetas y asegurar que aparezcan los enteros relevantes
		.call(d3.axisBottom(xScale).tickValues(d3.range(0, d3.max(data, d => d.attempt) + 1)).tickFormat(d3.format("d")));

	// Eje Y (con formato para mostrar números enteros)
	svg.append("g")
		.attr("class", "axis axis--y")
		// Usar tickValues para controlar las etiquetas y asegurar que aparezcan los enteros relevantes
		.call(d3.axisLeft(yScale).tickValues(d3.range(0, d3.max(data, d => d.correct + d.incorrect) + 1)).tickFormat(d3.format("d")));


	// Definir las líneas
	const lineCorrect = d3.line()
		.x(d => xScale(d.attempt))
		.y(d => yScale(d.correct));

	const lineIncorrect = d3.line()
		.x(d => xScale(d.attempt))
		.y(d => yScale(d.incorrect));

	// Añadir la línea de correctas
	svg.append("path")
		.data([data])
		.attr("class", "line-correct")
		.attr("d", lineCorrect);

	// Añadir los puntos para correctas
	svg.selectAll(".dot-correct")
		.data(data)
		.enter().append("circle")
		.attr("class", "dot dot-correct")
		.attr("cx", d => xScale(d.attempt))
		.attr("cy", d => yScale(d.correct))
		.attr("r", 4) // Radio del punto
		.style("fill", "#4caf50") // Color del punto (verde)
		.style("stroke", "white"); // Borde blanco

	// Añadir la línea de incorrectas
	svg.append("path")
		.data([data])
		.attr("class", "line-incorrect")
		.attr("d", lineIncorrect);

	// Añadir los puntos para incorrectas
	svg.selectAll(".dot-incorrect")
		.data(data)
		.enter().append("circle")
		.attr("class", "dot dot-incorrect")
		.attr("cx", d => xScale(d.attempt))
		.attr("cy", d => yScale(d.incorrect))
		.attr("r", 4) // Radio del punto
		.style("fill", "#ff9800") // Color del punto (naranja)
		.style("stroke", "white"); // Borde blanco


	// --- Añadir Leyenda ---
	const legend = svg.append("g")
		.attr("font-family", "sans-serif")
		.attr("font-size", 10)
		.attr("text-anchor", "start") // Alinear texto al inicio
		.selectAll("g")
		.data([{ color: "#4caf50", text: "Correctas" }, { color: "#ff9800", text: "Incorrectas" }]) // Datos para la leyenda
		.enter().append("g")
		.attr("transform", (d, i) => `translate(10, ${i * 20})`); // Posicionar cada item de la leyenda

	legend.append("rect")
		.attr("x", width - 100) // Posición X del cuadrado de color (ajustar según necesidad)
		.attr("width", 19)
		.attr("height", 19)
		.attr("fill", d => d.color);

	legend.append("text")
		.attr("x", width - 75) // Posición X del texto (ajustar según necesidad)
		.attr("y", 9.5)
		.attr("dy", "0.32em")
		.text(d => d.text);
	// --- Fin de Leyenda ---


	// Ajustar el tamaño del SVG para que sea responsivo (básico)
	// No es necesario redibujar todo en redimensionamiento si se usa viewBox y preserveAspectRatio
	// d3.select(window).on('resize', () => {
	//     drawProgressChart();
	// });
}


// Función para cambiar de pestaña
function changeTab(tabId) {
	// Ocultar todo el contenido de las pestañas
	tabContents.forEach(content => {
		content.classList.remove('active');
	});

	// Desactivar todos los botones de pestaña
	tabButtons.forEach(button => {
		button.classList.remove('active');
	});

	// Mostrar el contenido de la pestaña seleccionada
	document.getElementById(tabId).classList.add('active');

	// Activar el botón de la pestaña seleccionada
	document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add('active');

	// Si la pestaña de progreso está activa, dibujar el gráfico y mostrar historial limitado
	if (tabId === 'progress-tab') {
		showingAllSessions = false; // Al cambiar a la pestaña, mostrar solo las primeras 10
		displaySessionHistory();
		drawProgressChart();
	}
}

// Función para iniciar un nuevo quiz con la configuración actual
function startNewQuiz() {
	// Leer los valores de configuración
	const requestedQuestions = parseInt(numQuestionsInput.value, 10);
	const requestedTime = parseInt(quizTimeInput.value, 10);

	// Validar los valores de configuración
	if (isNaN(requestedQuestions) || requestedQuestions < 1 || requestedQuestions > originalQuizData.length) {
		showCustomMessage("Atención!", `Por favor, ingresa un número de preguntas válido entre 1 y ${originalQuizData.length}.`);
		return;
	}
	if (isNaN(requestedTime) || requestedTime < 10 || requestedTime > 300) { // Mínimo 10s, Máximo 300s (5 minutos)
		showCustomMessage("Atención!", "Por favor, ingresa un tiempo válido entre 10 y 300 segundos (5 minutos).");
		return;
	}

	// Aplicar la configuración y guardarla en localStorage
	numberOfQuestions = requestedQuestions;
	totalQuizTime = requestedTime;
	localStorage.setItem('quizConfig', JSON.stringify({ numberOfQuestions, totalQuizTime }));


	// Reiniciar el estado del quiz
	currentQuestionIndex = 0;
	score = 0;
	quizActive = true;
	attemptedQuestionsCount = 0; // Reiniciar contador de intentadas


	// Mezclar las preguntas (solo el número configurado)
	shuffledQuizData = shuffleArray([...originalQuizData]).slice(0, numberOfQuestions);

	// Reiniciar la visualización del puntaje en el contenedor principal
	updateScoreDisplay();
	scoreContainerElement.classList.remove('hidden'); // Asegurarse de que el contenedor principal sea visible al inicio


	// Ocultar pantalla final y mostrar contenido del quiz
	endScreenElement.classList.add('hidden');
	quizContentElement.classList.remove('hidden');
	progressChartContainer.classList.add('hidden'); // Ocultar gráfico

	// Iniciar temporizador y cargar primera pregunta
	startGlobalTimer();
	loadQuestion();

	// Cambiar a la pestaña de Entrenamiento
	changeTab('quiz-tab');

	console.log(`Quiz iniciado con ${numberOfQuestions} preguntas y ${totalQuizTime} segundos.`);
}


// Función para reiniciar el quiz desde la pantalla final o el botón Reiniciar
function restartQuiz() {
	console.log("Reiniciando quiz..."); // Log de depuración

	// Usar la configuración guardada en localStorage o los valores por defecto
	const savedConfig = JSON.parse(localStorage.getItem('quizConfig'));
	if (savedConfig) {
		numberOfQuestions = savedConfig.numberOfQuestions;
		totalQuizTime = savedConfig.totalQuizTime;
	} else {
		// Si no hay configuración guardada, usar los valores por defecto de los inputs
		// Esto es importante para el primer reinicio si nunca se usó "Iniciar Entrenamiento"
		numberOfQuestions = parseInt(numQuestionsInput.value, 10);
		totalQuizTime = parseInt(quizTimeInput.value, 10);
	}

	currentQuestionIndex = 0; // Reiniciar índice de pregunta
	score = 0; // Reiniciar puntaje
	quizActive = true; // Marcar el quiz como activo
	attemptedQuestionsCount = 0; // Reiniciar contador de intentadas


	// Mezclar las preguntas nuevamente al reiniciar (usando el número configurado)
	shuffledQuizData = shuffleArray([...originalQuizData]).slice(0, numberOfQuestions);

	// Reiniciar la visualización del puntaje en el contenedor principal antes de cargar la primera pregunta
	updateScoreDisplay();
	scoreContainerElement.classList.remove('hidden'); // Asegurarse de que el contenedor principal sea visible al reiniciar


	// Asegurarse de que el botón de responder esté visible y los de siguiente/reiniciar ocultos
	submitButton.classList.remove('hidden');
	nextButton.classList.add('hidden');
	restartButton.classList.add('hidden'); // Asegurarse de que el botón de reiniciar esté oculto

	// Ocultar pantalla final y mostrar contenido del quiz
	endScreenElement.classList.add('hidden');
	quizContentElement.classList.remove('hidden');
	progressChartContainer.classList.add('hidden'); // Ocultar el gráfico al reiniciar

	// Iniciar temporizador y cargar primera pregunta
	startGlobalTimer();
	loadQuestion(); // loadQuestion() ahora llama a enableOptions() después de crear los elementos

	// Cambiar a la pestaña de Entrenamiento
	changeTab('quiz-tab');
	console.log("Quiz reiniciado."); // Log de depuración
}


// Función para alternar el modo oscuro
function toggleDarkMode() {
	document.body.classList.toggle('dark-mode');
	// Opcional: guardar la preferencia en localStorage para que persista
	if (document.body.classList.contains('dark-mode')) {
		localStorage.setItem('darkMode', 'enabled');
	} else {
		localStorage.setItem('darkMode', 'disabled');
	}
	// Redibujar el gráfico para aplicar estilos de modo oscuro si está visible
	if (!progressChartContainer.classList.contains('hidden')) {
		drawProgressChart();
	}
}

// Función para mostrar todas las sesiones del historial
function showAllSessions() {
	showingAllSessions = true;
	displaySessionHistory(); // Volver a dibujar el historial, esta vez completo
}


// Este código se ejecutará una vez que toda la página HTML esté completamente cargada
window.onload = () => {
	// Obtener referencias a los elementos del DOM
	questionTextElement = document.getElementById('question-text');
	optionsAreaElement = document.getElementById('options-area');
	submitButton = document.getElementById('submit-answer');
	nextButton = document.getElementById('next-question');
	restartButton = document.getElementById('restart-quiz'); // Obtener referencia al botón de reiniciar
	feedbackAreaElement = document.getElementById('feedback-area');
	scoreContainerElement = document.getElementById('score-area'); // Referencia al contenedor principal
	timerAreaElement = document.getElementById('timer-area');
	quizContentElement = document.getElementById('quiz-content');
	endScreenElement = document.getElementById('end-screen');
	darkModeToggle = document.getElementById('dark-mode-toggle'); // Referencia al botón de modo oscuro
	sessionHistoryList = document.getElementById('session-history-list'); // Referencia a la lista del historial
	clearHistoryButton = document.getElementById('clear-history-button'); // Referencia al botón de borrar historial
	progressChartContainer = document.querySelector('.progress-chart-container'); // Referencia al contenedor del gráfico
	progressChartElement = document.getElementById('progress-chart'); // Referencia al elemento donde dibujar el gráfico
	tabButtons = document.querySelectorAll('.tab-button'); // Referencia a los botones de pestaña
	tabContents = document.querySelectorAll('.tab-content'); // Referencia al contenido de las pestañas
	downloadCsvButton = document.getElementById('download-csv-button'); // Referencia al botón de descarga CSV
	numQuestionsInput = document.getElementById('num-questions'); // Input para número de preguntas
	quizTimeInput = document.getElementById('quiz-time'); // Input para tiempo del quiz
	startQuizButton = document.getElementById('start-quiz-button'); // Botón para iniciar quiz desde config

	// Crear el botón "Mostrar Más" dinámicamente si no existe
	showMoreSessionsButton = document.createElement('button');
	showMoreSessionsButton.classList.add('button', 'show-more-button', 'hidden'); // Añadir clase y ocultar inicialmente
	showMoreSessionsButton.textContent = 'Mostrar más';
	// Añadir el botón al contenedor del historial (será posicionado correctamente en displaySessionHistory)
	document.querySelector('.session-history-container').appendChild(showMoreSessionsButton);

	// Obtener referencias a los elementos del mensaje personalizado
	customMessageOverlay = document.getElementById('custom-message-overlay');
	messageTitleElement = document.getElementById('message-title');
	messageTextElement = document.getElementById('message-text');
	messageOkButton = document.getElementById('message-ok-button');


	// Establecer el valor máximo para el input de número de preguntas
	numQuestionsInput.max = originalQuizData.length;

	// Cargar la configuración guardada de localStorage al inicio
	const savedConfig = JSON.parse(localStorage.getItem('quizConfig'));
	if (savedConfig) {
		numberOfQuestions = savedConfig.numberOfQuestions;
		totalQuizTime = savedConfig.totalQuizTime;
		// Actualizar los inputs de configuración con los valores guardados
		numQuestionsInput.value = numberOfQuestions;
		quizTimeInput.value = totalQuizTime;
	}

	// Inicializar la visualización del puntaje principal al cargar la página
	// Esto creará los spans dentro de score-area
	updateScoreDisplay();


	// --- Eliminar creación de Tooltip aquí ---
	// El elemento tooltip y su lógica de mouseover/mouseout se eliminan de drawProgressChart.


	// Event listeners para los botones de acción
	submitButton.addEventListener('click', checkAnswer);
	nextButton.addEventListener('click', nextQuestion);
	restartButton.addEventListener('click', restartQuiz); // Event listener para el botón de reiniciar
	darkModeToggle.addEventListener('click', toggleDarkMode); // Event listener para el botón de modo oscuro
	clearHistoryButton.addEventListener('click', clearSessionHistory); // Event listener para borrar historial
	downloadCsvButton.addEventListener('click', downloadCSV); // Event listener para descargar CSV
	startQuizButton.addEventListener('click', startNewQuiz); // Event listener para iniciar nuevo quiz desde config
	showMoreSessionsButton.addEventListener('click', showAllSessions); // Event listener para el botón "Mostrar Más"
	messageOkButton.addEventListener('click', hideCustomMessage); // Event listener para el botón OK del mensaje personalizado


	// Event listeners para los botones de pestaña
	tabButtons.forEach(button => {
		button.addEventListener('click', () => {
			const tabId = button.getAttribute('data-tab');
			changeTab(tabId);
		});
	});


	// Cargar la preferencia de modo oscuro guardada (si existe)
	if (localStorage.getItem('darkMode') === 'enabled') {
		document.body.classList.add('dark-mode');
	}

	// Cargar y mostrar el historial de sesiones al cargar la página (limitado por defecto)
	displaySessionHistory();

	// Inicializar la interfaz mostrando la primera pestaña (Configuración)
	changeTab('config-tab');

	// No iniciar el quiz automáticamente, esperar al botón de inicio
	// startGlobalTimer(); // Eliminado
	// loadQuestion(); // Eliminado
};