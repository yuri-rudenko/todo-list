export function undrawWorkspace() {
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


}