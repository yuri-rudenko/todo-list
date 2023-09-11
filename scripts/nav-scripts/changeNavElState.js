export function changeNavElState(nav, navEls) {
    let lower = nav.querySelector('.lower')
    lower.classList.toggle('visible')
    nav.classList.add('current')
    
    if(lower.classList.contains('visible')) {
        for(let el of navEls) {
            if(!el.classList.contains('current')) {
                let curLower = el.querySelector('.lower')
                curLower.classList.remove('visible')

                let textRemove = el.querySelector('.upper .lefters .workspace-name')
                textRemove.classList.remove('f8000AB')
                textRemove.classList.remove('f674EE3')
                textRemove.classList.remove('fF8B33C')
                textRemove.classList.remove('f007CFF')
                textRemove.classList.remove('f20A475')
                textRemove.classList.remove('fFF9392')
            }
        }
    }

    nav.classList.remove('current')

    

    let lowerColor = lower.classList[1]
    let fontFromLower = 'f' + lowerColor.slice(1)

    let text = nav.querySelector('.upper .lefters .workspace-name')

    text.classList.toggle(fontFromLower)
}