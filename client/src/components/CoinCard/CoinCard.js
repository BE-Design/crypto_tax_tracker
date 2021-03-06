import React from 'react';
import CoinCardAreaChart from "./CoinCardAreaChart";
import { useGetCoinDetails, useGetMarketHistory } from "../../hooks/coingecko";
import { useGetTransactions } from "../../hooks/transaction";

function CoinCard({ coin }) {
  // todo i think react query allows chaining these types of calls... ?
  const { isLoading: isLoadingCoinDetails, data: coinDetails } = useGetCoinDetails(coin);
  const { isLoading: isLoadingTransactions, data: transactions } = useGetTransactions({ coin });
  const { isLoading: isLoadingPriceHistory, data: priceHistory } = useGetMarketHistory(coin, 1, 'hourly');

  /** just an alias so we don't have to call coinDetails.data everywhere in the template... */
  const coinData = coinDetails ? coinDetails.data : null;

  /**
   * Sum of current holdings for the coin. All positive transactions should be included in the sum (purchased, mined, staked).
   * @returns {Number}
   */
  const getHoldings = () => {
    return transactions.data.filter(transaction => ['buy', 'mined', 'staked'].includes(transaction.tradeType.toLowerCase()))
      .reduce((accumulator, item) => accumulator + item.amount, 0)
  };

  /**
   * Get total USD value of all current holdings.
   * @returns {Number}
   */
  const getValue = () => {
    return getHoldings() * coinData.market_data.current_price.usd;
  }

  return (
    <div className="max-w-sm flex-1 rounded-lg overflow-hidden shadow-lg ">
      {(isLoadingCoinDetails || isLoadingTransactions) &&
        <p>Loading...</p>
      }
      {coinData &&
        <div className="flex flex-col">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <img className="w-10" src={coinData.image.large} alt="Sunset in the mountains" />
              <div className="ml-4">
                <h4>
                  <span className="text-lg mr-2">{ coinData.name }</span>
                  <span className="text-xs uppercase text-slate-600">{ coinData.symbol }</span>
                </h4>
              </div>
            </div>
            <div>
              <span className={`font-semibold text-sm ${coinData.market_data.price_change_percentage_24h > 0 ? 'text-emerald-700' : 'text-red-800'}`}>
                { coinData.market_data.price_change_percentage_24h.toFixed(2) }%
              </span>
            </div>
          </div>
          {priceHistory &&
            <div className="translate-y-1">
              <CoinCardAreaChart series={priceHistory.data.prices} />
            </div>
          }
          <div className="flex justify-between p-4 bg-slate-100 translate-y-1">
            <div>
              <h5 className="uppercase text-xs text-slate-600 tracking-wider">Price</h5>
              <p className="font-semibold text-slate-800">${ coinData.market_data.current_price.usd.toFixed(2) }</p>
            </div>

            <div>
              <h5 className="uppercase text-xs text-slate-600 tracking-wider">Holdings</h5>
              <p className="">{ getHoldings() || '--' }</p>
            </div>

            <div>
              <h5 className="uppercase text-xs text-slate-600 tracking-wider">Value</h5>
              <p className="">{ `${getValue() > 0 ? `$${getValue().toFixed(2)}` : '--'}`}</p>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default CoinCard;