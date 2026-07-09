let questions = window.AppI18n ? window.AppI18n.getQuizQuestions() : [];

const startQuizBtn = document.getElementById('startQuizBtn');
const restartQuizBtn = document.getElementById('restartQuizBtn');
const submitQuizBtn = document.getElementById('submitQuizBtn');
const quizWrapper = document.getElementById('quizWrapper');
const quizForm = document.getElementById('quizForm');
const resultBox = document.getElementById('resultBox');
const selectionMessage = document.getElementById('selectionMessage');
const progressBar = document.getElementById('progressBar');
const currentQuestion = document.getElementById('currentQuestion');
const totalQuestions = document.getElementById('totalQuestions');
const scoreValue = document.getElementById('scoreValue');

let currentQuestions = [];
let score = 0;

function t(key, ...args) {
  return window.AppI18n ? window.AppI18n.t(key, ...args) : key;
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalize(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, ' ');
}

function getSelectedLibraries() {
  return Array.from(document.querySelectorAll('.library-option input:checked')).map(input => input.value);
}

function buildLibraryQuestions(libraryQuestions) {
  const shuffledQuestions = shuffle(libraryQuestions);
  const questionsByType = {};

  shuffledQuestions.forEach(question => {
    if (!questionsByType[question.type]) {
      questionsByType[question.type] = [];
    }
    questionsByType[question.type].push(question);
  });

  const selectedQuestions = [];
  const typeOrder = Object.keys(questionsByType);

  typeOrder.forEach(type => {
    if (selectedQuestions.length >= 5) return;
    const bucket = questionsByType[type];
    if (bucket && bucket.length > 0) {
      selectedQuestions.push(bucket.shift());
    }
  });

  while (selectedQuestions.length < 5 && shuffledQuestions.length > 0) {
    const nextQuestion = shuffledQuestions.shift();
    if (nextQuestion && !selectedQuestions.includes(nextQuestion)) {
      selectedQuestions.push(nextQuestion);
    }
  }

  return shuffle(selectedQuestions).slice(0, 5);
}

