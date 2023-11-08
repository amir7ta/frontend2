export const KeysToLowerCase = (obj) => {

    const x = {};
    for (const [key, value] of Object.entries(obj)) {
        x[key.toUpperCase()] = value;
    }
    return x;
}
export const RowStripedStyle = (index) => {
    return { background: index % 2 ? "rgb(207 230 255)" : 'rgb(223 223 223 / 38%)' ,zIndex:-2};
}