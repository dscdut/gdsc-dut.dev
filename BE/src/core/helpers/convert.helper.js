export const convertToSnakeCase = obj => Object.keys(obj).reduce((acc, key) => {
    acc[key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)] = obj[key];
    return acc;
}, {});

export const getUniqueElements = (arrA, arrB) => arrB.filter(item => !arrA.includes(item));

export const checkDuplicateElements = arr => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                return true;
            }
        }
    }
    return false;
};
