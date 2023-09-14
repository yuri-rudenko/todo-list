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

    
    let basicBoards = [new Board('Todos'), new Board('In Progress'),new Board('Is Done')]

    let boards = document.querySelectorAll('.board')
    let addBoard = document.querySelector('.add-board')
    for(let board of boards) {
        board.remove()
    }
    addBoard.remove()

    const workspace = new Workspace(name.value, resSubthemes, basicBoards, colors[colorCounter])
    workspace.drawWorkspace() 

    main.workspaces.push(workspace)

    for(let sub of subthemes) {
        sub.value = ''
    }
    name.value = ''

    if(colorCounter == 5) return 0
    else return colorCounter+1
    
}