import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"
import { makeNewSpaceVisible } from "./scripts/nav-scripts/newSpaceVisibility.js"
import { draggingTasks } from "./scripts/main-scripts/draggingTasks.js"
import { changeDraggingState } from "./scripts/main-scripts/changeDragginState.js"
import { setProfilePicturePostion } from "./scripts/main-scripts/setProfilePicturePostion.js"
import { createNewWorkspace } from "./scripts/logic/createNewWorkspace.js"
import { getDragAfterElement } from "./scripts/main-scripts/draggingTasks.js"

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

    drawWorkspace() {
        let name = document.querySelector('.description .name p')
        name.innerHTML = this.name

        let logo = document.querySelector('.description .name img')
        logo.src = `icons/figures/figure${this.color}.png`

        let description = document.querySelector('.description .work-description p')
        description.innerHTML = this.description

        let i = 0

        for(let board of this.boards) {
            let board = document.createElement('div')
            board.classList.add('board')
    
            let naming = document.createElement('div')
            naming.classList.add('naming')
            naming.insertAdjacentHTML('beforeend', `<div class="sphere b${this.boards[i].color}"></div>`)
            naming.insertAdjacentHTML('beforeend', `<p class="board-name">${this.boards[i].name}</p>`)
            
            let adder = document.createElement('div')
            adder.classList.add('adder', 'task-creator')
            adder.insertAdjacentHTML('beforeend', `<p class="add-task task-creator">Add Task</p>`)
            adder.insertAdjacentHTML('beforeend', `<p class="plus task-creator">+</p>`)
    
            let tasks = document.createElement('div')
            tasks.classList.add('tasks')

            for(let task of this.boards[i].tasks) {
                
                let taskDiv = document.createElement('div')
                taskDiv.classList.add('task')
                taskDiv.draggable = false
                taskDiv.insertAdjacentHTML('beforeend',`<img src="icons/lock.png" class="lock" alt="">`)

                let taskTop = document.createElement('div')
                taskTop.classList.add("task-top")
                taskTop.insertAdjacentHTML('beforeend', `<p class="task-name">${this.name}</p>`)
                taskTop.insertAdjacentHTML('beforeend', `<p class="task-description">${this.description}</p>`)

                let taskBot = document.createElement('div')
                taskBot.classList.add('task-bot')
                taskBot.insertAdjacentHTML('beforeend', `<p class="day">${this.day}</p>`)
                taskBot.insertAdjacentHTML('beforeend', `<p class="time">${this.time}</p>`)

                taskDiv.append(taskTop)
                taskDiv.append(taskBot)

                let tasks = board.querySelector('.tasks')
                taskDiv.addEventListener('dragstart', () => {
                    taskDiv.classList.add('dragging')
                })
                taskDiv.addEventListener('dragend', () => {
                    if(taskDiv.classList.contains('display')) {
                        taskDiv.remove()
                    }
                    taskDiv.classList.remove('dragging')
                })
                tasks.prepend(taskDiv)
            }
    
            tasks.addEventListener('dragover', (ev) => {
                ev.preventDefault()
                const afterEl = getDragAfterElement(tasks, ev.clientY)
                const draggable = document.querySelector('.dragging')
                if(afterEl == null) {
                    tasks.appendChild(draggable)
                }
                else {
                    tasks.insertBefore(draggable, afterEl)
                }
            })
    
            board.append(naming)
            board.append(adder)
            board.append(tasks)
    
            let todolist = document.querySelector('.add-board')
            todolist.before(board)

            i++
        }
    }
}

class Board {
    constructor(name, tasks = [], color) {
        this.name = name
        this.tasks = tasks
        this.color = color
        this.addBoard()
    }

