export function setProfilePicturePostion() {
    let pps = document.querySelectorAll('.profile-picture')
    let left = -15
    for(let el of pps) {
        el.style.right = left + 'px'
        left += 15
    };
}