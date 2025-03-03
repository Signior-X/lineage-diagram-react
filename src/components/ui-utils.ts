export const getNodeWidth = (title: string) => {
    let width = 200;
    if (title.length > 10) {
        width = Math.max(width, title.length * 12 + 20);
    }

    return width;
}