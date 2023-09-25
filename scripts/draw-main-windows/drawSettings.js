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
        tagDel.insertAdjacentHTML('beforeend', `<div class="delete-tag-button"><p class="del-tag-cross">×</p></div>`)

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

    /// add logic

    let addTag = settings.querySelector('.submit-new-tag')
    addTag.addEventListener('click', () => {
        let tagName = settings.querySelector('.add-tag input')
        console.log(tagName)
        if(tagName.value.length > 0) {
            let newTag = document.createElement('div')
            newTag.classList.add('tag')
            let delTag = document.createElement('div')
            delTag.classList.add('delete-tag')
            delTag.insertAdjacentHTML('beforeend', `<p>${tagName.value}</p><div class="delete-tag-button"><p class="del-tag-cross">×</p></div>`)
            newTag.append(delTag)
            tags.append(newTag)
        }

        tagName.value = ''
    })

    tags.addEventListener('click', (ev) => {
        if(ev.target.classList.contains('del-tag-cross')) {
            ev.target.parentElement.parentElement.parentElement.remove()
        }
    })

    let sumbit = settings.querySelector('.submit-settings-button')
    sumbit.addEventListener('click', () => {
        if(name.value) {
            let lefters = document.getElementsByClassName('workspace-name')
            for(let left of lefters) {
                if(left.innerHTML == Work.name) {
                    left.innerHTML = name.value
                }
            }

            let bigName = document.querySelector('.description .name p')
            bigName.innerHTML = name.value
            Work.name = name.value
        }

        if(desc.value) {
            Work.description = desc.value
            let description = document.querySelector('.work-description p')
            description.innerHTML = Work.description
        }

        Work.tags = []
        let topTags = document.querySelector('.tags-el')
        topTags.innerHTML = ''
        for(let tag of settings.querySelectorAll('.tag')) {
            let tagText = tag.querySelector('.delete-tag p').innerHTML
            Work.tags.push(tagText)
            topTags.insertAdjacentHTML('beforeend', `<div class="tag">${tagText}</div>`)
        }
        console.log(Work.tags)
    })
    
}
// <div class="delete-tag"></div>

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
        tagDel.insertAdjacentHTML('beforeend', `<div class="delete-tag-button"><p class="del-tag-cross">×</p></div>`)

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