import React from "react";
import "./search-crypto.sass";

const SearchCrypto = (props) => {
    const {nb_data_to_display, currency_to_display, handle_search, handle_nb_result_change, handle_currency_change} = props;

    const handle_search_change = (event) => {
        const val = event.target.value;
        handle_search(val);
    };

    const handle_currency_display_change = (e) => {
       const new_currency = e.target.value;
       handle_currency_change(new_currency);
    };
    const handle_nb_result_change_event = (e) => {
        try{
            const new_nb_data_to_display = parseInt(e.target.value);
            handle_nb_result_change(new_nb_data_to_display);
        } catch {
            handle_nb_result_change(50);
        }
    };

    return(
        <div className="search-crypto">
            <div className="search-bar-wrapper">
                <div className="search-input-wrapper">
                    <input onChange={handle_search_change} type="text" placeholder="Search Cryptocurrencies"/>
                </div>
                <div className="search-icon-wrapper">
                    <i className="icon-search" />
                </div>
            </div>
            <div className="select-currency">
                <select  title="select currency to convert to"
                         value={currency_to_display} onChange={handle_currency_display_change}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="BTC">BTC</option>
                    <option value="LTC">LTC</option>
                </select>
            </div>

            <div className="select-nb-result">
                <select title="select number of results"
                         value={nb_data_to_display} onChange={handle_nb_result_change_event}>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="500">500</option>
                </select>
            </div>


        </div>
    )
};

export default SearchCrypto;