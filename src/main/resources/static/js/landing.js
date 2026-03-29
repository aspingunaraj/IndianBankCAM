const screens = {
  landing: document.getElementById('landingScreen'),
  login: document.getElementById('loginScreen'),
  welcome: document.getElementById('welcomeScreen'),
  dashboard: document.getElementById('dashboardScreen'),
  camSelection: document.getElementById('camSelectionScreen'),
  newToBank: document.getElementById('newToBankScreen'),
  dataLoading: document.getElementById('dataLoadingScreen'),
  dataReveal: document.getElementById('dataRevealScreen'),
  camGeneration: document.getElementById('camGenerationScreen'),
  documentUpload: document.getElementById('documentUploadScreen'),
  finalWorkspace: document.getElementById('finalCamWorkspaceScreen'),
};

const pageTitle = document.getElementById('pageTitle');
const createCamBtn = document.getElementById('createCamBtn');
const userPill = document.getElementById('userPill');

function titleFor(screenKey) {
  const titles = {
    landing: 'Credit Appraisal Dashboard',
    login: 'Secure Login',
    welcome: 'Welcome',
    dashboard: 'Credit Appraisal Dashboard',
    camSelection: 'Create New CAM',
    newToBank: 'New to Bank Intake',
    dataLoading: 'Company Data Aggregation',
    dataReveal: 'Company Data & Documents',
    camGeneration: 'CAM Generation',
    documentUpload: 'Additional Inputs',
    finalWorkspace: 'Final CAM Workspace',
  };
  return titles[screenKey] || 'Credit Appraisal Dashboard';
}

let kpiAnimated = false;
function animateKpis() {
  if (kpiAnimated) return;
  kpiAnimated = true;
  document.querySelectorAll('.kpi-value').forEach((el) => {
    const target = Number(el.dataset.target || '0');
    const isDecimal = String(el.dataset.target).includes('.');
    let current = 0;
    const steps = 24;
    const increment = target / steps;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
    }, 30);
  });
}

function showScreen(key) {
  Object.values(screens).forEach((screen) => screen.classList.remove('is-active'));
  screens[key].classList.add('is-active');
  pageTitle.textContent = titleFor(key);
  if (key === 'dashboard') {
    animateKpis();
  }
}

createCamBtn.addEventListener('click', () => showScreen('camSelection'));

const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('slideDots');
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
let slideIndex = 0;
let slideTimer;

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
prevSlide.addEventListener('click', () => { activateSlide(slideIndex - 1); startSlideRotate(); });
nextSlide.addEventListener('click', () => { activateSlide(slideIndex + 1); startSlideRotate(); });
activateSlide(0);
startSlideRotate();

document.getElementById('toLoginBtn').addEventListener('click', () => showScreen('login'));

const userIdInput = document.getElementById('userId');
const ssoBtn = document.getElementById('ssoBtn');
const ssoLoader = document.getElementById('ssoLoader');
const welcomeText = document.getElementById('welcomeText');

function syncUserPill(name) {
  const initials = name.trim() ? name.trim().slice(0, 2).toUpperCase() : 'CO';
  userPill.textContent = initials;
}

function openWelcome() {
  const user = userIdInput.value.trim() || 'User';
  welcomeText.textContent = `Welcome, ${user}`;
  syncUserPill(user === 'User' ? '' : user);
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
document.getElementById('newToBankBtn').addEventListener('click', () => showScreen('newToBank'));
document.getElementById('existingToBankBtn').addEventListener('click', () => console.log('Existing to Bank flow placeholder'));

const commentaryFeed = document.getElementById('commentaryFeed');
const commentaryLines = [
  'Validating CIN with MCA registry…',
  'Fetching company master data…',
  'Retrieving incorporation and capital structure…',
  'Extracting director profiles and DIN details…',
  'Mapping director network across associated entities…',
  'Pulling financial statements (Profit & Loss, Balance Sheet)…',
  'Structuring historical financial data…',
  'Checking compliance status and regulatory filings…',
  'Retrieving legal and charge-related information…',
  'Identifying related companies and group structure…',
  'Extracting shareholding and ownership patterns…',
  'Validating GSTIN and filing history…',
  'Verifying PAN records…',
  'Fetching AOC-4 (Financial Statements)…',
  'Retrieving MGT-7 (Annual Return)…',
  'Loading MOA, AOA and Certificate of Incorporation…',
  'Compiling comprehensive company data pack…',
  'Company data successfully aggregated',
];

function startAggregationExperience() {
  commentaryFeed.innerHTML = '';
  showScreen('dataLoading');

  commentaryLines.forEach((line, idx) => {
    setTimeout(() => {
      const li = document.createElement('li');
      li.textContent = line;
      if (line.includes('AOC-4') || line.includes('MGT-7') || line.includes('MOA')) {
        li.classList.add('doc');
      }
      commentaryFeed.appendChild(li);
      commentaryFeed.scrollTop = commentaryFeed.scrollHeight;
    }, idx * 430);
  });

  setTimeout(() => {
    showScreen('dataReveal');
    document.querySelectorAll('.doc-tile').forEach((tile, idx) => {
      setTimeout(() => tile.classList.add('show'), idx * 130);
    });
  }, 8200);
}

document.getElementById('proceedCamBtn').addEventListener('click', startAggregationExperience);
const genItems = Array.from(document.querySelectorAll('.gen-item'));
const camFinalMsg = document.getElementById('camFinalMsg');

function startCamGeneration() {
  showScreen('camGeneration');
  camFinalMsg.classList.remove('show');
  genItems.forEach((item, idx) => {
    item.classList.remove('show');
    const target = Number(item.dataset.percent || 0);
    const status = item.querySelector('.gen-status');
    status.textContent = '0% complete';
    setTimeout(() => {
      item.classList.add('show');
      let current = 0;
      const timer = setInterval(() => {
        current += 5;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        status.textContent = `${current}% complete`;
      }, 35);
    }, idx * 220);
  });

  setTimeout(() => camFinalMsg.classList.add('show'), 3600);
}

document.getElementById('generateCamBtn').addEventListener('click', startCamGeneration);
document.getElementById('toUploadBtn').addEventListener('click', () => showScreen('documentUpload'));
document.getElementById('toWorkspaceBtn').addEventListener('click', () => showScreen('finalWorkspace'));

document.querySelectorAll('.upload-card').forEach((card) => {
  const fileInput = card.querySelector('input[type="file"]');
  const uploadBtn = card.querySelector('.upload-btn');
  const preview = card.querySelector('.file-preview');
  const replaceBtn = card.querySelector('.replace-btn');
  const moduleName = card.dataset.module;

  function triggerUpload() {
    fileInput.click();
  }

  uploadBtn.addEventListener('click', triggerUpload);
  replaceBtn.addEventListener('click', triggerUpload);

  fileInput.addEventListener('change', () => {
    const fileName = fileInput.files?.[0]?.name || `${moduleName}.pdf`;
    preview.textContent = `Uploaded: ${fileName}`;
    replaceBtn.hidden = false;
    card.classList.remove('success');
    requestAnimationFrame(() => card.classList.add('success'));
  });
});

document.querySelectorAll('.cam-nav-list li').forEach((navItem) => {
  navItem.addEventListener('click', () => {
    document.querySelectorAll('.cam-nav-list li').forEach((item) => item.classList.remove('active'));
    navItem.classList.add('active');
    document.querySelector('.doc-pane').scrollTo({ top: 0, behavior: 'smooth' });
  });
});
