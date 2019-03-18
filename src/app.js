import React from "react";
import "./app.sass";
import CryptoMaster from "./components/crypto-master/crypto-master";

const App = () => {
    return (
        <main className="content">
            <div>
                <h1>Cryptocurrencies</h1>
            </div>
            <CryptoMaster/>
        </main>
    )
};

export default App;
