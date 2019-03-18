import React, {useState} from "react";
import CryptoList from "../crypto-list/crypto-list";
import SearchCrypto from "../search-crypto/search-crypto";

// I used a mock for coinmarketcap API since the free plan is restrictive.
// I had to create a merged file with all currency convertion since the free plan doesn't include multiple conversion in one request
import mock_data from "../../mock_data/mock-coinmarketcap";

const CryptoMaster = (props) => {
    const all_crypto_data = mock_data;
    const [currency_to_display, set_currency_to_display] = useState("USD");
    const [nb_data_to_display, set_nb_data_to_display] = useState(50);
    const [crypto_data_to_display, set_crypto_data_to_display] = useState(all_crypto_data.slice(0, nb_data_to_display));

    const handle_currency_change = (new_currency) => {
        set_currency_to_display(new_currency);
    };

    const handle_nb_result_change = (new_nb_result) => {
        set_crypto_data_to_display(all_crypto_data.slice(0, new_nb_result));
        set_nb_data_to_display(new_nb_result);
    };

    const handle_search = (query) => {
        let result = [];
        if(query === ""){
            result = all_crypto_data;
        } else {
            result = all_crypto_data.filter((crypto) => {
                return crypto.name.toLowerCase().startsWith(query.toLowerCase());
            });
        }
        set_crypto_data_to_display(result.slice(0, nb_data_to_display));
    };

    return (
        <div className="crypto-master">
            <SearchCrypto  {...{
                handle_nb_result_change, handle_currency_change, nb_data_to_display,
                currency_to_display, handle_search}}
            />
            <CryptoList {...{currency_to_display, crypto_data_to_display}}/>
        </div>
    );
};

export default CryptoMaster;