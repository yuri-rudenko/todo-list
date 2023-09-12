export function setProfilePicturePostion(pps) {
    let left = -15
    for(let el of pps) {
        el.style.right = left + 'px'
        left += 15
    };
}