export function makeNewSpaceVisible() {
    
    let pop = document.getElementsByClassName('pop-up-workspace')
    let subthemes = document.getElementsByClassName('subtheme')
    let name = document.querySelector('.create-workspace .name')
    let cross = document.querySelector('.pop-up-workspace-wrapper .cross-small')
    cross.style.bottom = "50px"
    pop[0].classList.remove('display')

    let close = document.getElementsByClassName('cross-small')
    close[0].addEventListener('click', () => {
        for(let sub of subthemes) {
            sub.value = ''
        }
        name.value = ''
        subthemes[1].classList.add('display')
        subthemes[2].classList.add('display')
        pop[0].classList.add('display')
    })

    name.focus()
    
    
    document.addEventListener('keypress', () => {
        if(subthemes[0].value) {
            subthemes[1].classList.remove('display')
            cross.style.bottom = "20px"
        }
        if(subthemes[1].value) {
            subthemes[2].classList.remove('display')
            cross.style.bottom = "-10px"
        }
        if(name == document.activeElement) {
            name.classList.remove('small-length')
        }
    })
    
    for(let sub of subthemes) {
        sub.addEventListener('focusout', () => {
            if(sub.classList.contains('first')) {
                if(sub.value) {
                    subthemes[1].classList.remove('display')
                    cross.style.bottom = "20px"
                }
                if(!sub.value) {
                    subthemes[1].classList.add('display')
                    subthemes[2].classList.add('display')
                    subthemes[1].value = ''
                    subthemes[2].value = ''
                    cross.style.bottom = "50px"
                }
            }
            if(sub.classList.contains('second')) {
                if(sub.value) {
                    subthemes[2].classList.remove('display')
                    cross.style.bottom = "-10px"
                }
                else {
                    subthemes[1].classList.add('display')
                    cross.style.bottom = "50px"
                }
                if(!sub.value) {
                    subthemes[2].classList.add('display')
                    subthemes[2].value = ''
                }
            }
            if(sub.classList.contains('third')) {
                if(!sub.value) {
                    sub.classList.add('display')
                    cross.style.bottom = "20px"
                }
            }
        })
    }
    
}