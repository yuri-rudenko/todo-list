import { changeNavElState } from "./scripts/nav-scripts/changeNavElState.js"
import { makeNewSpaceVisible } from "./scripts/nav-scripts/newSpaceVisibility.js"
import { draggingTasks } from "./scripts/main-scripts/draggingTasks.js"
import { changeDraggingState } from "./scripts/main-scripts/changeDragginState.js"
import { setProfilePicturePostion } from "./scripts/main-scripts/setProfilePicturePostion.js"
import { createNewWorkspace } from "./scripts/logic/createNewWorkspace.js"
import { getDragAfterElement } from "./scripts/main-scripts/draggingTasks.js"
import { rgbHex } from "./scripts/logic/rgbHex.js"
import { undrawWorkspace } from "./scripts/logic/undrawWorkspace.js"

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
    activeWorkspace: 0,
    files: [],
    people: [
        './img/profile-pictures/1.jpg',
        './img/profile-pictures/2.jpg',
        './img/profile-pictures/3.jpg',
        './img/profile-pictures/4.jpg',
        './img/profile-pictures/5.jpg',
        './img/profile-pictures/6.jpg',
        './img/profile-pictures/7.png',
        './img/profile-pictures/8.jpg',
        './img/profile-pictures/9.jpg',
        './img/profile-pictures/10.jpg',
        './img/profile-pictures/11.jpg',
        './img/profile-pictures/12.jpg',
        './img/profile-pictures/13.jpg',
    ],

}

class Workspace {
    constructor(name, subthemes, boards, color) {
        this.name = name
        this.subthemes = subthemes
        this.description = "New workspace. You can change the description in the settings tab"
        this.assigned = [main.people[1], main.people[5], main.people[6]]
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

        let curNav = navEl
            let navEls = nav.querySelectorAll('.nav-el')
            while(!curNav.classList.contains('nav-el')) {
                curNav = curNav.parentElement
                if(curNav.classList.contains('wrapper')) return
            }
            
            lower.classList.add('visible')
            curNav.classList.add('current')
            
            if(lower.classList.contains('visible')) {
                for(let el of navEls) {
                    if(!el.classList.contains('current')) {
                        let curLower = el.querySelector('.lower')
                        curLower.classList.remove('visible')

                        let textRemove = el.querySelector('.upper .lefters .workspace-name')
                        textRemove.classList.remove('f8000AB')
                        textRemove.classList.remove('f674EE3')
                        textRemove.classList.remove('fF8B33C')
                        textRemove.classList.remove('f007CFF')
                        textRemove.classList.remove('f20A475')
                        textRemove.classList.remove('fFF9392')
                    }
                }
            }

            curNav.classList.remove('current')
            
            let lowerColor = lower.classList[1]
            let fontFromLower = 'f' + lowerColor.slice(1)

            let text = curNav.querySelector('.upper .lefters .workspace-name')

            text.classList.add(fontFromLower)


        navEl.addEventListener('click', (ev) => {

            let curNav = navEl
            let navEls = nav.querySelectorAll('.nav-el')
            while(!curNav.classList.contains('nav-el')) {
                curNav = curNav.parentElement
                if(curNav.classList.contains('wrapper')) return
            }
            
            lower.classList.add('visible')
            curNav.classList.add('current')
            
            if(lower.classList.contains('visible')) {
                for(let el of navEls) {
                    if(!el.classList.contains('current')) {
                        let curLower = el.querySelector('.lower')
                        curLower.classList.remove('visible')

                        let textRemove = el.querySelector('.upper .lefters .workspace-name')
                        textRemove.classList.remove('f8000AB')
                        textRemove.classList.remove('f674EE3')
                        textRemove.classList.remove('fF8B33C')
                        textRemove.classList.remove('f007CFF')
                        textRemove.classList.remove('f20A475')
                        textRemove.classList.remove('fFF9392')
                    }
                }
            }

            curNav.classList.remove('current')
            
            let lowerColor = lower.classList[1]
            let fontFromLower = 'f' + lowerColor.slice(1)

            let text = curNav.querySelector('.upper .lefters .workspace-name')

            text.classList.add(fontFromLower)
            
            undrawWorkspace()

            this.drawWorkspace()
        })
        

    }

