export function makeNewSpaceVisible() {
    let pop = document.getElementsByClassName('pop-up-workspace')
    pop[0].classList.remove('display')

    let close = document.getElementsByClassName('cross-small')
    close[0].addEventListener('click', () => {
        pop[0].classList.add('display')
    })
}