const desafio = document.querySelector('.desafio');
const elementos = Array.from(document.querySelector('.poly-para').children);
const emailer = document.querySelector('.emailer');
const emailMeParagraph = document.querySelector('.emailme--paragraph');
const emailRevelador = document.querySelector('.email--revelador');
const interpreter = document.querySelector('.interpreter');
const interpreterText = document.querySelector('.interpreter--text');
const langTag = document.querySelector('.interpreter--lang-tag');
const langIcons = Array.from(document.querySelectorAll('.lang-icon'));
const toggleLang = document.querySelector('.toggle-lang');
const polyPara = document.querySelector('.poly-para');
const traducao = document.querySelector('.traducao');
const takeover = document.querySelector('.takeover');

const icons = {
  es: 'spain',
  en: 'uk',
  nl: 'netherlands',
  kr: 'south-korea',
  pt: 'portugal',
};

const getIconUrl = langCode => `img/${icons[langCode]}.png`;
const onWordMouseOut = el => el.target.classList.remove('traducido');

elementos.forEach(elemento => {
  elemento.addEventListener('mouseover', el => onWordMouseOver(el), true);
  elemento.addEventListener('mouseout', el => onWordMouseOut(el), true)
});

emailer.addEventListener('click', () => {
  emailMeParagraph.style.display = 'none';
  emailRevelador.classList.remove('hidden');
  emailRevelador.focus();
});

toggleLang.addEventListener('click', el => onToggleLangClick(el), true);
[polyPara, traducao].forEach(section => section.addEventListener('mouseout', el => onSectionMouseOut(el), true));

hideTakeover(takeover);

const onWordMouseOver = el => {
  const lang = el.target.dataset.tran.split('|')[0];
  const tran = el.target.dataset.tran.split('|')[1];

  if (!toggleLang.classList.contains('hidden')) toggleLang.classList.add('hidden');

  el.target.classList.add('traducido');
  interpreterText.innerHTML = tran || '';

  escolherIcones(lang);
};

const onToggleLangClick = el => {
  polyPara.classList.toggle('hidden');
  traducao.classList.toggle('hidden');
};

const onSectionMouseOut = el => {
  toggleLang.classList.remove('hidden');
  interpreterText.innerHTML = '';
  escolherIcones('uk');
};

function escolherIcones(code) {
  const nameOrigen = ['en', 'jp', 'kr'];

  if (code !== 'ss') {
    toggleIcon(code);
  } else {
    nameOrigen.forEach(namae => {
      toggleIcon(namae, true);
    })
  }
}

function toggleIcon(langCode, isMe = false) {
  langIcons.forEach(icon => {
    if (icon.id === langCode) icon.classList.remove('hidden');
    else if (!isMe) icon.classList.add('hidden');
  });
}

function hideTakeover(el) {
  setTimeout(() => {
    el.style.opacity = 0;
  }, 1500);

  setTimeout(() => el.style.display = 'none', 2500);
}
