const usernameInputElem = document.getElementById('username-input');
const highScoreElem = document.getElementById('high-score');
const rouletteButton = document.getElementById('roulette');
const resultElem = document.getElementById('result');
const currentScoreElem = document.getElementById('current-score');
const gameElem = document.getElementById('game');

let currentScore = 0;
function submitClick () {
  const body = JSON.stringify({
    username: usernameInputElem.value
  });
  var headers = new Headers({
    'Content-Type': 'application/json'
  });
  return fetch('/api/click', {
    method: 'POST',
    body,
    headers
  })
  .then(function (response) {
    if (response.status === 500) {
      resultElem.innerText = 'You crashed the server!';
      currentScore = 0;
    } else {    
      resultElem.innerText = 'Success';
      currentScore++;
    }
    currentScoreElem.innerText = currentScore;
  });
}

function updateHighScore () {
  return fetch(`/api/highScore?username=${usernameInputElem.value}`)
  .then(response => response.json())
  .then(function (data) {
    highScoreElem.innerText = data.score;
    return data.score;
  });
}

rouletteButton.onclick = function () {
  submitClick()
  .then(updateHighScore);
};

usernameInputElem.oninput = function () {
  if (usernameInputElem.value.length === 0) {
    gameElem.style.visibility = 'hidden';
  } else {
    gameElem.style.visibility = 'visible';
    updateHighScore();
  }
};