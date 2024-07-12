// Select the necessary DOM elements
const counterElement = document.getElementById('counter');
const plusButton = document.getElementById('plus');
const minusButton = document.getElementById('minus');
const likeButton = document.getElementById('heart');
const pauseButton = document.getElementById('pause');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsList = document.getElementById('list');
const likesList = document.querySelector('.likes');

let counterValue = 0;
let timer;
let likes = {};
let isPaused = false;

// Function to start the timer
function startTimer() {
  timer = setInterval(() => {
    counterValue++;
    counterElement.textContent = counterValue;
  }, 1000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', startTimer);

plusButton.addEventListener('click', () => {
  counterValue++;
  counterElement.textContent = counterValue;
});

minusButton.addEventListener('click', () => {
  counterValue--;
  counterElement.textContent = counterValue;
});

likeButton.addEventListener('click', () => {
  if (likes[counterValue]) {
    likes[counterValue]++;
    document.getElementById(`like-${counterValue}`).textContent = `${counterValue} has been liked ${likes[counterValue]} times`;
  } else {
    likes[counterValue] = 1;
    const li = document.createElement('li');
    li.id = `like-${counterValue}`;
    li.textContent = `${counterValue} has been liked 1 time`;
    likesList.appendChild(li);
  }
});

pauseButton.addEventListener('click', () => {
  if (!isPaused) {
    clearInterval(timer);
    pauseButton.textContent = 'resume';
    disableButtons(true);
  } else {
    startTimer();
    pauseButton.textContent = 'pause';
    disableButtons(false);
  }
  isPaused = !isPaused;
});

commentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const commentText = commentInput.value;
  const p = document.createElement('p');
  p.textContent = commentText;
  commentsList.appendChild(p);
  commentForm.reset();
});

function disableButtons(disable) {
  plusButton.disabled = disable;
  minusButton.disabled = disable;
  likeButton.disabled = disable;
}
