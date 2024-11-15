import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import axios from 'axios';
import styles from './CryptoChart.module.css';

const CryptoChart = ({ coinId, limit = 20 }) => {  // Adiciona uma prop para limitar os pontos
  const [labels, setLabels] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
          params: { vs_currency: 'usd', days: '7' },
        });

        console.log("Dados da API:", response.data);

        const allLabels = response.data.prices.map((price) =>
          price[0]
        );
        const allPrices = response.data.prices.map((price) => price[1]);

        const limitedLabels = allLabels.slice(-limit);
        const limitedPrices = allPrices.slice(-limit);

        setLabels(limitedLabels);
        setPrices(limitedPrices);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico", error);
      }
    };

    fetchChartData();
  }, [coinId, limit]);

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Price Change - Last 7 days</h3>
      <LineChart
        xAxis={[{ data: labels, label:'Days' }]}
        series={[
          {
            data: prices, 
            label: 'Preço (USD)',
            borderColor: '#42A5F5',
          },
        ]}
        width={1100}
        height={300}
      />
    </div>
  );
};

export default CryptoChart;
