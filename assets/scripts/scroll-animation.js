document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 400,
        easing: 'ease-in-out',
    });
});

document.addEventListener('aos:in', ({detail}) => {
    console.log(detail);
    subtitleLogoAnimation(detail, 'in');
});

document.addEventListener('aos:out', ({detail}) => {
    subtitleLogoAnimation(detail, 'out');
});

document.addEventListener('aos:in:numscroller', () => {
    numbersAnimation();
});

let titlesElement = document.querySelectorAll(['[data-title]']);
let titles = [];
if (titlesElement) {
    titlesElement.forEach(titleElement => {
        titles.push(titleElement.getAttribute('data-title'));
    });
}

function subtitleLogoAnimation(element, type) {
    function write(text) {
        document.getElementById('subtitle-logo').style.opacity = "0";
        setTimeout(function () {
            document.getElementById('subtitle-logo').innerHTML = text;
            document.getElementById('subtitle-logo').style.opacity = "1";
        }, 200);
    }

    let title = element.parentElement.getAttribute('data-title');
    if (!title || !document.getElementById('subtitle-logo')) {
        return;
    }

    if (type === 'out') {
        title = titles[titles.indexOf(title) - 1];
    }

    write(title);

}

setInterval(function () {
    if (window.scrollY <= 350 && !document.getElementById('menu-btn').checked) {
        document.getElementById('header').classList.add('mini');
        document.getElementById('header').classList.add('mini-animation');
        document.getElementById('header').classList.remove('animation');
    }else{
        document.getElementById('header').classList.remove('mini');
        document.getElementById('header').classList.remove('mini-animation');
        document.getElementById('header').classList.remove('d-none');
        document.getElementById('header').classList.add('animation');
    }
}, 100);

function numbersAnimation() {
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
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    let targets = document.querySelectorAll('.numscroller');
    if (targets) {
        targets.forEach(target => {

            if (target.textContent !== '0') {
                return;
            }

            let datacount = parseInt(target.getAttribute("data-number"));
            let startcount = 0;
            if (datacount >= 2000) {
                startcount = parseInt((datacount / 3 * 1.5).toString().split(".")[0]);
            }

            animateValue(target, startcount, datacount, 2000);

        });
    }
}