    drawWorkspace() {
        let name = document.querySelector('.description .name p')
        name.innerHTML = this.name

        let logo = document.querySelector('.description .name img')
        logo.src = `icons/figures/figure${this.color}.png`

        let description = document.querySelector('.description .work-description p')
        description.innerHTML = this.description

        let todoList = document.querySelector('.todo-list')

        let addBoard = document.createElement('div')
        addBoard.classList.add('add-board')

        let imagesContainer = document.querySelector('.images-container')
        for(let pfp of this.assigned) {
            imagesContainer.insertAdjacentHTML('beforeend', `<img src="${pfp}" alt="" class="profile-picture"></img>`)
        }

        let adder = document.createElement('div')
        adder.classList.add('adder','board-creator')
        adder.insertAdjacentHTML('beforeend', '<p class="add-task board-creator">Add Board</p>')
        adder.insertAdjacentHTML('beforeend', '<p class="plus board-creator">+</p>')
        let deleter = document.createElement('div')
        deleter.classList.add('deleter', 'trash')
        deleter.insertAdjacentHTML('beforeend', '<img src="icons/trash.png" alt="" class="trash">')
        deleter.insertAdjacentHTML('beforeend', '<p class="trash">Delete task</p>')
        
        addBoard.append(adder, deleter)
        todoList.append(addBoard)

        let trash = document.querySelectorAll('.trash')

        for(let cont of trash) {
            cont.addEventListener('dragover', (ev) => {
                ev.preventDefault()
                const afterEl = getDragAfterElement(cont, ev.clientY)
                const draggable = document.querySelector('.dragging')
                draggable.classList.add("display")
                if(afterEl == null) {
                    cont.appendChild(draggable)
                }
                else {
                    cont.insertBefore(draggable, afterEl)
                }
            })
            
        }

        let i = 0

        for(let board of this.boards) {
            this.boards[i].drawBoard()
            i++
        }

        adder.addEventListener('click', (ev) => {       
            if(ev.target.classList.contains('board-creator')) {
                let curTodoList = ev.target.parentElement
                while(!curTodoList.classList.contains('todo-list')) {
                    curTodoList = curTodoList.parentElement
                }
                this.boards.push(new Board('New board', [], '007CFF'))
            }
        })
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
        naming.insertAdjacentHTML('beforeend', `<div class="sphere b${this.color}" style="background-color:#${this.color}"></div>`)
        naming.insertAdjacentHTML('beforeend', `<p class="board-name">${this.name}</p>`)
        
        let adder = document.createElement('div')
        adder.classList.add('adder', 'task-creator')
        adder.insertAdjacentHTML('beforeend', `<p class="add-task task-creator">Add Task</p>`)
        adder.insertAdjacentHTML('beforeend', `<p class="plus task-creator">+</p>`)

        adder.addEventListener('click', (ev) => {
            if(ev.target.classList.contains('task-creator')) {
                let curBoard = ev.target.parentElement
                while(!curBoard.classList.contains('board')) {
                    curBoard = curBoard.parentElement
                }
                let createdTask = new Task(curBoard)
                this.tasks.unshift(createdTask)
                createdTask.addTask(curBoard)
            }
        })

        let tasks = document.createElement('div')
        tasks.classList.add('tasks')

        tasks.addEventListener('dragover', (ev) => {
            ev.preventDefault()
            const afterEl = getDragAfterElement(tasks, ev.clientY)
            const draggable = document.querySelector('.dragging')
            draggable.classList.remove("display")
            if(afterEl == null) {
                tasks.appendChild(draggable)
            }
            else {
                tasks.insertBefore(draggable, afterEl)
            }
        }) 

        tasks.addEventListener('dragenter', (ev) => {
            let tasks = ev.target
            while(!tasks.classList.contains('tasks')) {
                tasks = tasks.parentElement
            }
            
            let taskEls = tasks.querySelectorAll('.task')
            this.tasks = []
            for(let task of taskEls) {
                let name = task.querySelector('.task-name').innerHTML
                let description = task.querySelector('.task-description').innerHTML
                let date = task.querySelector('.day').innerHTML
                let time = task.querySelector('.time').innerHTML
                this.tasks.push(new Task(board, name, description, date, time))
            }
        })
        tasks.addEventListener('dragleave', (ev) => {
            let tasks = ev.target
            while(!tasks.classList.contains('tasks')) {
                tasks = tasks.parentElement
            }
            
            setTimeout(() => {
                let taskEls = tasks.querySelectorAll('.task')
            this.tasks = []
            for(let task of taskEls) {
                let name = task.querySelector('.task-name').innerHTML
                let description = task.querySelector('.task-description').innerHTML
                let date = task.querySelector('.day').innerHTML
                let time = task.querySelector('.time').innerHTML
                this.tasks.push(new Task(board, name, description, date, time))
            }
            }, 500)
            
        })

        board.append(naming)
        board.append(adder)
        board.append(tasks)

        naming.addEventListener('click', (ev) => {
            if(ev.target.classList.contains('sphere')) {

                let input = document.createElement('input')
                input.type = 'color'
                input.classList.add('sphere-color')
                input.innerHTML = ev.target.innerHTML
                
                if(ev.target.tagName != 'INPUT') {
                    let color = '#'+ this.color
                    input.value = color
                }

                ev.target.classList.add('display')
            
                ev.target.before(input)
            
                input.focus()
                
                input.addEventListener('focusout', () => {
                    let newVal = input.value
                    input.remove()
                    if(newVal) ev.target.style.backgroundColor = newVal
                    this.color = rgbHex(ev.target.style.backgroundColor.slice(4, -1)).slice(1)
                    ev.target.classList.remove('display')
                })
            }
        })

        board.addEventListener('dblclick', (ev) => {
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
                        this.name = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
        })

        let todolist = document.querySelector('.add-board')
        todolist.before(board)
    }

