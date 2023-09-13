export function changeDraggingState(task) {

    let lock = task.querySelector('.lock')

    if(task.draggable) {
        task.draggable = false
        lock.src = "icons/lock.png"
        lock.classList.add('closed')
    }
    else {
        task.draggable = true
        lock.src = "icons/unlock.png"
        lock.classList.remove('closed')
    }
}