const screens = {
  landing: document.getElementById('landingScreen'),
  login: document.getElementById('loginScreen'),
  welcome: document.getElementById('welcomeScreen'),
};

const toLoginBtn = document.getElementById('toLoginBtn');
const loginForm = document.getElementById('loginForm');
const ssoBtn = document.getElementById('ssoBtn');
const ssoLoader = document.getElementById('ssoLoader');
const welcomeHeading = document.getElementById('welcomeHeading');
const proceedBtn = document.getElementById('proceedBtn');
const userIdInput = document.getElementById('userId');

function transitionTo(target) {
  Object.values(screens).forEach((screen) => screen.classList.remove('is-active'));
  screens[target].classList.add('is-active');
}

function showWelcome(userId) {
  const safeName = userId && userId.trim() ? userId.trim() : 'User';
  welcomeHeading.textContent = `Welcome, ${safeName}`;
  setTimeout(() => transitionTo('welcome'), 360);
}

toLoginBtn.addEventListener('click', () => transitionTo('login'));

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loginForm.style.opacity = '0.94';
  loginForm.style.transform = 'translateY(-3px)';
  showWelcome(userIdInput.value);
});

ssoBtn.addEventListener('click', () => {
  ssoLoader.hidden = false;
  ssoBtn.disabled = true;
  setTimeout(() => {
    ssoLoader.hidden = true;
    ssoBtn.disabled = false;
    showWelcome(userIdInput.value);
  }, 2400);
});

proceedBtn.addEventListener('click', () => {
  console.log('Proceed to dashboard placeholder');
});
