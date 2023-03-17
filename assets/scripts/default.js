function setCache(c_name, value, exdays = 0) {
    const cacheKey = `medeirosinacio-${c_name}`;
    const expirationDate = exdays > 0 ? new Date(Date.now() + exdays * 24 * 60 * 60 * 1000).getTime() : 0;
    const cacheValue = {
        value,
        expirationDate,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheValue));
}

function getCache(c_name) {
    const cacheKey = `medeirosinacio-${c_name}`;
    const cacheValue = localStorage.getItem(cacheKey);
    if (cacheValue !== null) {
        const { value, expirationDate } = JSON.parse(cacheValue);
        if (expirationDate === 0 || expirationDate > Date.now()) {
            return parseInt(value);
        }
        localStorage.removeItem(cacheKey);
    }
    return null;
}


// HOME ANIMATION
let typeText = document.querySelector(".typeText");
if (typeText) {
    let textToBeTypedArr = ["e Analista", "e Devops", "e Curioso", "", "", "", "", "", "", ""];
    let index = 0;
    let isAdding = true;
    let textToBeTypedIndex = 0;

    function playAnim() {
        setTimeout(function () {
            typeText.innerText = textToBeTypedArr[textToBeTypedIndex].slice(0, index);
            if (isAdding) {
                if (index > textToBeTypedArr[textToBeTypedIndex].length) {
                    isAdding = false;
                    setTimeout(function () {
                        playAnim();
                    }, 2000);
                    return;
                } else {
                    index++;
                }
            } else {
                if (index === 0) {
                    isAdding = true;
                    textToBeTypedIndex = (textToBeTypedIndex + 1) % textToBeTypedArr.length;
                } else {
                    index--;
                }
            }
            playAnim();
        }, isAdding ? 110 : 60);
    }

    setTimeout(function () {
        playAnim();
    }, 8000);
}

// ./HOME ANIMATION


function syncmenu(checkbox) {
    document.getElementsByName('menu').forEach(function (a) {
        a.checked = checkbox.checked;
        if (checkbox.checked === true) {
            document.getElementById('menu-container').classList.add('animation-opac');
            document.getElementById('menu').classList.add('animation-slide');
        } else {
            document.getElementById('menu-container').classList.remove('animation-opac');
            document.getElementById('menu').classList.remove('animation-slide');
        }
    });
}

function closeMenu() {
    document.getElementsByName('menu').forEach(function (a) {
        a.checked = false;
        document.getElementById('menu-container').classList.remove('animation-opac');
        document.getElementById('menu').classList.remove('animation-slide');
    });
}
