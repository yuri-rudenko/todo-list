export function createNewWorkspace(colors, colorCounter, Board, Workspace, main) {
    let subthemes = document.getElementsByClassName('subtheme')
    let name = document.querySelector('.create-workspace .name').value
    let resSubthemes = []
    for(let sub of subthemes) {
        if(sub.value) resSubthemes.push(sub.value)
    }

    let basicBoards = [new Board('Todos'), new Board('In Progress'),new Board('Is Done')]

    
    const workspace = new Workspace(name, resSubthemes, basicBoards, colors[colorCounter])

    main.workspaces.push(workspace)

    if(colorCounter == 6) return 0
    else return colorCounter+1
    
}