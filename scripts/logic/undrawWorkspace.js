export function undrawWorkspace() {
    let boards = document.querySelectorAll('.board')
    let addBoard = document.querySelector('.add-board')
    for(let board of boards) {
        board.remove()
    }
    addBoard.remove()
    document.querySelector('.images-container').innerHTML = ''
}