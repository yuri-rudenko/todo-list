import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"


let navEls = document.querySelectorAll('.nav-el')
console.log(navEls)
for(let el of navEls) {
    let opener = el.querySelector('.upper')
    opener.addEventListener('click', () => {
        changeNavElState(el)
    })
}