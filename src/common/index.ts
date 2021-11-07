export function remove<T>(array: T[], item: T | T[]) {
    const items = Array.isArray(item) ? item : [item];

    items.forEach(ele => {
        const index = array.indexOf(ele);
        if (index !== -1) {
            array.splice(index, 1);
        }
    });
}