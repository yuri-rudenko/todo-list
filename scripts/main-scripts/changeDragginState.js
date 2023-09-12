export function changeDraggingState(task) {

    let lock = task.querySelector('.lock')

    if(task.draggable) {
        task.draggable = false
        lock.src = "icons/lock.png"
    }
    else {
        task.draggable = true
        lock.src = "icons/unlock.png"
    }
}