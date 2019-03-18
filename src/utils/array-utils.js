const compare_array = (arr1, arr2) => {
    return arr1.length === arr2.length && arr1.every(e => arr2.includes(e));
};

export {
    compare_array
}