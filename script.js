import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"
import { makeNewSpaceVisible } from "./scripts/nav-scripts/newSpaceVisibility.js"
import { druggingTasks } from "./scripts/main-scripts/druggingTasks.js"

let navEls = document.querySelectorAll('.nav-el')
let createSpace = document.querySelector('.create')

for(let el of navEls) {
    let opener = el.querySelector('.upper')
    opener.addEventListener('click', () => {
        changeNavElState(el, navEls)
    })
}

createSpace.addEventListener('click', makeNewSpaceVisible)


let draggables = document.querySelectorAll('.task')
let containers = document.querySelectorAll('.tasks')

druggingTasks(draggables, containers)