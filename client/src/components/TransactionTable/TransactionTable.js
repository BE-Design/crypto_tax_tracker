import React, { useState } from 'react';
import TransactionCreateRow from "./TransactionCreateRow";
import TransactionTableSortableHeader from "./TransactionTableSortableHeader";
import TransactionTableRow from "./TransactionTableRow";
import { useGetTransactions } from "../../hooks/transaction";

function TransactionTable() {
  const [creating, setCreating] = useState(false);
  const [params, setParams] = useState({ sort: 'desc' });
  const { isLoading, data: response } = useGetTransactions(params);

  const setQueryParams = (newParams) => {
    setParams({ ...params, ...newParams });
  }

  const onCreate = () => {
    setCreating(false);
  }

  return (
    <div className="inline-block w-full drop-shadow-lg rounded-lg overflow-hidden">
      {isLoading &&
        <div>LOADING</div>
      }
      <div className="flex justify-between mb-3">
        <h2 className="text-2xl font-medium">Transactions</h2>
        <button className="bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-white text-md font-bold py-2 px-4 rounded-full" onClick={() => setCreating(true)}>
          Add Transaction
        </button>
      </div>
      <table className="w-full leading-normal">
        <thead>
        <tr>
          <th className="w-64 px-5 py-3  bg-slate-100 border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">
            <TransactionTableSortableHeader name={"Date"} sortDirection={params.sort} onSortChange={e => setQueryParams({ sort: e })} />
          </th>
          <th className="w-64 px-5 py-3  bg-slate-100 border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">
            Pair
          </th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">Type</th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">Amount</th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">Total</th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">Fees</th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">Basis</th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">Gain/Loss</th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">Acquired</th>
          <th className="w-56 px-5 py-3 bg-slate-100  border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal" colSpan="2">Exchange</th>
        </tr>
        </thead>
        <tbody>
        {creating &&
          <TransactionCreateRow
            onSave={onCreate}
            onCancel={() => setCreating(false)}
          />
        }
        {response.data && response.data.map(item => (
          <TransactionTableRow
            key={item.id}
            transaction={item}
          />
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable;