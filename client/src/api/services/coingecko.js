import axios from 'axios';

const client = axios.create({
    baseURL: "https://api.coingecko.com/api/v3/"
});

const CURRENCY = "usd";

class CoinGeckoService {
    static async allMarkets() {
        return await client.get(`coins/markets?vs_currency=${CURRENCY}`)
    }
    static async price(id) {
        return await client.get(`simple/price?ids=${Array.isArray(id) ? id.join(',') : id}&vs_currencies=${CURRENCY}`)
    }
    static async search(searchValue) {
        return await client.get(`search?query=${searchValue}`)
    }
    static async tickers(id) {
        return await client.get(`coins/${id}/tickers`)
    }
    static async ohlcHistory(id, numOfDays) {
        return await client.get(`coins/${id}/ohlc?vs_currency=${CURRENCY}&days=${numOfDays}`)
    }
    static async marketHistory(id, numOfDays) {
        return await client.get(`coins/${id}/market_chart?vs_currency=${CURRENCY}&days=${numOfDays}`)
    }
}

export default CoinGeckoService;