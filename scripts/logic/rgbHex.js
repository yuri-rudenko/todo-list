const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export function rgbHex(rgb) {
    let arr = rgb.split(',').map((num) => parseInt(num))
    return "#" + componentToHex(arr[0]) + componentToHex(arr[1]) + componentToHex(arr[2]);
}