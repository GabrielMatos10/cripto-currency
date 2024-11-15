import React, { useEffect, useState } from "react";
import { fetchCryptoData } from "../api/cryptoApi";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CryptoList from "./CryptoList";
import CryptoChart from "./CryptoChart";
import styles from "./CryptoDashboard.module.css";

const CryptoDashboard = () => {
  const [cryptos, setCryptos] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchCoin, setSearchCoin] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const maxPages = 9;

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData(currentPage, itemsPerPage);
      setCryptos(data);
    };
    getData();
  }, [currentPage]);

  const handleSelectCoin = (coinId) => {
    setSelectedCoin(coinId);
  }; 

  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPages) {
      setCurrentPage(page);
    }
  };

  // Filtrar moedas com base no termo de pesquisa
  const filteredCryptos = cryptos.filter((crypto) =>
    crypto.name.toLowerCase().includes(searchCoin.toLowerCase())
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.title}>
        <h1>Crypto Currency </h1>
        <CurrencyExchangeIcon/>
      </div>

      <input
        type="text"
        placeholder="Search Coin"
        value={searchCoin}
        onChange={(e) => setSearchCoin(e.target.value)}
        className={styles.searchInput}
      />
      <CryptoList cryptos={filteredCryptos} onSelectCoin={handleSelectCoin} />
      {selectedCoin && <CryptoChart coinId={selectedCoin} />}

      <div className={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(maxPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === maxPages}>
          Next
        </button>
      </div>
      
    </div>
  );
};

export default CryptoDashboard;
