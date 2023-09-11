import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"


let navEls = document.querySelectorAll('.nav-el')
console.log(navEls)
for(let el of navEls) {
    el.addEventListener('click', () => {
        changeNavElState(el)
    })
}