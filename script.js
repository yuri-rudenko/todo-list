import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"
import { makeNewSpaceVisible } from "./scripts/nav-scripts/newSpaceVisibility.js"
import { draggingTasks } from "./scripts/main-scripts/draggingTasks.js"
import { changeDraggingState } from "./scripts/main-scripts/changeDragginState.js"


const main = {
    workspaces: [],
    files: [],
    people: [],
}

class Workspace {
    constructor(name, subthemes) {
        this.name = name
        this.subthemes = subthemes
        this.description = "New workspace"
        this.assigned = []
        this.boards = []
    }
}

class Board {
    constructor(name) {
        this.name = name
        this.tasks = []
    }
}

class Tusk {
    constructor(name, description, day, time) {
        this.name = name
        this.description = description
        this.day = day
        this.time = time
    }
}


let tuskArr = [new Tusk('Tusk1', "test tusk", 'Tommotow', "11 PM - 2 AM"), new Tusk('Tusk2', "test tusk2", '12 July', "3 AM - 8 AM")]
let first = new Workspace('Chemistry', ['H20', "CO2", "One Piece"])
let todos = new Board('Todods')
todos.tasks.push([...tuskArr])
first.boards.push(todos)
console.log(first)








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

for(let task of tasks) {
    task.addEventListener('click', (ev) => {
        if(ev.target.classList.contains('lock')) {
            console.log(1)
            changeDraggingState(task)
        }
    })
}