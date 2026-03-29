const root = document.getElementById('landingRoot');
const stage = document.getElementById('featureStage');
const cards = Array.from(document.querySelectorAll('.feature-card'));
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let index = 0;
let timer;

function setActive(nextIndex) {
  index = (nextIndex + cards.length) % cards.length;
  cards.forEach((card, i) => card.classList.toggle('active', i === index));
  Array.from(dotsWrap.children).forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
    dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });
}

function startAutoRotate() {
  clearInterval(timer);
  timer = setInterval(() => setActive(index + 1), 2600);
}

cards.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.type = 'button';
  dot.setAttribute('aria-label', `Go to feature ${i + 1}`);
  dot.setAttribute('role', 'tab');
  dot.addEventListener('click', () => {
    setActive(i);
    startAutoRotate();
  });
  dotsWrap.appendChild(dot);
});

prevBtn.addEventListener('click', () => {
  setActive(index - 1);
  startAutoRotate();
});

nextBtn.addEventListener('click', () => {
  setActive(index + 1);
  startAutoRotate();
});

setActive(0);
window.setTimeout(() => {
  root.classList.add('show-features');
  stage.setAttribute('aria-hidden', 'false');
  startAutoRotate();
}, 5200);

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', () => {
  clearInterval(timer);
});
