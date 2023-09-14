export function draggingTasks(draggables, containers) {

    let trash = document.querySelectorAll('.trash')

    for(let el of draggables) {
        el.addEventListener('dragstart', () => {
            el.classList.add('dragging')
        })
        el.addEventListener('dragend', () => {
            if(el.classList.contains('display')) {
                el.remove()
            }
            el.classList.remove('dragging')
        })
    }
    
    for(let cont of containers) {
        cont.addEventListener('dragover', (ev) => {
            ev.preventDefault()
            const afterEl = getDragAfterElement(cont, ev.clientY)
            const draggable = document.querySelector('.dragging')
            draggable.classList.remove("display")
            if(afterEl == null) {
                cont.appendChild(draggable)
            }
            else {
                cont.insertBefore(draggable, afterEl)
            }
        })
        
    }
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
    
    function getDragAfterElement(container, y) {
        const dragableEls = [...container.querySelectorAll('.task:not(.dragging)')]
    
        return dragableEls.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if(offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child}
            }
            else {
                return closest
            }
        }, {offset: Number.NEGATIVE_INFINITY}).element
    }
}

export function getDragAfterElement(container, y) {
    const dragableEls = [...container.querySelectorAll('.task:not(.dragging)')]

    return dragableEls.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2
        if(offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        }
        else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}