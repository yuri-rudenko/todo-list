export function makeNewSpaceVisible() {
    let pop = document.getElementsByClassName('pop-up-workspace')
    pop[0].classList.remove('display')

    let close = document.getElementsByClassName('cross-small')
    close[0].addEventListener('click', () => {
        pop[0].classList.add('display')
    })
    
    let subthemes = document.getElementsByClassName('subtheme')
    for(let sub of subthemes) {
        sub.addEventListener('focusout', () => {
            if(sub.classList.contains('first')) {
                if(sub.value) {
                    subthemes[1].classList.remove('display')
                }
                if(!sub.value) {
                    subthemes[1].classList.add('display')
                    subthemes[2].classList.add('display')
                    subthemes[1].value = ''
                    subthemes[2].value = ''
                }
            }
            if(sub.classList.contains('second')) {
                if(sub.value) {
                    subthemes[2].classList.remove('display')
                }
                else {
                    subthemes[1].classList.add('display')
                }
                if(!sub.value) {
                    subthemes[2].classList.add('display')
                    subthemes[2].value = ''
                }
            }
            if(sub.classList.contains('third')) {
                if(!sub.value) {
                    sub.classList.add('display')
                }
            }
        })
    }
    
}