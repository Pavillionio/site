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
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('questions').style.display = 'block';
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

    const telegramUrl = `https://t.me/${yourUsername}?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, "_blank");
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');

    if (body.classList.contains('dark-theme')) {
        document.getElementById('themeToggle').textContent = '☀️';
        createStars();
        createStarfall();
        createGift();
    } else {
        document.getElementById('themeToggle').textContent = '🌙';
        removeStars();
        removeStarfall();
        removeGift();
    }
}

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

function removeStars() {
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        starsContainer.remove();
    }
}

function createStarfall() {
    const starfallContainer = document.createElement('div');
    starfallContainer.classList.add('starfall-container');
    document.body.appendChild(starfallContainer);

    for (let i = 0; i < 10; i++) { // Уменьшаем количество звёзд до 10
        const star = document.createElement('div');
        star.classList.add('starfall');

        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 15 + 10}s`; // Увеличиваем время анимации
        star.style.animationDelay = `${Math.random() * 5}s`; // Увеличиваем задержку

        if (Math.random() > 0.8) {
            star.classList.add('big');
        }
        if (Math.random() > 0.9) {
            star.classList.add('bright');
        }

        if (Math.random() > 0.5) {
            star.style.animationName = 'starfall-right';
        } else {
            star.style.animationName = 'starfall-left';
        }

        starfallContainer.appendChild(star);
    }
}

function removeStarfall() {
    const starfallContainer = document.querySelector('.starfall-container');
    if (starfallContainer) {
        starfallContainer.remove();
    }
}

function createGift() {
    const gift = document.createElement('div');
    gift.classList.add('gift');
    gift.textContent = '🎁';
    gift.style.top = `${Math.random() * 80 + 10}vh`;
    gift.style.left = `${Math.random() * 80 + 10}vw`;
    gift.onclick = () => {
        gift.remove();
        createFirework(gift.style.left, gift.style.top);
    };
    document.body.appendChild(gift);
}

function removeGift() {
    const gift = document.querySelector('.gift');
    if (gift) {
        gift.remove();
    }
}

function createFirework(left, top) {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.textContent = '❤️';
    firework.style.left = left;
    firework.style.top = top;
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
}

function createFlyingHearts() {
    const heartsContainer = document.createElement('div');
    heartsContainer.classList.add('hearts-fly');
    document.body.appendChild(heartsContainer);

    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-fly');
        heart.textContent = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.bottom = `${-10 - Math.random() * 10}vh`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        heartsContainer.appendChild(heart);
    }
}