export function setProfilePicturePostion() {
    let pps = document.querySelectorAll('.profile-picture')
    let add = document.querySelector('.details .assign .add-container')
    let absolute = -15
    if(pps.length > 5) absolute -=5
    if(pps.length > 10) absolute -=2
    let left = absolute
    for(let el of pps) {
        el.style.right = left + 'px'
        left -= absolute
    };
    add.style.right = left-25 + 'px'
}