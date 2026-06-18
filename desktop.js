const electronBridge = (() => {
  try {
    return require('electron').ipcRenderer;
  } catch {
    return null;
  }
})();

const PRIORITY_FRONTS = [
  'Quelle phrase d’ouverture en rendez-vous ?',
  'Ce n’est pas une formation ?',
  'Quelle est la valeur ajoutée par rapport à AIM ?',
  'Si Cédric dit : « AIM est déjà très complet. »',
  'Si Cédric dit : « Guillaume a déjà fait le travail. »',
  'Pourquoi maintenant ?',
  'Pourquoi 90 jours ?',
  'Pourquoi seulement 3 à 5 comptes pilotes ?',
  'C’est cher pour quelques ateliers.',
  'Comment justifier les 22 500 € ?',
  'Peut-on baisser le prix ?',
  'Si Cédric demande : « Qu’est-ce qui sort concrètement ? »',
  'Si Cédric demande : « Où est le ROI ? »',
  'Phrase de closing douce'
];

const CATEGORY_ALIASES = {
  'Quelle phrase d’ouverture en rendez-vous ?': 'Positionnement',
  'Ce n’est pas une formation ?': 'Positionnement',
  'Quelle est la valeur ajoutée par rapport à AIM ?': 'Positionnement',
  'Si Cédric dit : « AIM est déjà très complet. »': 'Objections',
  'Si Cédric dit : « Guillaume a déjà fait le travail. »': 'Objections',
  'Pourquoi maintenant ?': 'Positionnement',
  'Pourquoi 90 jours ?': 'Format',
  'Pourquoi seulement 3 à 5 comptes pilotes ?': 'Format',
  'C’est cher pour quelques ateliers.': 'Prix',
  'Comment justifier les 22 500 € ?': 'Prix',
  'Peut-on baisser le prix ?': 'Prix',
  'Si Cédric demande : « Qu’est-ce qui sort concrètement ? »': 'Livrables',
  'Si Cédric demande : « Où est le ROI ? »': 'ROI',
  'Phrase de closing douce': 'Closing'
};

let cards = [];
let activeFilter = 'all';
let searchTerm = '';

function normalize(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function getDemantCards() {
  if (!window.FC_DATA || !Array.isArray(window.FC_DATA.decks)) return [];

  const deck = window.FC_DATA.decks.find(item => item.id === 'demant-kam');
  if (!deck) return [];

  const sourceCards = deck.cards.map(item => ({
    category: item[0],
    front: item[1],
    back: item[2]
  }));

  return PRIORITY_FRONTS
    .map(front => {
      const card = sourceCards.find(item => item.front === front);
      if (!card) return null;
      return {
        ...card,
        displayCategory: CATEGORY_ALIASES[front] || card.category
      };
    })
    .filter(Boolean);
}

function renderCards() {
  const grid = document.getElementById('cardsGrid');
  const normalizedSearch = normalize(searchTerm);

  const visibleCards = cards.filter(card => {
    const matchesFilter = activeFilter === 'all' || card.displayCategory === activeFilter || card.category === activeFilter;
    const haystack = normalize(`${card.displayCategory} ${card.category} ${card.front} ${card.back}`);
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
    return matchesFilter && matchesSearch;
  });

  if (!visibleCards.length) {
    grid.innerHTML = '<div class="empty">Aucune carte ne correspond à ce filtre.</div>';
    return;
  }

  grid.innerHTML = visibleCards.map((card, index) => `
    <button class="card" type="button" data-index="${index}" aria-label="${escapeHtml(card.front)}">
      <div class="card-inner">
        <div class="face front">
          <span class="category">${escapeHtml(card.displayCategory)}</span>
          <p class="question">${escapeHtml(card.front)}</p>
        </div>
        <div class="face back">
          <span class="category">${escapeHtml(card.displayCategory)}</span>
          <p class="answer">${escapeHtml(card.back)}</p>
        </div>
      </div>
    </button>
  `).join('');

  grid.querySelectorAll('.card').forEach(cardNode => {
    cardNode.addEventListener('click', () => {
      const wasOpen = cardNode.classList.contains('flipped');

      grid.querySelectorAll('.card.flipped').forEach(openCard => {
        openCard.classList.remove('flipped');
      });

      if (!wasOpen) {
        cardNode.classList.add('flipped');
        cardNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
    });
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function setFilter(filterValue) {
  activeFilter = filterValue;
  document.querySelectorAll('.filter').forEach(button => {
    button.classList.toggle('active', button.dataset.filter === filterValue);
  });
  renderCards();
}

function hideWindow() {
  if (electronBridge) electronBridge.send('hide-window');
  else document.getElementById('deskApp').style.display = 'none';
}

function initControls() {
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => setFilter(button.dataset.filter));
  });

  document.getElementById('searchInput').addEventListener('input', event => {
    searchTerm = event.target.value;
    renderCards();
  });

  document.getElementById('dimBtn').addEventListener('click', () => {
    document.getElementById('deskApp').classList.toggle('dimmed');
  });

  document.getElementById('compactBtn').addEventListener('click', () => {
    document.getElementById('deskApp').classList.toggle('compact');
  });

  document.getElementById('hideBtn').addEventListener('click', hideWindow);

  document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (electronBridge) electronBridge.send('toggle-fullscreen');
  });

  document.getElementById('quitBtn').addEventListener('click', () => {
    if (electronBridge) electronBridge.send('close-app');
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') hideWindow();
    if (event.key === 'd' && event.metaKey && event.shiftKey) hideWindow();
  });
}

function init() {
  cards = getDemantCards();
  initControls();
  renderCards();
}

init();
