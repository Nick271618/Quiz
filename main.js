const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1896", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// Находим эл-ты (обертки)
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0; // кол-во правильных отетов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

// Очистка HTML разметки
function clearPage() {
	headerContainer.innerHTML = ''; // Пустая строка
	listContainer.innerHTML = '';
}

// Отображение текущего вопроса
function showQuestion() {

	// Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	// метод replace(All) делает замену подстроки внутри строки headerTemplate
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	// Варианты ответа
	let answerNumber = 1;
	for (answerText of questions[questionIndex]['answers']) {
		console.log(answerNumber, answerText)
		const questionTemplate = 
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

			let answerHTML = questionTemplate.replace('%answer%', answerText);
			answerHTML = answerHTML.replace('%number%', answerNumber);

			listContainer.innerHTML += answerHTML;
			answerNumber++;
	}
}

function checkAnswer() {

	// Находим выбранную радио кнопку
	const checkRadio = listContainer.querySelector('input[type="radio"]:checked');

	// Если ни один вариант не выбран, кнопка "Ответить" не работает
	if (!checkRadio) {
		submitBtn.blur(); // метод blur выводит кнопку из "разфокуса"
		return
	}

	// Узнаём номер ответа пользователя
	const userAnswer = parseInt(checkRadio.value);

	// Если ответил верно, увеличиваем счет
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	// Проверка на последний вопрос
	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
	} else {
		clearPage();
		showResults();
	}
}

// Вывод резельтатов
function showResults() {
	const resultsTemplate = `
		<h2 class="title">%title%</h2>
		<h3 class="summary">%message%</h3>
		<p class="result">%result%</p>
	`;

	let title, message;
	// Варианты заголовок и текста
	if (score === questions.length) {
		title = 'Поздравляем';
		message = 'Вы ответили верно на все вопросы!';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат!';
		message = 'Вы дали более половины првильных ответов';
	} else {
		title = 'Стоит постараться';
		message = 'Пока у Вас меньше половины правильных ответов';
	}

	// Результат
	let result = `${score} из ${questions.length}`;

	// Финальный ответ
	const finalMessange = resultsTemplate
								.replace('%title%', title)
								.replace('%message%', message)
								.replace('%result%', result);
	headerContainer.innerHTML = finalMessange;

	// Меняем кнопку на "Пройти заново"
	submitBtn.blur();
	submitBtn.innerHTML = 'Пройти заново';
	submitBtn.onclick = () => history.go();
}