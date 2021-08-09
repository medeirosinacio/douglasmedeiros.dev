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
