import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"
import { makeNewSpaceVisible } from "./scripts/nav-scripts/newSpaceVisibility.js"
import { draggingTasks } from "./scripts/main-scripts/draggingTasks.js"
import { changeDraggingState } from "./scripts/main-scripts/changeDragginState.js"

let navEls = document.querySelectorAll('.nav-el')
let createSpace = document.querySelector('.create')

for(let el of navEls) {
    let opener = el.querySelector('.upper')
    opener.addEventListener('click', () => {
        changeNavElState(el, navEls)
    })
}

createSpace.addEventListener('click', makeNewSpaceVisible)


let tasks = document.querySelectorAll('.task')
let containers = document.querySelectorAll('.tasks')

draggingTasks(tasks, containers)

let locks = document.querySelectorAll('.lock')

for(let task of tasks) {
    task.addEventListener('click', (ev) => {
        if(ev.target.classList.contains('lock')) {
            console.log(1)
            changeDraggingState(task)
        }
    })
}