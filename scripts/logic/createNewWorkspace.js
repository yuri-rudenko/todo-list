export function createNewWorkspace(colors, colorCounter, Board, Workspace, main) {

    let subthemes = document.getElementsByClassName('subtheme')
    let name = document.querySelector('.create-workspace .name')

    if(name.value.length < 1) {
        name.classList.add('small-length')
        return colorCounter
    }

    let resSubthemes = []
    for(let sub of subthemes) {
        if(sub.value) resSubthemes.push(sub.value)
    }

    
    let basicBoards = [new Board('Todos', [], '007CFF'), new Board('In Progress', [], 'cccccc'),new Board('Is Done', [], `20A475`)]

    let boards = document.querySelectorAll('.board')
    let addBoard = document.querySelector('.add-board')
    for(let board of boards) {
        board.remove()
    }
    addBoard.remove()
    document.querySelector('.images-container').innerHTML = ''
    let leftAssign = document.getElementsByClassName('left-assign')[0]
    let rightAssign = document.getElementsByClassName('right-assign')[0]
    leftAssign.innerHTML = '<p>Assigned people</p>'
    rightAssign.innerHTML = '<p>Add people</p>'
    document.querySelector('.work-info .description').innerHTML = ''
    document.querySelector('.date').innerHTML = ''
    document.querySelector('.options').remove()
    document.querySelector('.tags-el').innerHTML = ''
    
    let settings = document.getElementsByClassName('settings')

    if(settings) {
        for(let sett of settings) {
            sett.remove()
        }
        
    }

    const workspace = new Workspace(name.value, resSubthemes, basicBoards, colors[colorCounter])
    workspace.drawWorkspace() 

    main.workspaces.push(workspace)

    for(let sub of subthemes) {
        sub.value = ''
    }
    name.value = ''
    name.focus()

    if(colorCounter == 5) return 0
    else return colorCounter+1
    
}