    addBoard() {
        let board = document.createElement('div')
        board.classList.add('board')

        let naming = document.createElement('div')
        naming.classList.add('naming')
        naming.insertAdjacentHTML('beforeend', `<div class="sphere b${this.color}"></div>`)
        naming.insertAdjacentHTML('beforeend', `<p class="board-name">${this.name}</p>`)
        
        let adder = document.createElement('div')
        adder.classList.add('adder', 'task-creator')
        adder.insertAdjacentHTML('beforeend', `<p class="add-task task-creator">Add Task</p>`)
        adder.insertAdjacentHTML('beforeend', `<p class="plus task-creator">+</p>`)

        let tasks = document.createElement('div')
        tasks.classList.add('tasks')

        tasks.addEventListener('dragover', (ev) => {
            ev.preventDefault()
            const afterEl = getDragAfterElement(tasks, ev.clientY)
            const draggable = document.querySelector('.dragging')
            if(afterEl == null) {
                tasks.appendChild(draggable)
            }
            else {
                tasks.insertBefore(draggable, afterEl)
            }
        })

        board.append(naming)
        board.append(adder)
        board.append(tasks)

        let todolist = document.querySelector('.add-board')
        todolist.before(board)
    }

}

class Task {
    constructor(curBoard) {
        this.name = 'Enter name'
        this.description = 'Enter description'
        this.day = 'Enter date'
        this.time = 'Enter time'
        this.parentBoard = curBoard
        this.lock = false
        this.addTask(this.parentBoard)
    }

    addTask(board) {
        let taskDiv = document.createElement('div')
        taskDiv.classList.add('task')
        taskDiv.draggable = false
        taskDiv.insertAdjacentHTML('beforeend',`<img src="icons/lock.png" class="lock" alt="">`)

        let taskTop = document.createElement('div')
        taskTop.classList.add("task-top")
        taskTop.insertAdjacentHTML('beforeend', `<p class="task-name">${this.name}</p>`)
        taskTop.insertAdjacentHTML('beforeend', `<p class="task-description">${this.description}</p>`)

        let taskBot = document.createElement('div')
        taskBot.classList.add('task-bot')
        taskBot.insertAdjacentHTML('beforeend', `<p class="day">${this.day}</p>`)
        taskBot.insertAdjacentHTML('beforeend', `<p class="time">${this.time}</p>`)

        taskDiv.append(taskTop)
        taskDiv.append(taskBot)

        let tasks = board.querySelector('.tasks')
        taskDiv.addEventListener('dragstart', () => {
            taskDiv.classList.add('dragging')
        })
        taskDiv.addEventListener('dragend', () => {
            if(taskDiv.classList.contains('display')) {
                taskDiv.remove()
            }
            taskDiv.classList.remove('dragging')
        })
        tasks.prepend(taskDiv)
    }
}


/* for(let board of basicBoards) {
    let testTask = new Task('First tusk', 'My first tusk', 'Today', '12:00', '15:00')
    board.tasks.push(testTask)
    console.log(board.tasks)
} */

