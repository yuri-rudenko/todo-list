export function changeNavElState(nav) {
    let lower = nav.querySelector('.lower')
    if(lower.classList.contains('visible')) {
        lower.classList.add('not-visible')
        lower.classList.remove('visible')
    }
    else {
        lower.classList.add('visible')
        lower.classList.remove('not-visible')
    }
}