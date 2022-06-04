const elementos = Array.from(document.querySelector('section').children);
const interpreter = document.querySelector('.interpreter--text');
const langTag = document.querySelector('.interpreter--lang-tag');

elementos.forEach(elemento => {
  console.log(elemento)
  elemento.addEventListener('mouseover', el => {
    // console.log();
    const lang = el.target.dataset.tran.split('|')[0];
    const tran = el.target.dataset.tran.split('|')[1];
    el.target.classList.add('traducido');

    interpreter.innerHTML = tran || '';
    langTag.innerHTML = lang || '';
  }, true);

  elemento.addEventListener('mouseout', el => {
    el.target.classList.remove('traducido');
  }, true);
});