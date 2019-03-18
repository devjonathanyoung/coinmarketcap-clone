const fs = require("fs");

const outfile = __dirname + "/mock-coinmarketcap.json";
const files_names = ["BTC", "LTC", "EUR", "USD"];

const files_content = files_names.map((file_name) =>  {
    return JSON.parse(fs.readFileSync(`${__dirname}/mock-coinmarketcap-${file_name}.json` , "utf8")).data;
});

const new_list = [];
for(let i = 0; i < files_content[0].length; i ++){
    const current_currency = files_content[0][i];
    const master_object = {};
    files_content.forEach((file) => {
        const keys = Object.keys(file[i].quote);
        master_object[keys[0]] = file[i].quote[keys[0]];
    });
    current_currency.quote = master_object;
    new_list.push(current_currency);
}

fs.writeFileSync(outfile, JSON.stringify(new_list, null, 4));