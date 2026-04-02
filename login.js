const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const progressBar = document.getElementById('progressBar');
const loginForm = document.getElementById('loginForm');

function updateProgressBar() {
  const emailFilled = emailInput.value.length > 0 ? 1 : 0;
  const passwordFilled = passwordInput.value.length > 0 ? 1 : 0;
  const progress = ((emailFilled + passwordFilled) / 2) * 100;
  progressBar.style.width = progress + '%';
}

emailInput.addEventListener('input', updateProgressBar);
passwordInput.addEventListener('input', updateProgressBar);

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  // Redirect to home page
  window.location.href = 'home.html';
});
