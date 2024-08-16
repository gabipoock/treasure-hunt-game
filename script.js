const questions = {
    easy: [
        { question: "What can pirates use to map their treasure locations?", answer: "map", hint: "It's a tool used for navigation." },
        { question: "Which famous pirate could have a hook for a hand?", answer: "captain hook", hint: "He's known from a famous children's story." },
        { question: "What can pirates do with a treasure map?", answer: "find treasure", hint: "They use it to locate hidden loot." }
    ],
    medium: [
        { question: "What is the name of the pirate ship in 'Pirates of the Caribbean' that could be invisible in the moonlight?", answer: "black pearl", hint: "It's a legendary ship." },
        { question: "What is the term for a pirate’s treasure chest that can be filled with gold?", answer: "booty", hint: "It’s another word for treasure." },
        { question: "What could pirates do if they had a secret code?", answer: "decipher it", hint: "It's a way to unlock hidden information." }
    ],
    hard: [
        { question: "Where could pirates traditionally bury their treasure?", answer: "on an island", hint: "It's a common place away from the mainland." },
        { question: "What was the name of the pirate who was known as the 'Blackbeard' and could instill fear in his enemies?", answer: "edward teach", hint: "He was one of the most feared pirates." },
        { question: "What might pirates be able to do with a mysterious map?", answer: "find hidden places", hint: "It's a way to discover new locations." }
    ]
};

let currentLevel = '';
let currentQuestionIndex = 0;
let coins = 0;
let timer;
let timeRemaining = 180; // 3 minutes in seconds

function startGame(level) {
    var audio = document.getElementById('background-music');
    audio.play().catch(error => {
        console.log("Autoplay falhou: " + error);
    });

    currentLevel = level;
    currentQuestionIndex = 0;
    coins = 0;
    timeRemaining = 180; // Reset the timer for 3 minutes
    document.getElementById('level-selection').style.display = 'none';
    document.getElementById('treasure').style.display = 'none';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    startTimer();
    showQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timer);
            endGame("O navio afundou!");
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').innerText = `Tempo Restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function showQuestion() {
    const question = questions[currentLevel][currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    document.getElementById('hint').innerText = `Dica: ${question.hint}`;
    document.getElementById('answer').value = '';
}

function submitAnswer() {
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    const correctAnswer = questions[currentLevel][currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        coins++;
        if (currentQuestionIndex < questions[currentLevel].length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            endGame();
        }
    } else {
        document.getElementById('result-message').innerText = 'Resposta errada! Tente novamente.';
        document.getElementById('result').style.display = 'block';
    }
}

function endGame(message = '') {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('treasure').style.display = 'block';

    if (message) {
        document.getElementById('treasure').innerHTML = `<h2>${message}</h2><button onclick="startNewGame()">Jogar Novamente</button>`;
    } else {
        document.getElementById('coins').innerText = coins;
    }
}

function retryLevel() {
    showQuestion();
}

function startNewGame() {
    document.getElementById('treasure').style.display = 'none';
    document.getElementById('level-selection').style.display = 'block';
    clearInterval(timer); // Clear the timer when starting a new game
    document.getElementById('timer').innerText = ''; // Clear the timer display
}
