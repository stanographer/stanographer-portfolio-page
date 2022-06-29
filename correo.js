    const emailRevelador = document.querySelector('.email--revelador');
    const direccion = document.querySelector('.direccion--correo');
    const direccionInput = document.querySelector('.desafio');
    let a = 'c3Q=',
        e = 'aGVy',
        b = 'eWVsbmE=',
        c = 'YW5v',
        d = 'cGFyZw==',
        p = '\u0040';

    emailRevelador.addEventListener('submit', event => checkAnswer(event));
    direccionInput.addEventListener('blur', () => direccionInput.value = '');

    function puntoCom() {
        return '.' + 'com';
    }

    function checkAnswer(event) {
        const formData = emailRevelador.querySelector('input[name="desafio"]');
        const n = formData.value;
        const z = n - 3;
        const y = n - 2;
        const u = n * 1;
        const w = n - 1;
        const v = n * 0;

        getEmail(z, y, u, w, v, crearNode);
        event.preventDefault();
    }

    function getEmail(z, y, u, w, v, cb) {
        if (z + y + u + w + v !== 6) return cb(null);

        const x = [window.atob(d), window.atob(b)]
        const bw = `${Array.from(x[0]).reverse().join('')} ${Array.from(x[1]).reverse().join('')}`;
        const fn = window.atob(a) + bw.split(' ')[1] + 'r@gmails';
        const hst = 'yahoots' + window.atob(a) + window.atob(c) + bw.split(' ')[0] + window.atob(e);
        let sc = [];

        sc.push(puntoCom());
        sc.push(p);
        sc.push(fn + '.com');
        sc.push(hst);

        // returns email quetefollenimbecil34@gmail.com
        return cb(sc[w].split(p)[v].slice(0, 7) + sc[y] + sc[u].slice(-12) + sc[v]);
    }

    function crearNode(decoded) {
        let node;
        let link;
        let text = 'Try again!';
        let email = '';

        direccion.innerHTML = '';

        if (decoded !== null) {
            text = decoded;
            email = decoded;
        }

        link = document.createElement('a')
        node = document.createTextNode(text);
        link.href = email ? `mailto:${email}` : '#';
        link.classList.add('try-again--bitch');
        link.appendChild(node);
        direccion.appendChild(link);
        emailRevelador.style.display = 'none';

        link.addEventListener('click', () => tryOtraVez())
    }

    function tryOtraVez() {
        const tryAgain = document.querySelector('.try-again--bitch');
        emailRevelador.style.display = 'inline-block';
        tryAgain.style.display = 'none';
    }