let todolist = document.querySelector('.todo-list')
todolist.addEventListener('click', (ev) => {
    if(ev.target.classList.contains('task-creator')) {
        let curBoard = ev.target.parentElement
        while(!curBoard.classList.contains('board')) {
            curBoard = curBoard.parentElement
        }
        let task = new Task(curBoard)
    }

    if(ev.target.classList.contains('board-creator')) {
        let curTodoList = ev.target.parentElement
        while(!curTodoList.classList.contains('todo-list')) {
            curTodoList = curTodoList.parentElement
        }
        let board = new Board('New board', [], '007CFF')
    }

    if(ev.target.classList.contains('lock')) {
        changeDraggingState(ev.target.parentElement)
    }

    if(ev.target.classList.contains('task-name')) {
        if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
            let input = document.createElement('input')
            input.type = 'text'
            input.classList.add('task-name')
            input.innerHTML = ev.target.innerHTML
    
            let inputStyle = getComputedStyle(ev.target)
            input.style.width = `${inputStyle.width}`
            input.value = `${ev.target.innerHTML}`
    
            ev.target.classList.add('display')

            ev.target.before(input)

            input.focus()
    
            input.addEventListener('focusout', () => {
                let newVal = input.value
                input.remove()
                if(newVal) ev.target.innerHTML = newVal
                else ev.target.innerHTML = "Enter name"
                ev.target.classList.remove('display')
            })
        }  
    }
    if(ev.target.classList.contains('task-description')) {
        if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
            let input = document.createElement('input')
            input.type = 'text'
            input.classList.add('task-description')
            input.innerHTML = ev.target.innerHTML
    
            let inputStyle = getComputedStyle(ev.target)
            input.style.width = `${inputStyle.width}`
            input.value = `${ev.target.innerHTML}`
    
            ev.target.classList.add('display')

            ev.target.before(input)

            input.focus()
    
            input.addEventListener('focusout', () => {
                let newVal = input.value
                input.remove()
                if(newVal) ev.target.innerHTML = newVal
                else ev.target.innerHTML = "Enter description"
                ev.target.classList.remove('display')
            })
        }  
    }
    if(ev.target.classList.contains('day')) {
        if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
            let input = document.createElement('input')
            input.type = 'text'
            input.classList.add('day')
            input.innerHTML = ev.target.innerHTML
    
            let inputStyle = getComputedStyle(ev.target)
            input.style.width = `${parseInt(inputStyle.width)+50}px`
            input.value = `${ev.target.innerHTML}`
    
            ev.target.classList.add('display')

            ev.target.before(input)

            input.focus()
    
            input.addEventListener('focusout', () => {
                let newVal = input.value
                input.remove()
                if(newVal) ev.target.innerHTML = newVal
                else ev.target.innerHTML = "Enter day"
                ev.target.classList.remove('display')
            })
        }  
    }
    if(ev.target.classList.contains('time')) {
        if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
            let input = document.createElement('input')
            input.type = 'text'
            input.classList.add('time')
            input.innerHTML = ev.target.innerHTML
    
            let inputStyle = getComputedStyle(ev.target)
            input.style.width = `${parseInt(inputStyle.width)+50}px`
            input.value = `${ev.target.innerHTML}`
    
            ev.target.classList.add('display')

            ev.target.before(input)

            input.focus()
    
            input.addEventListener('focusout', () => {
                let newVal = input.value
                input.remove()
                if(newVal) ev.target.innerHTML = newVal
                else ev.target.innerHTML = "Enter time"
                ev.target.classList.remove('display')
            })
        }  
    }
})

todolist.addEventListener('dblclick', (ev) => {
    if(ev.target.classList.contains('lock')) {
        let locks = document.querySelectorAll('.lock')
        if(ev.target.classList.contains('closed')) {
            for(let lock of locks) {
                lock.parentElement.draggable = true
                lock.src = "icons/unlock.png"

            }   
        }
        else {
            for(let lock of locks) {
                lock.parentElement.draggable = false
                lock.src = "icons/lock.png"
            }
        }
    }
    if(ev.target.classList.contains('board-name')) {
        if(ev.target.tagName != 'INPUT') {
            let input = document.createElement('input')
            input.type = 'text'
            input.classList.add('board-name')
            input.innerHTML = ev.target.innerHTML
    
            let inputStyle = getComputedStyle(ev.target)
            input.style.width = `${parseInt(inputStyle.width)+50}px`
            input.value = `${ev.target.innerHTML}`
    
            ev.target.classList.add('display')

            ev.target.before(input)

            input.focus()
    
            input.addEventListener('focusout', () => {
                let newVal = input.value
                input.remove()
                if(newVal) ev.target.innerHTML = newVal
                else ev.target.innerHTML = "New board"
                ev.target.classList.remove('display')
            })
        }  
    }

})

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

setProfilePicturePostion(document.querySelectorAll('.profile-picture'))

