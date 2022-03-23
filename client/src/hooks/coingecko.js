import CoinGecko from "../api/services/coingecko";
import { useQuery } from "react-query";

/**
 * Retrieve exhaustive details for a given coin.
 *
 * @param {string} coinId
 * @param {object} options
 * @returns UseQueryResult
 */
export const useGetCoinDetails = (coinId, options = {}) => {
  return useQuery(`${coinId}-details`, () => CoinGecko.coinDetails(coinId), {
    ...options
  });
};

/**
 * Return the current market price for a given coin.
 *
 * @param {string} coinId
 * @param {object} options
 * @returns UseQueryResult
 */
export const useGetCoinPrice = (coinId, options = {}) => {
  return useQuery(`${coinId}-price`, () => CoinGecko.price(coinId), {
    ...options
  });
};

/**
 * Return price history for a given coin for the preceding number of days leading up to today.
 * @note CoinGecko will automatically determine the granularity of prices(<1 day = minute, 1-90 days = hourly, 90+ days = daily).
 *
 * @param {string} coinId
 * @param {number} numDays
 * @param {string} interval - 'auto', 'minute', 'hourly', 'daily'
 * @param {object} options
 * @returns UseQueryResult
 */
export const useGetMarketHistory = (coinId, numDays = 1, interval = 'auto', options = {}) => {
  return useQuery(`${coinId}-market-history`, () => CoinGecko.marketHistory(coinId, numDays, interval), {
    ...options
  });
}