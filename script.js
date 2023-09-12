import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"
import { makeNewSpaceVisible } from "./scripts/nav-scripts/newSpaceVisibility.js"
import { draggingTasks } from "./scripts/main-scripts/draggingTasks.js"
import { changeDraggingState } from "./scripts/main-scripts/changeDragginState.js"
import { setProfilePicturePostion } from "./scripts/main-scripts/setProfilePicturePostion.js"


const main = {
    workspaces: [],
    files: [],
    people: [],
}

class Workspace {
    constructor(name, subthemes, boards) {
        this.name = name
        this.subthemes = subthemes
        this.description = "New workspace. You can change the description in the settings tab"
        this.assigned = []
        this.boards = boards
        this.tags = []
    }
}

class Board {
    constructor(name) {
        this.name = name
        this.tasks = []
    }
}

class Task {
    constructor(name, description, day, timeBegin, timeEnd) {
        this.name = name
        this.description = description
        this.day = day
        this.timeBegin = timeBegin
        this.timeEnd = timeEnd
    }
}

let basicBoards = [new Board('Todos'), new Board('In Progress'),new Board('Is Done')]

for(let board of basicBoards) {
    let testTask = new Task('First tusk', 'My first tusk', 'Today', '12:00', '15:00')
    board.tasks.push(testTask)
    console.log(board.tasks)
}

let first = new Workspace('First workspace', ['Testing', "Showcase"], basicBoards)

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

setProfilePicturePostion(document.querySelectorAll('.profile-picture'))