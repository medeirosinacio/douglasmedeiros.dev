function setCache(c_name, value, exdays = 0) {
    let xmlHttp = new XMLHttpRequest();
    let cookie = getCache(c_name);
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
        return xmlHttp;
    }
    return xmlHttp.responseText;
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
