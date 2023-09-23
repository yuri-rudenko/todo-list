export function drawSettings(Work) {
    let template = document.querySelector('#settings-template')
    const settings = document.importNode(template.content, true).querySelector('.settings')

    let name = settings.querySelector('.name-change input')
    let desc = settings.querySelector('.description-change textarea')
    name.value = Work.name
    desc.value = Work.description

    let tags = settings.querySelector('.cur-tags')
    settings.classList.add('display')
    for(let tag of Work.tags) {
        let tagWrapper = document.createElement('div')
        tagWrapper.classList.add('tag')

        let tagDel = document.createElement('div')
        tagDel.classList.add('delete-tag')

        tagDel.insertAdjacentHTML('beforeend', `<p>${tag}</p>`)
        tagDel.insertAdjacentHTML('beforeend', `<div class="delete-tag-button"><p>×</p></div>`)

        tagWrapper.append(tagDel)

        tags.append(tagWrapper)
    }

    let boards = settings.querySelector('.remove-boards .visible-boards')

    for(let board of Work.boards) {
        let boardEl = document.createElement('label')
        boardEl.classList.add('board-checkbox')
        boardEl.insertAdjacentHTML('beforeend', `<input type="checkbox">`)
        boardEl.insertAdjacentHTML('beforeend', `<p>${board.name}</p>`)

        if(board.visible) {
            boardEl.querySelector('input').checked = true
        }

        boards.append(boardEl)
    }
    
    document.querySelector('#settings-template').before(settings)
}

export function updateSettings(Work) {
    let name = document.querySelector('.name-change input')
    let desc = document.querySelector('.description-change textarea')
    name.value = Work.name
    desc.value = Work.description
    
    let tags = document.querySelector('.cur-tags')
    tags.innerHTML = ''
    
    for(let tag of Work.tags) {
        let tagWrapper = document.createElement('div')
        tagWrapper.classList.add('tag')

        let tagDel = document.createElement('div')
        tagDel.classList.add('delete-tag')

        tagDel.insertAdjacentHTML('beforeend', `<p>${tag}</p>`)
        tagDel.insertAdjacentHTML('beforeend', `<div class="delete-tag-button"><p>×</p></div>`)

        tagWrapper.append(tagDel)

        tags.append(tagWrapper)
    }

    let boards = document.querySelector('.remove-boards .visible-boards')
    boards.innerHTML = ''

    for(let board of Work.boards) {
        let boardEl = document.createElement('label')
        boardEl.classList.add('board-checkbox')
        boardEl.insertAdjacentHTML('beforeend', `<input type="checkbox">`)
        boardEl.insertAdjacentHTML('beforeend', `<p>${board.name}</p>`)

        if(board.visible) {
            boardEl.querySelector('input').checked = true
        }

        boards.append(boardEl)
    }
}