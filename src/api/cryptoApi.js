import axios from 'axios';

export const fetchCryptoData = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: page,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};
