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
  upload: document.getElementById('uploadScreen'),
  workspace: document.getElementById('workspaceScreen'),
};

const pageTitle = document.getElementById('pageTitle');
const createCamBtn = document.getElementById('createCamBtn');
const userPill = document.getElementById('userPill');

function titleFor(key) {
  return {
    landing: 'Credit Appraisal Dashboard',
    login: 'Secure Login',
    welcome: 'Welcome',
    dashboard: 'Credit Appraisal Dashboard',
    camSelection: 'Create New CAM',
    newToBank: 'New to Bank Intake',
    dataLoading: 'Company Data Aggregation',
    dataReveal: 'Company Data & Documents Retrieved',
    camGeneration: 'CAM Generation',
    upload: 'Document Upload',
    workspace: 'CAM Workspace',
  }[key] || 'Credit Appraisal Dashboard';
}

function showScreen(key) {
  Object.values(screens).forEach((s) => s.classList.remove('is-active'));
  screens[key].classList.add('is-active');
  pageTitle.textContent = titleFor(key);
}
createCamBtn.addEventListener('click', () => showScreen('camSelection'));

let kpiAnimated = false;
function animateKpis() {
  if (kpiAnimated) return;
  kpiAnimated = true;
  document.querySelectorAll('.kpi-value').forEach((el) => {
    const target = Number(el.dataset.target || '0');
    const decimal = String(el.dataset.target).includes('.');
    let v = 0;
    const inc = target / 24;
    const t = setInterval(() => {
      v += inc;
      if (v >= target) { v = target; clearInterval(t); }
      el.textContent = decimal ? v.toFixed(1) : Math.round(v);
    }, 30);
  });
}

const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('slideDots');
let slideIndex = 0;
let slideTimer;
function activateSlide(i) {
  slideIndex = (i + slides.length) % slides.length;
  slides.forEach((s, idx) => s.classList.toggle('active', idx === slideIndex));
  Array.from(dotsWrap.children).forEach((d, idx) => d.classList.toggle('active', idx === slideIndex));
}
function startSlideRotate() { clearInterval(slideTimer); slideTimer = setInterval(() => activateSlide(slideIndex + 1), 3000); }
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.addEventListener('click', () => { activateSlide(i); startSlideRotate(); });
  dotsWrap.appendChild(dot);
});
document.getElementById('prevSlide').addEventListener('click', () => { activateSlide(slideIndex - 1); startSlideRotate(); });
document.getElementById('nextSlide').addEventListener('click', () => { activateSlide(slideIndex + 1); startSlideRotate(); });
activateSlide(0);
startSlideRotate();

document.getElementById('toLoginBtn').addEventListener('click', () => showScreen('login'));

const userIdInput = document.getElementById('userId');
function openWelcome() {
  const user = userIdInput.value.trim() || 'User';
  document.getElementById('welcomeText').textContent = `Welcome, ${user}`;
  userPill.textContent = user === 'User' ? 'CO' : user.slice(0, 2).toUpperCase();
  setTimeout(() => showScreen('welcome'), 320);
}
document.getElementById('loginForm').addEventListener('submit', (e) => { e.preventDefault(); openWelcome(); });

document.getElementById('ssoBtn').addEventListener('click', () => {
  const loader = document.getElementById('ssoLoader');
  loader.hidden = false;
  setTimeout(() => { loader.hidden = true; openWelcome(); }, 2400);
});

document.getElementById('toDashboardBtn').addEventListener('click', () => { showScreen('dashboard'); animateKpis(); });
document.getElementById('newToBankBtn').addEventListener('click', () => showScreen('newToBank'));
document.getElementById('existingToBankBtn').addEventListener('click', () => console.log('Existing to bank placeholder'));

const commentaryFeed = document.getElementById('commentaryFeed');
const commentaryLines = [
  'Validating CIN with MCA registry…','Fetching company master data…','Retrieving incorporation and capital structure…',
  'Extracting director profiles and DIN details…','Mapping director network across associated entities…',
  'Pulling financial statements (Profit & Loss, Balance Sheet)…','Structuring historical financial data…',
  'Checking compliance status and regulatory filings…','Retrieving legal and charge-related information…',
  'Identifying related companies and group structure…','Extracting shareholding and ownership patterns…',
  'Validating GSTIN and filing history…','Verifying PAN records…','Fetching AOC-4 (Financial Statements)…',
  'Retrieving MGT-7 (Annual Return)…','Loading MOA, AOA and Certificate of Incorporation…',
  'Compiling comprehensive company data pack…','Company data successfully aggregated'
];

function startAggregationExperience() {
  commentaryFeed.innerHTML = '';
  showScreen('dataLoading');
  commentaryLines.forEach((line, idx) => {
    setTimeout(() => {
      const li = document.createElement('li');
      li.textContent = line;
      if (line.includes('AOC-4') || line.includes('MGT-7') || line.includes('MOA')) li.classList.add('doc');
      commentaryFeed.appendChild(li);
      commentaryFeed.scrollTop = commentaryFeed.scrollHeight;
    }, idx * 430);
  });
  setTimeout(() => {
    showScreen('dataReveal');
    document.querySelectorAll('.doc-tile').forEach((tile, idx) => setTimeout(() => tile.classList.add('show'), idx * 130));
  }, 8200);
}
document.getElementById('proceedCamBtn').addEventListener('click', startAggregationExperience);

const camSections = [
  ['Executive Summary',80],['Borrower Profile',90],['Industry & Business Analysis',75],['Financial Analysis',70],['Credit Facility Details',88],
  ['Security & Collateral',82],['Risk Assessment',77],['Compliance & Regulatory Checks',92],['Terms & Covenants',68],
  ['Account Conduct',85],['Peer Comparison',73],['Recommendation',95],['Annexures',79],
];

document.getElementById('generateCamBtn').addEventListener('click', () => {
  const feed = document.getElementById('camProgressFeed');
  const status = document.getElementById('camProgressText');
  const finalMsg = document.getElementById('camFinalMessage');
  const nextBtn = document.getElementById('toUploadBtn');
  feed.innerHTML = '';
  finalMsg.hidden = true;
  nextBtn.hidden = true;
  showScreen('camGeneration');

  camSections.forEach(([name, pct], idx) => {
    setTimeout(() => {
      const li = document.createElement('li');
      li.textContent = `${name} → ${pct}% complete`;
      feed.appendChild(li);
      status.textContent = `Building section: ${name}`;
    }, idx * 520);
  });

  setTimeout(() => {
    status.textContent = 'CAM draft generated using available data sources';
    finalMsg.hidden = false;
    nextBtn.hidden = false;
  }, camSections.length * 520 + 500);
});

document.getElementById('toUploadBtn').addEventListener('click', () => showScreen('upload'));

document.querySelectorAll('.file-input').forEach((input) => {
  input.addEventListener('change', (e) => {
    const card = e.target.closest('.upload-card');
    const preview = card.querySelector('.file-preview');
    preview.textContent = e.target.files.length ? e.target.files[0].name : 'No file selected';
    card.classList.add('uploaded');
  });
});

document.querySelectorAll('.replace-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.upload-card');
    card.querySelector('.file-input').click();
  });
});

document.getElementById('generateCompleteCamBtn').addEventListener('click', () => showScreen('workspace'));

const workspaceDoc = document.getElementById('workspaceDocument');
document.querySelectorAll('#camNav li').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('#camNav li').forEach((li) => li.classList.remove('active'));
    item.classList.add('active');
    const target = document.getElementById(item.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
