import React, {useState, useEffect} from "react";
import "./crypto-list.sass";
import {extract_column} from "../../utils/object-utils";
import {sort_numbers, sort_strings} from "../../utils/sort-utils";
import {add_thousands_separator} from "../../utils/format-utils";
import {compare_array} from "../../utils/array-utils";

const currency_symbol = {
    "USD" : "$",
    "EUR" : "€",
    "BTC" : "BTC",
    "LTC" : "LTC"
};

const CryptoList = (props) => {
    const {currency_to_display, crypto_data_to_display} = props;
    const [crypto_list, set_crypto_list] = useState(crypto_data_to_display);
    const [sorted_column, set_sorted_column] = useState("cmc_rank");
    const [reverse_sort, set_reverse_sort] = useState(false);

    useEffect(() => {
       set_crypto_list(crypto_data_to_display);
    });

    const handleSort = (column_to_sort) => {
        return () => {
            const same_column_to_sort = compare_array(column_to_sort, sorted_column);
            set_sorted_column(column_to_sort);
            set_reverse_sort(same_column_to_sort && !reverse_sort);

            const column_type = typeof extract_column(crypto_data_to_display[0], column_to_sort);
            let sort_function;
            if(column_type === "number") {
                sort_function = sort_numbers;
            } else {
                sort_function = sort_strings;
            }
            const new_crypto_list = crypto_data_to_display.sort(sort_function(column_to_sort, reverse_sort));
            set_crypto_list(new_crypto_list);
        }
    };

    const format_column_value = (val, format_thousands) => {
        let result = val;
        if(val && format_thousands){
            result = add_thousands_separator(result.toFixed(2));
        }
        return result;
    };

    return (
        <div className="crypto-list">
            <div className="crypto-table-wrapper">
                <table className="crypto-table">
                    <thead>
                    <tr>
                        <th className="rank-column"
                            onClick={handleSort(["cmc_rank"])}>
                            <span>#</span>
                        </th>
                        <th onClick={handleSort(["name"])}>Name</th>
                        <th className="number-column"
                            onClick={handleSort(["quote",currency_to_display,"market_cap"])}>
                            Market Cap
                        </th>
                        <th className="number-column"
                            onClick={handleSort(["quote",currency_to_display,"price"])}>
                            Price
                        </th>
                        <th className="number-column"
                            onClick={handleSort(["quote",currency_to_display,"volume_24h"])}>
                            Volume (24h)
                        </th>
                        <th className="number-column"
                            onClick={handleSort(["circulating_supply"])}>
                            Circulating Supply
                        </th>
                        <th className="number-column percent-change-column-header"
                            onClick={handleSort(["quote",currency_to_display,"percent_change_24h"])}>
                            Change (24h)
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {crypto_list.map((crypto, index) => {
                        return <tr key={index}>
                            <td className="rank-column">
                                {format_column_value(crypto.cmc_rank, false)}
                            </td>
                            <td>
                                <div className="crypto-name">
                                    <img alt={`Logo ${crypto.name}`}
                                         src={`https://s2.coinmarketcap.com/static/img/coins/16x16/${crypto.id}.png`}/>
                                    {format_column_value(crypto.name)}
                                </div>
                            </td>
                            <td className="number-column">
                                {format_column_value(crypto.quote[currency_to_display]["market_cap"], true)}
                                <span className="symbol">{currency_symbol[currency_to_display]}</span>
                            </td>
                            <td className="number-column">
                                {format_column_value(crypto.quote[currency_to_display]["price"], true)}
                                <span className="symbol">{currency_symbol[currency_to_display]}</span>
                            </td>
                            <td className="number-column">
                                {format_column_value(crypto.quote[currency_to_display]["volume_24h"], true)}
                                <span className="symbol">{currency_symbol[currency_to_display]}</span>
                            </td>
                            <td className="number-column">
                                {format_column_value(crypto.circulating_supply, true)}
                                <span className="symbol">{crypto.symbol}</span>
                            </td>
                            <td className="number-column percent-change-column">
                                <div className="percent-change">
                                    <span className={((crypto.quote[currency_to_display]["percent_change_24h"] < 0) && 'turn-down') + " icon-arrow-wrapper"}>
                                        <i className="icon-arrow"/>
                                    </span>
                                    <span className="percent-change-wrapper">
                                        {Math.abs(format_column_value(crypto.quote[currency_to_display]["percent_change_24h"], true))} %
                                    </span>
                                </div>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CryptoList;