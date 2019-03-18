const extract_column = (line, arr_col_ref) => {
    let column = line;
    arr_col_ref.forEach(ref => {
        column = column[ref];
    });
    return column;
};

export {extract_column};