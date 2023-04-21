export const convertToSnakeCase = obj => Object.keys(obj).reduce((acc, key) => {
    acc[key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)] = obj[key];
    return acc;
}, {});
