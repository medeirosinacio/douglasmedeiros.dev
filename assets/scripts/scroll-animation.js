document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 400,
        easing: 'ease-in-out',
    });
});

document.addEventListener('aos:in', ({detail}) => {
    subtitleLogoAnimation(detail, 'in');
});

document.addEventListener('aos:out', ({detail}) => {
    subtitleLogoAnimation(detail, 'out');
});

document.addEventListener('aos:in:numscroller', () => {
    animateNumScroller();
    updateSobreValues();
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
    } else {
        document.getElementById('header').classList.remove('mini');
        document.getElementById('header').classList.remove('mini-animation');
        document.getElementById('header').classList.remove('d-none');
        document.getElementById('header').classList.add('animation');
    }
}, 100);

function animateNumScroller() {
    const numScrollers = document.querySelectorAll('.numscroller');

    numScrollers.forEach((numScroller) => {
        let currentValue = Number(numScroller.textContent.replace(/\D+/g, '')); // Obtém o valor atual da div
        const targetValue = Number(numScroller.getAttribute('data-number'));

        let increment = (targetValue >= currentValue) ? 1 : -1; // Determina se o incremento será positivo ou negativo
        let animationInterval = calculateAnimationInterval(currentValue, targetValue); // Calcula o intervalo de tempo em milissegundos

        const animationId = setInterval(() => {
            currentValue += increment;

            if ((increment > 0 && currentValue >= targetValue) || (increment < 0 && currentValue <= targetValue)) {
                clearInterval(animationId);
                currentValue = targetValue;
            }

            numScroller.textContent = currentValue.toLocaleString(); // Atualiza o valor da div formatando como número com separador de milhar
        }, animationInterval);

        // Observa mudanças no atributo "data-number"
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-number') {
                    const newTargetValue = Number(numScroller.getAttribute('data-number'));

                    increment = (newTargetValue >= currentValue) ? 1 : -1; // Determina se o incremento será positivo ou negativo
                    animationInterval = calculateAnimationInterval(currentValue, newTargetValue); // Calcula o novo intervalo de tempo em milissegundos

                    clearInterval(animationId);
                    const newAnimationId = setInterval(() => {
                        currentValue += increment;

                        if ((increment > 0 && currentValue >= newTargetValue) || (increment < 0 && currentValue <= newTargetValue)) {
                            clearInterval(newAnimationId);
                            currentValue = newTargetValue;
                        }

                        numScroller.textContent = currentValue.toLocaleString();
                    }, animationInterval);
                }
            }
        });

        observer.observe(numScroller, {attributes: true}); // Inicia a observação do atributo "data-number"
    });
}

function calculateAnimationInterval(currentValue, targetValue) {
    const diff = Math.abs(currentValue - targetValue);

    if (diff < 5) {
        return 1000; // Intervalo de tempo em milissegundos
    }

    if (diff < 100) {
        return 30; // Intervalo de tempo em milissegundos
    }

    if (diff > 100) {
        return 0; // Intervalo de tempo em milissegundos
    }

    const speedMultiplier = (diff >= 1000) ? 0.5 : ((diff >= 3000) ? 0.75 : 1);

    // Calcula o intervalo de tempo em milissegundos
    return Math.floor((diff / 50) * speedMultiplier);
}

function getContributionsTotal() {
    const cacheKey = 'douglasmedeiros.commits';

    // Verifica se o valor já está em cache
    const cachedValue = getCache(cacheKey);
    if (cachedValue !== null) {
        return Promise.resolve(parseInt(cachedValue));
    }

    // Faz a requisição à API
    return fetch('https://api.allorigins.win/raw?url=https://github-contributions.vercel.app/api/v1/medeirosinacio')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Calcula a soma total do campo "total" de todos os "years"
            let total = 0;
            data.years.forEach(year => {
                total += year.total;
            });

            total = total + 800;

            // Armazena o valor obtido em cache
            setCache(cacheKey, total, 5);
            updateCommits(total);

        })
        .catch(error => {
            console.error('Error fetching contributions total:', error);
        });
}


function updateCommits(value = 3080) {
    const githubPersonal = getCache('douglasmedeiros.commits');
    const githubPersonalProjects = Number.isInteger(githubPersonal) ? githubPersonal : value;

    const input = document.getElementById('count-commits');
    input.setAttribute('data-number', githubPersonalProjects);

    if (value === 3080) {
        getContributionsTotal();
    }
}

async function getGitHubPersonalProjects() {
    const url = 'https://api.allorigins.win/raw?url=https://github.com/medeirosinacio?tab=repositories';
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch GitHub personal projects');
    const html = await response.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    const element = htmlDoc.querySelector('a[href="/medeirosinacio?tab=repositories"] > span');
    const githubPersonal = Number.parseInt(element?.textContent) || 20;
    if (githubPersonal !== 20) {
        setCache('douglasmedeiros.projects', githubPersonal, 5);
        updateProjects(githubPersonal);
    }
}

function updateProjects(value = 20) {
    const githubPersonal = getCache('douglasmedeiros.projects');
    const githubPersonalProjects = Number.isInteger(githubPersonal) ? githubPersonal : value;

    const gitlabProjectsLegacy = 14;
    const githubProjects = 33;
    const totalProjects = gitlabProjectsLegacy + githubProjects + githubPersonalProjects;

    const input = document.getElementById('count-projects');
    input.setAttribute('data-number', totalProjects);

    if (value === 20) {
        getGitHubPersonalProjects();
    }
}


function updateCoffe() {

    function calculateCoffeeSinceDate(dateString) {
        // Transforma a string da data em um objeto Date
        const date = new Date(dateString);

        // Calcula a diferença em milissegundos entre as duas datas
        const diffInMs = new Date() - date;

        // Converte a diferença em milissegundos para dias
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        // Calcula a quantidade de café em função do número de dias
        return Math.round(diffInDays * 1.6);
    }

    let input = document.getElementById('count-coffe');
    input.setAttribute('data-number', calculateCoffeeSinceDate('2012-11-01'));

}

function updateSobreValues() {
    updateCoffe();
    updateCommits();
    updateProjects();
}