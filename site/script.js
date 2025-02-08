const questions = [
    {
        text: "Что тебе больше всего нравится во мне?",
        placeholder: "Напиши здесь...)))"
    },
    {
        text: "Какое твоё самое любимое воспоминание о нас?",
        placeholder: "Поделись им..."
    },
    {
        text: "Что бы ты хотела сделать вместе в будущем?",
        placeholder: "Выкладывай...)"
    },
    {
        text: "Какие твои любимые цветы?",
        placeholder: "Напиши их ..."
    },
    {
        text: "О чём ты мечтаешь?",
        placeholder: "Расскажи о своей мечте..."
    }
];

let currentQuestion = 0;
let answers = [];
const questionsContainer = document.getElementById('questionsContainer');
const progressBar = document.querySelector('.progress');
const sendButton = document.getElementById('sendButton');

function startQuestions() {
    // Скрываем начальный экран
    document.getElementById('welcomeScreen').style.display = 'none';
    // Показываем вопросы
    document.getElementById('questions').style.display = 'block';
    // Запускаем первый вопрос
    renderQuestion();
}

function renderQuestion() {
    const question = questions[currentQuestion];
    const questionHTML = `
    <div class="question">
      <p>${question.text}</p>
      <input type="text" placeholder="${question.placeholder}" id="answerInput">
      <button onclick="nextQuestion()">Далее</button>
    </div>
  `;
    questionsContainer.innerHTML = questionHTML;
    updateProgressBar();
}

function nextQuestion() {
    const answerInput = document.getElementById('answerInput');
    if (answerInput.value.trim() === "") {
        alert("Напиши ответ любимая)");
        return;
    }

    answers[currentQuestion] = answerInput.value;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        questionsContainer.innerHTML = "<p>Спасибо за ответы Машенька 💖</p>";
        sendButton.style.display = 'block';
        // Запускаем анимацию сердечек
        createFlyingHearts();
    }
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function sendToTelegram() {
    const yourUsername = "Pavillionio"; // Замените на ваш username в Telegram
    let message = "Я тебя люблю красавица моя ❤️❤️❤️\n\n";
    message += "Мои ответы:\n";
    answers.forEach((answer, index) => {
        message += `${index + 1}. ${questions[index].text}: ${answer}\n`;
    });

    // Формируем ссылку на Telegram
    const telegramUrl = `https://t.me/${yourUsername}?text=${encodeURIComponent(message)}`;

    // Открываем ссылку в новом окне
    window.open(telegramUrl, "_blank");
}

// Функция для переключения темы
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        document.getElementById('themeToggle').textContent = '☀️';
        createStars();
    } else {
        document.getElementById('themeToggle').textContent = '🌙';
        removeStars();
    }
}

// Функция для создания звёзд
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars');
    document.body.appendChild(starsContainer);

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        starsContainer.appendChild(star);
    }
}

// Функция для удаления звёзд
function removeStars() {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        starsContainer.remove();
    }
}

// Функция для создания летающих сердечек
function createFlyingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.classList.add('hearts-fly');
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-fly');
        heart.textContent = '❤️';
        heart.style.left = `${Math.random() * 100}vw`; // Позиция по горизонтали
        heart.style.bottom = '-10vh'; // Начальная позиция за пределами экрана внизу
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heartsContainer.appendChild(heart);
    }
}