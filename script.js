const elementos = Array.from(document.querySelector('section').children);
const interpreter = document.querySelector('.interpreter--text');
const langTag = document.querySelector('.interpreter--lang-tag');
const icons = {
  es: 'spain',
  en: 'uk',
  nl: 'netherlands',
  kr: 'south-korea',
  pt: 'portugal',
};

const getIconUrl = langCode => `img/${icons[langCode]}.png`;

elementos.forEach(elemento => {
  elemento.addEventListener('mouseover', el => {
    const lang = el.target.dataset.tran.split('|')[0];
    const tran = el.target.dataset.tran.split('|')[1];
    const img = document.createElement('img');

    el.target.classList.add('traducido');
    interpreter.innerHTML = tran || '';
    
    img.src = new URL(getIconUrl(lang) || '', import.meta.url);
    langTag.appendChild(img)
  }, true);

  elemento.addEventListener('mouseout', el => {
    el.target.classList.remove('traducido');
  }, true);
});