    drawBoard() {
        let board = document.createElement('div')
        board.classList.add('board')

        let naming = document.createElement('div')
        naming.classList.add('naming')
        naming.insertAdjacentHTML('beforeend', `<div class="sphere b${this.color}" style="background-color:#${this.color}"></div>`)
        naming.insertAdjacentHTML('beforeend', `<p class="board-name">${this.name}</p>`)
        
        let adder = document.createElement('div')
        adder.classList.add('adder', 'task-creator')
        adder.insertAdjacentHTML('beforeend', `<p class="add-task task-creator">Add Task</p>`)
        adder.insertAdjacentHTML('beforeend', `<p class="plus task-creator">+</p>`)

        adder.addEventListener('click', (ev) => {
            if(ev.target.classList.contains('task-creator')) {
                let curBoard = ev.target.parentElement
                while(!curBoard.classList.contains('board')) {
                    curBoard = curBoard.parentElement
                }
                let createdTask = new Task(curBoard)
                this.tasks.unshift(createdTask)
                createdTask.addTask(curBoard)
            }
        })

        naming.addEventListener('click', (ev) => {
            if(ev.target.classList.contains('sphere')) {

                let input = document.createElement('input')
                input.type = 'color'
                input.classList.add('sphere-color')
                input.innerHTML = ev.target.innerHTML
                
                if(ev.target.tagName != 'INPUT') {
                    let color = '#'+ this.color
                    input.value = color
                }

                ev.target.classList.add('display')
            
                ev.target.before(input)
            
                input.focus()
                
                input.addEventListener('focusout', () => {
                    let newVal = input.value
                    input.remove()
                    if(newVal) ev.target.style.backgroundColor = newVal
                    this.color = rgbHex(ev.target.style.backgroundColor.slice(4, -1)).slice(1)
                    ev.target.classList.remove('display')
                })
            }
        })
           
        let tasks = document.createElement('div')
        tasks.classList.add('tasks')

        tasks.addEventListener('dragenter', (ev) => {
            let tasks = ev.target
            while(!tasks.classList.contains('tasks')) {
                tasks = tasks.parentElement
            }
            
            let taskEls = tasks.querySelectorAll('.task')
            this.tasks = []
            for(let task of taskEls) {
                let name = task.querySelector('.task-name').innerHTML
                let description = task.querySelector('.task-description').innerHTML
                let date = task.querySelector('.day').innerHTML
                let time = task.querySelector('.time').innerHTML
                this.tasks.push(new Task(board, name, description, date, time))
            }
        })


        tasks.addEventListener('dragleave', (ev) => {
            let tasks = ev.target
            while(!tasks.classList.contains('tasks')) {
                tasks = tasks.parentElement
            }
            
            setTimeout(() => {
                let taskEls = tasks.querySelectorAll('.task')
            this.tasks = []
            for(let task of taskEls) {
                let name = task.querySelector('.task-name').innerHTML
                let description = task.querySelector('.task-description').innerHTML
                let date = task.querySelector('.day').innerHTML
                let time = task.querySelector('.time').innerHTML
                this.tasks.push(new Task(board, name, description, date, time))
            }
            }, 500)
            
        })

        board.append(naming)
        board.append(adder)
        board.append(tasks)

        board.addEventListener('dblclick', (ev) => {
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
                        this.name = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
        })

        let j = 0

        for(let task of this.tasks) {
            this.tasks[j].drawTask(board)
            j++
        }

        tasks.addEventListener('dragover', (ev) => {
            ev.preventDefault()
            const afterEl = getDragAfterElement(tasks, ev.clientY)
            const draggable = document.querySelector('.dragging')
            draggable.classList.remove("display")
            if(afterEl == null) {
                tasks.appendChild(draggable)
            }
            else {
                tasks.insertBefore(draggable, afterEl)
            }
        })

        let addBoard = document.querySelector('.add-board')
        addBoard.before(board)
    }

}


