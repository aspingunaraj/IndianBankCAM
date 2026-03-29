const screens = {
  landing: document.getElementById('landingScreen'),
  login: document.getElementById('loginScreen'),
  welcome: document.getElementById('welcomeScreen'),
  dashboard: document.getElementById('dashboardScreen'),
  camSelection: document.getElementById('camSelectionScreen'),
  newToBank: document.getElementById('newToBankScreen'),
};

const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('slideDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let slideIndex = 0;
let slideTimer;

function showScreen(key) {
  Object.values(screens).forEach((screen) => screen.classList.remove('is-active'));
  screens[key].classList.add('is-active');
}

function activateSlide(next) {
  slideIndex = (next + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === slideIndex));
  Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle('active', i === slideIndex));
}

function startSlideRotate() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => activateSlide(slideIndex + 1), 3000);
}

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
  dot.addEventListener('click', () => {
    activateSlide(i);
    startSlideRotate();
  });
  dotsWrap.appendChild(dot);
});

prevSlide.addEventListener('click', () => {
  activateSlide(slideIndex - 1);
  startSlideRotate();
});
nextSlide.addEventListener('click', () => {
  activateSlide(slideIndex + 1);
  startSlideRotate();
});
activateSlide(0);
startSlideRotate();

document.getElementById('toLoginBtn').addEventListener('click', () => showScreen('login'));

const userIdInput = document.getElementById('userId');
const ssoBtn = document.getElementById('ssoBtn');
const ssoLoader = document.getElementById('ssoLoader');
const welcomeText = document.getElementById('welcomeText');

function openWelcome() {
  const user = userIdInput.value.trim() || 'User';
  welcomeText.textContent = `Welcome, ${user}`;
  setTimeout(() => showScreen('welcome'), 360);
}

document.getElementById('loginForm').addEventListener('submit', (event) => {
  event.preventDefault();
  openWelcome();
});

ssoBtn.addEventListener('click', () => {
  ssoLoader.hidden = false;
  ssoBtn.disabled = true;
  setTimeout(() => {
    ssoLoader.hidden = true;
    ssoBtn.disabled = false;
    openWelcome();
  }, 2400);
});

document.getElementById('toDashboardBtn').addEventListener('click', () => showScreen('dashboard'));
document.getElementById('createCamBtn').addEventListener('click', () => showScreen('camSelection'));
document.getElementById('newToBankBtn').addEventListener('click', () => showScreen('newToBank'));
document.getElementById('existingToBankBtn').addEventListener('click', () => {
  console.log('Existing to Bank flow placeholder');
});

const samples = [
  {
    company: 'Reliance Industries Limited',
    cin: 'L17110MH1973PLC019786',
    gstin: '27AAACR5055K1Z6',
    pan: 'AAACR5055K',
  },
  {
    company: 'Tata Consultancy Services Limited',
    cin: 'L22210MH1995PLC084781',
    gstin: '27AAACT2727Q1ZW',
    pan: 'AAACT2727Q',
  },
];

const selectedSample = samples[Math.floor(Math.random() * samples.length)];
document.getElementById('sampleCompany').textContent = `Company: ${selectedSample.company}`;
document.getElementById('cin').value = selectedSample.cin;
document.getElementById('gstin').value = selectedSample.gstin;
document.getElementById('pan').value = selectedSample.pan;

document.getElementById('proceedCamBtn').addEventListener('click', () => {
  console.log('Proceed with CAM Preparation', {
    cin: document.getElementById('cin').value,
    gstin: document.getElementById('gstin').value,
    pan: document.getElementById('pan').value,
  });
});
