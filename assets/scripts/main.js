let typeText = document.querySelector(".typeText")
let textToBeTypedArr = ["e Analista", "e Devops", "e Curioso", "", "", "", "", "", "", "", "", "", ""]
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
