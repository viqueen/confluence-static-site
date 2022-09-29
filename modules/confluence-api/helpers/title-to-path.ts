export const titleToPath = (title: string): string => {
    const noSpaces = title.replace(/\s+/g, '-');
    return noSpaces.replace(/[,?]/g, '');
};
