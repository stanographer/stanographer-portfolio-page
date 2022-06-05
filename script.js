const elementos = Array.from(document.querySelector('section').children);
const interpreter = document.querySelector('.interpreter--text');
const langTag = document.querySelector('.interpreter--lang-tag');
const langIcons = Array.from(document.querySelectorAll('.lang-icon'));
const icons = {
  es: 'spain',
  en: 'uk',
  nl: 'netherlands',
  kr: 'south-korea',
  pt: 'portugal',
};

const getIconUrl = langCode => `img/${icons[langCode]}.png`;

function escolherIcones(code) {
  const nameOrigen = ['en', 'jp', 'kr'];

  if (code !== 'ss') {
    toggleIcon(code);
  } else {
    nameOrigen.forEach(namae => {
      console.log(namae)
      toggleIcon(namae);
    })
  }
}

function toggleIcon(langCode) {
  langIcons.forEach(icon => {
    if (icon.id === langCode) icon.classList.remove('hidden');
    else icon.classList.add('hidden');
  });
}

elementos.forEach(elemento => {
  elemento.addEventListener('mouseover', el => {
    const lang = el.target.dataset.tran.split('|')[0];
    const tran = el.target.dataset.tran.split('|')[1];

    el.target.classList.add('traducido');
    interpreter.innerHTML = tran || '';

    escolherIcones(lang);
  }, true);

  elemento.addEventListener('mouseout', el => {
    el.target.classList.remove('traducido');
  }, true);
});

