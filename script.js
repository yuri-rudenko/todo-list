import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"
import { makeNewSpaceVisible } from "./scripts/nav-scripts/newSpaceVisibility.js"
import { draggingTasks } from "./scripts/main-scripts/draggingTasks.js"
import { changeDraggingState } from "./scripts/main-scripts/changeDragginState.js"
import { setProfilePicturePostion } from "./scripts/main-scripts/setProfilePicturePostion.js"
import { createNewWorkspace } from "./scripts/logic/createNewWorkspace.js"

let colors = [
    '007CFF',
    '20A475',
    '674EE3',
    '8000AB',
    'F8B33C',
    'FF9392',
]
let colorCounter = 0;

const main = {
    workspaces: [],
    files: [],
    people: [],
}

class Workspace {
    constructor(name, subthemes, boards, color) {
        this.name = name
        this.subthemes = subthemes
        this.description = "New workspace. You can change the description in the settings tab"
        this.assigned = []
        this.boards = boards
        this.tags = []
        this.color = color
        this.addNav()
    }

    addNav() {
        let nav = document.querySelector('.workspaces')

        let navEl = document.createElement('div')
        navEl.classList.add('nav-el')

        let upper = document.createElement('div')
        upper.classList.add('upper')
        let lefters = document.createElement('div')
        lefters.classList.add('lefters')
        lefters.insertAdjacentHTML('beforeend', `<img src="icons/figures/figure${this.color}.png" alt="" class="nav-figure">`)
        lefters.insertAdjacentHTML('beforeend', `<p class="workspace-name">${this.name}</p>`)
        upper.append(lefters)
        upper.insertAdjacentHTML('beforeend', `<img src="icons/angle-down.png" alt="" class="opener">`)

        let lower = document.createElement('div')
        lower.classList.add('lower')
        lower.classList.add(`h${this.color}`)
        for(let sub of this.subthemes) {
            let lowerEl = document.createElement('div')
            lowerEl.classList.add('lower-el')
            lowerEl.insertAdjacentHTML('beforeend', `<img src="icons/lines/h${this.color}.png" alt="" class="line">`)
            lowerEl.insertAdjacentHTML('beforeend', `<p class="topics">${sub}</p>`)
            lower.append(lowerEl)
        }

        navEl.append(upper, lower)
        nav.append(navEl)
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


/* for(let board of basicBoards) {
    let testTask = new Task('First tusk', 'My first tusk', 'Today', '12:00', '15:00')
    board.tasks.push(testTask)
    console.log(board.tasks)
} */





let submit = document.getElementsByClassName('submit-new-workspace')

submit[0].addEventListener('click', () => {
    colorCounter = createNewWorkspace(colors, colorCounter, Board, Workspace, main)
})

let workspace = document.querySelector('.workspaces')
let createSpace = document.querySelector('.create')

workspace.addEventListener('click', (ev) => {
    changeNavElState(ev, workspace)
}) 

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