function buildQuiz() {
  const selectedLibraries = getSelectedLibraries();
  if (selectedLibraries.length === 0) {
    selectionMessage.textContent = t('selectLibrary');
    quizWrapper.classList.add('hidden');
    return;
  }

  const questionsByLibrary = selectedLibraries.map(library => {
    const filteredQuestions = questions.filter(question => question.library === library);
    return buildLibraryQuestions(filteredQuestions);
  });

  currentQuestions = shuffle(questionsByLibrary.flat());
  score = 0;

  quizForm.innerHTML = '';
  resultBox.classList.add('hidden');
  resultBox.textContent = '';
  selectionMessage.textContent = t('selectedQuestions', selectedLibraries.length, currentQuestions.length);
  quizWrapper.classList.remove('hidden');
  totalQuestions.textContent = currentQuestions.length;
  currentQuestion.textContent = '1';
  scoreValue.textContent = t('zeroPoints');
  progressBar.style.width = '0%';
  submitQuizBtn.disabled = true;
  submitQuizBtn.classList.add('is-disabled');

  currentQuestions.forEach((question, index) => {
    const card = document.createElement('article');
    card.className = 'quiz-card';

    const title = document.createElement('h3');
    title.textContent = `${index + 1}. ${question.question}`;
    card.appendChild(title);

    const responseBox = document.createElement('div');
    responseBox.className = 'response-box';

    if (question.type === 'fill') {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = `question-${index}`;
      input.className = 'fill-input';
      input.placeholder = t('writeAnswer');
      responseBox.appendChild(input);
    } else if (question.type === 'matching') {
      const list = document.createElement('div');
      list.className = 'matching-list';
      question.pairs.forEach((pair, pairIndex) => {
        const row = document.createElement('div');
        row.className = 'matching-row';

        const left = document.createElement('span');
        left.className = 'matching-left';
        left.textContent = pair.left;

        const select = document.createElement('select');
        select.name = `question-${index}-${pairIndex}`;
        select.className = 'matching-select';

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = t('chooseOption');
        select.appendChild(placeholder);

        pair.options.forEach(option => {
          const optionEl = document.createElement('option');
          optionEl.value = option;
          optionEl.textContent = option;
          select.appendChild(optionEl);
        });

        row.appendChild(left);
        row.appendChild(select);
        list.appendChild(row);
      });
      responseBox.appendChild(list);
    } else {
      question.options.forEach((option, optionIndex) => {
        const label = document.createElement('label');
        label.className = 'option-item';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question-${index}`;
        input.value = optionIndex;

        const span = document.createElement('span');
        span.textContent = option;

        label.appendChild(input);
        label.appendChild(span);
        responseBox.appendChild(label);
      });
    }

    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.hidden = true;
    card.appendChild(responseBox);
    card.appendChild(feedback);
    quizForm.appendChild(card);
  });
}

function getQuestionResponse(question, index) {
  if (question.type === 'fill') {
    const input = quizForm.querySelector(`input[name="question-${index}"]`);
    return input ? input.value : '';
  }

  if (question.type === 'matching') {
    const values = [];
    question.pairs.forEach((_, pairIndex) => {
      const select = quizForm.querySelector(`select[name="question-${index}-${pairIndex}"]`);
      values.push(select ? select.value : '');
    });
    return values;
  }

  const selectedInput = quizForm.querySelector(`input[name="question-${index}"]:checked`);
  return selectedInput ? selectedInput.value : '';
}

function hasAnswered(question, index) {
  if (question.type === 'fill') {
    const input = quizForm.querySelector(`input[name="question-${index}"]`);
    return input && normalize(input.value) !== '';
  }

  if (question.type === 'matching') {
    return question.pairs.every((_, pairIndex) => {
      const select = quizForm.querySelector(`select[name="question-${index}-${pairIndex}"]`);
      return select && normalize(select.value) !== '';
    });
  }

  const selectedInput = quizForm.querySelector(`input[name="question-${index}"]:checked`);
  return Boolean(selectedInput);
}

function isCorrectAnswer(question, response) {
  if (question.type === 'fill') {
    const acceptedAnswers = Array.isArray(question.answers) ? question.answers : [question.answer];
    return acceptedAnswers.some(answer => normalize(response) === normalize(answer));
  }

  if (question.type === 'matching') {
    return response.every((value, index) => normalize(value) === normalize(question.pairs[index].answer));
  }

  return normalize(response) === normalize(question.answer);
}

function renderFeedback() {
  currentQuestions.forEach((question, index) => {
    const card = quizForm.children[index];
    const feedback = card.querySelector('.feedback');
    const response = getQuestionResponse(question, index);
    const isCorrect = isCorrectAnswer(question, response);

    if (isCorrect) {
      feedback.hidden = true;
      return;
    }

    let message = `${t('correctAnswer')} <strong>${question.type === 'matching' ? question.pairs.map(pair => `${pair.left} → ${pair.answer}`).join(' · ') : question.options?.[question.answer] || question.answer}</strong>. ${question.explanation}`;

    if (!hasAnswered(question, index)) {
      message = `${t('unanswered')} ${message}`;
    }

    feedback.innerHTML = message;
    feedback.hidden = false;
    feedback.className = 'feedback error';
  });
}

function calculateScore() {
  score = 0;

  currentQuestions.forEach((question, index) => {
    const response = getQuestionResponse(question, index);
    if (isCorrectAnswer(question, response)) {
      score += 1;
    }
  });

  return score;
}

function showResult() {
  renderFeedback();

  const total = currentQuestions.length;
  const points = calculateScore();
  const percent = Math.round((points / total) * 100);
  const answeredCount = currentQuestions.reduce((count, question, index) => count + (hasAnswered(question, index) ? 1 : 0), 0);

  if (answeredCount < total) {
    resultBox.classList.remove('hidden');
    resultBox.textContent = t('missingAnswers');
    resultBox.className = 'result-box warning';
    return;
  }

  let message = t('result', points, total, percent);

  if (percent >= 80) {
    message += t('great');
  } else if (percent >= 50) {
    message += t('good');
  } else {
    message += t('review');
  }

  resultBox.classList.remove('hidden');
  resultBox.textContent = message;
  resultBox.className = 'result-box success';
  scoreValue.textContent = t('points', points);
  progressBar.style.width = '100%';
  currentQuestion.textContent = total;
}

function updateProgress() {
  const total = currentQuestions.length;
  const answeredCount = currentQuestions.reduce((count, question, index) => count + (hasAnswered(question, index) ? 1 : 0), 0);
  currentQuestion.textContent = Math.min(answeredCount, total);
  const percent = total === 0 ? 0 : Math.round((answeredCount / total) * 100);
  progressBar.style.width = `${percent}%`;
  scoreValue.textContent = t('points', score);

  const allAnswered = answeredCount === total;
  submitQuizBtn.disabled = !allAnswered;
  submitQuizBtn.classList.toggle('is-disabled', !allAnswered);
}

const libraryCheckboxes = document.querySelectorAll('.library-option input');

libraryCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    buildQuiz();
  });
});

startQuizBtn.addEventListener('click', buildQuiz);
restartQuizBtn.addEventListener('click', buildQuiz);
submitQuizBtn.addEventListener('click', showResult);

quizForm.addEventListener('input', updateProgress);
quizForm.addEventListener('change', updateProgress);

window.addEventListener('appLanguageChange', () => {
  questions = window.AppI18n ? window.AppI18n.getQuizQuestions() : questions;
  buildQuiz();
});

