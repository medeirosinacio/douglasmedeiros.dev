function setCache(c_name, value, exdays = 0) {
    let xmlHttp = new XMLHttpRequest();
    let cookie = getCache(c_name)
    if (cookie === null) {
        xmlHttp.open('GET',
            "https://api.countapi.xyz/create?update_upperbound=10000&key=" + c_name + "&namespace=medeirosinacio&value=" + value);
        xmlHttp.send(null);
        return;
    }

    xmlHttp.open('GET',
        "https://api.countapi.xyz/update/medeirosinacio/" + c_name + "?amount=" + (value - cookie));
    xmlHttp.send(null);

}

function getCache(c_name) {
    let response = JSON.parse(httpGet("https://api.countapi.xyz/info/medeirosinacio/" + c_name));
    return response.value;
}


function httpGet(theUrl, return_headers) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    xmlHttp.send(null);
    if (return_headers) {
        return xmlHttp
    }
    return xmlHttp.responseText;
}

// HOME ANIMATION
let typeText = document.querySelector(".typeText")
let textToBeTypedArr = ["e Analista", "e Devops", "e Curioso", "", "", "", "", "", "", ""]
let index = 0, isAdding = true, textToBeTypedIndex = 0

function playAnim() {
    setTimeout(function () {
        typeText.innerText = textToBeTypedArr[textToBeTypedIndex].slice(0, index)
        if (isAdding) {
            if (index > textToBeTypedArr[textToBeTypedIndex].length) {
                isAdding = false
                setTimeout(function () {
                    playAnim()
                }, 2000)
                return
            } else {
                index++
            }
        } else {
            if (index === 0) {
                isAdding = true
                textToBeTypedIndex = (textToBeTypedIndex + 1) % textToBeTypedArr.length
            } else {
                index--
            }
        }
        playAnim()
    }, isAdding ? 110 : 60)
}

setTimeout(function () {
    playAnim()
}, 8000);
// ./HOME ANIMATION

// GET VISIBLE ELEMENT
function callbackFunc(entries, observer) {
    entries.forEach(entry => {
        let target = entry.target;
        let status = entry.isIntersecting;

        if (target.id === 'main-home' && status === false) {
            document.getElementById('header').setAttribute('data-view-menu', "true");
        } else if (target.id === 'main-home' && status === true) {
            document.getElementById('header').setAttribute('data-view-menu', "false");
        }

        if (status === false) {
            target.setAttribute("data-is-visible", "false");
            return;
        }
        target.setAttribute("data-is-visible", "true");
        target.setAttribute("data-is-visualized", "true");
    });
}

let observer = new IntersectionObserver(callbackFunc, {root: null, rootMargin: '0px', threshold: 0.3});
const sections = document.getElementsByTagName('section');
observer.observe(document.getElementById('main-home'));
for (let section of sections) {
    observer.observe(section);
}

// NUMBER COUNT
let countNumbers = new IntersectionObserver(function (entries) {

    function animateValue(target, start, end, duration) {
        if (start === end) return;
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let obj = target;
        let timer = setInterval(function () {
            current += increment;
            obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    entries.forEach(entry => {
        let target = entry.target;
        let status = entry.isIntersecting;
        let statusv = target.getAttribute("data-is-visualized");
        let datacount = parseInt(target.getAttribute("data-number"));
        let startcount = 0;

        if (statusv === "true") {
            return;
        }

        if (datacount >= 2000) {
            startcount = parseInt((datacount / 3 * 1.5).toString().split(".")[0]);
        }

        if (status === true) {
            animateValue(target, startcount, datacount, 2000);
            target.setAttribute("data-is-visualized", "true");
        }

    });
}, {root: null, rootMargin: '0px', threshold: 0.3});
const numbersToCount = document.getElementsByClassName('numscroller');
for (let numberToCount of numbersToCount) {
    countNumbers.observe(numberToCount);
}

///.NUMBER COUNT


function portifolio() {
    let radios = document.getElementsByName("portfolio");
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            let view = radios[i].getAttribute("id").replace('port-', '');


            break;
        }
    }
}

function maskTel(input) {
    let value = input.value;
    value = value.substring(0, 15);
    value = value.replace(/\D/g, "")
    value = value.replace(/^(\d\d)(\d)/g, "($1) $2")
    value = value.replace(/(\d{4})(\d)/, "$1-$2")
    document.getElementById(input.id).value = value;
}

function validateName(name) {
    return name.length > 5 && name.length < 50;
}

function validateSubject(subject) {
    return subject.length > 5 && subject.length < 50;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePhone(phone) {
    const re = /^\(\d{2}\) \d{4}-\d{4,5}$/gi;
    return re.test(String(phone).toLowerCase());
}

function validateMessage(message) {
    return message.length > 10 && message.length < 250;
}

function validateAccessKey(key) {
    const re = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gm;
    return re.test(String(key).toLowerCase());
}

function validValues() {

    if (!validateAccessKey(document.getElementById('accessKey').value)) {
        console.log('Chave inválida.')
        return false;
    }

    if (!validateSubject(document.getElementById('subject').value)) {
        console.log('Assunto inválido.')
        return false;
    }

    if (!validateName(document.getElementById('name').value)) {
        console.log('O nome deve ter entre 5 e 50 caracteres.')
        return false;
    }

    if (!validateEmail(document.getElementById('email').value)) {
        console.log('Email inválido.')
        return false;
    }

    if (!validatePhone(document.getElementById('phone').value)) {
        console.log('Telefone inválido.')
        return false;
    }

    if (!validateMessage(document.getElementById('message').value)) {
        const errorElement = document.getElementById('submitErrorMessage');
        errorElement.innerHTML = 'A mensagem deve ter entre 10 e 250 caracteres.';
        return false;
    }

    return true;
}

async function handleSubmit(form) {

    const errorElement = document.getElementById('submitErrorBox');
    errorElement.classList.add("d-none");
    document.getElementById("submitFormBtn").setAttribute("disabled", 'true');

    const formDataObj = Object.fromEntries(new FormData(form).entries());

    if (!validValues()) {
        errorElement.classList.remove("d-none");
        document.getElementById("submitFormBtn").removeAttribute("disabled");
        return false;
    }

    try {
        const res = await fetch('https://api.staticforms.xyz/submit', {
            method: 'POST',
            body: JSON.stringify(formDataObj),
            headers: {'Content-Type': 'application/json'}
        });

        const json = await res.json();

        if (json.success) {

            setTimeout(function () {
                document.getElementById("modal").click();
                document.getElementById("submitFormBtn").removeAttribute("disabled");
            }, 3000);

        } else {
            console.log(json);
            const errorElement = document.getElementById('submitErrorMessage');
            errorElement.innerHTML = 'Ocorreu um erro no envio do formulário, atualize a página para tentar novamente ou volte mais tarde.';
            document.getElementById("submitFormBtn").removeAttribute("disabled");
        }
    } catch (e) {
        console.log('An error occurred', e);
        const errorElement = document.getElementById('submitErrorMessage');
        errorElement.innerHTML = 'Ocorreu um erro no envio do formulário, atualize a página para tentar novamente ou volte mais tarde.';
        document.getElementById("submitFormBtn").removeAttribute("disabled");
    }
}