class Task {
    constructor(curBoard, name = 'Enter name', description = 'Enter description', day = 'Enter date', time = 'Enter time') {
        this.name = name
        this.description = description 
        this.day = day
        this.time = time
        this.parentBoard = curBoard
        this.lock = false
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

        taskDiv.addEventListener('dragstart', () => {
            taskDiv.classList.add('dragging')
        })
        taskDiv.addEventListener('dragend', () => {
            if(taskDiv.classList.contains('display')) {
                taskDiv.remove()
            }
            taskDiv.classList.remove('dragging')
        })

        taskDiv.addEventListener('click', (ev) => {
            if(ev.target.classList.contains('lock')) {
                changeDraggingState(ev.target.parentElement)
                this.lock = !this.lock
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
                        this.name = `${ev.target.innerHTML}`
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
                        this.description = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
            if(ev.target.classList.contains('day')) {
                if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
                    let input = document.createElement('input')
                    input.type = 'date'
                    input.classList.add('day')
                    
                    input.value = `2023-${ev.target.innerHTML}`
                    console.log(input.value)
            
                    let inputStyle = getComputedStyle(ev.target)
                    input.style.width = `${parseInt(inputStyle.width)+50}px`
            
                    ev.target.classList.add('display')
        
                    ev.target.before(input)
        
                    input.focus()
            
                    input.addEventListener('focusout', () => {
                        let newVal = input.value.slice(5)
                        input.remove()
                        if(newVal) ev.target.innerHTML = newVal
                        else ev.target.innerHTML = "Enter day"
                        this.day = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
            if(ev.target.classList.contains('time')) {
                if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
                    let input = document.createElement('input')
                    input.type = 'time'
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
                        this.time = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
        })

        taskDiv.addEventListener('dblclick', (ev) => {
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
        })

        let tasks = board.querySelector('.tasks')
        tasks.prepend(taskDiv)
    }

    drawTask(board) {

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

        taskDiv.addEventListener('click', (ev) => {
            if(ev.target.classList.contains('lock')) {
                changeDraggingState(ev.target.parentElement)
                this.lock = !this.lock
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
                        this.name = `${ev.target.innerHTML}`
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
                        this.description = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
            if(ev.target.classList.contains('day')) {
                if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
                    let input = document.createElement('input')
                    input.type = 'date'
                    input.classList.add('day')
                    input.value = `2023-${ev.target.innerHTML}`
            
                    let inputStyle = getComputedStyle(ev.target)
                    input.style.width = `${parseInt(inputStyle.width)+50}px`
            
                    ev.target.classList.add('display')
        
                    ev.target.before(input)
        
                    input.focus()
            
                    input.addEventListener('focusout', () => {
                        let newVal = input.value
                        input.remove()
                        if(newVal) ev.target.innerHTML = newVal
                        else ev.target.innerHTML = "Enter day"
                        this.day = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
            if(ev.target.classList.contains('time')) {
                if(ev.target.parentElement.parentElement.draggable == false && ev.target.tagName != 'INPUT') {
                    let input = document.createElement('input')
                    input.type = 'time'
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
                        this.time = `${ev.target.innerHTML}`
                        ev.target.classList.remove('display')
                    })
                }  
            }
        })

        taskDiv.addEventListener('dblclick', (ev) => {
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
        })

        tasks.prepend(taskDiv)
    }
}

let basicBoards = [new Board('Todos', [], '007CFF'), new Board('In Progress', [], 'cccccc'),new Board('Is Done', [], `20A475`)]
let newWorkspace = new Workspace('New Workspace', ['Testing', 'Showcase'], basicBoards, colors[colorCounter])

document.querySelector('.workspace-name').classList.add('f007CFF')
document.querySelector('.lower').classList.add('visible')

undrawWorkspace()
newWorkspace.drawWorkspace()
main.workspaces.push(newWorkspace)
colorCounter++

let submit = document.getElementsByClassName('submit-new-workspace')
submit[0].addEventListener('click', () => {
    colorCounter = createNewWorkspace(colors, colorCounter, Board, Workspace, main)
})

let workspace = document.querySelector('.workspaces')
let createSpace = document.querySelector('.create')


createSpace.addEventListener('click', makeNewSpaceVisible)

let tasks = document.querySelectorAll('.task')
let containers = document.querySelectorAll('.tasks')

draggingTasks(tasks, containers)

setProfilePicturePostion(document.querySelectorAll('.profile-picture'))

