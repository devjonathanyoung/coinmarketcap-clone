import {extract_column} from "./object-utils";

const sort_numbers = (column_to_sort, reverse = false) => {
    return (a, b) => {
        const a_col = extract_column(a, column_to_sort);
        const b_col = extract_column(b, column_to_sort);
        let result = 0;
        if (a_col < b_col) {
            result = -1;
        } else if (a_col > b_col) {
            result = 1;
        }
        if(reverse) {
            result *= -1;
        }
        return result;
    };
};

const sort_strings = (column_to_sort, reverse = false) => {
    return (a, b) => {
        const a_col = extract_column(a, column_to_sort);
        const b_col = extract_column(b, column_to_sort);
        let result = a_col.localeCompare(b_col);
        if(reverse){
            result *= -1;
        }
        return result;
    }
};


export {sort_numbers, sort_strings};