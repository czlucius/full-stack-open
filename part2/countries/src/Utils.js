export function isEmpty(object) {
    for (const i in object) return false;
    return true;
}