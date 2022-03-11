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
