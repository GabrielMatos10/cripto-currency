import React from "react";
import styles from "./CryptoList.module.css";

const CryptoList = ({ cryptos, onSelectCoin }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price (USD)</th>
          <th>Variation 24h (%)</th>
        </tr>
      </thead>
      <tbody>
        {cryptos.length > 0 ? (
          cryptos.map((crypto) => (
            <tr key={crypto.id} onClick={() => onSelectCoin(crypto.id)}>
              <td>{crypto.name}</td>
              <td>$ {crypto.current_price.toFixed(2)}</td>
              <td>{crypto.price_change_percentage_24h.toFixed(2)}%</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center", color: "#777" }}>
              No coins found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CryptoList;
