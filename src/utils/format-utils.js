const add_thousands_separator = (number_to_format = "0") => {
    number_to_format = number_to_format.toString();
    let result = "";

    if(number_to_format.indexOf(".") > -1){
        const int_part = number_to_format.split(".")[0];
        const dec_part = number_to_format.split(".")[1];

        const formated_int_part = int_part.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        result = formated_int_part + "." + dec_part;
    } else {
        result = number_to_format.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return result;
};

export {add_thousands_separator};