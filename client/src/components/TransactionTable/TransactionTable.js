import React, { useState } from 'react';
import TransactionCreateRow from "./TransactionCreateRow";
import TransactionService from "../../api/services/transaction";
import TransactionTableSortableHeader from "./TransactionTableSortableHeader";
import TransactionTableRow from "./TransactionTableRow";
import { useQuery } from 'react-query';

function TransactionTable() {
  const [creating, setCreating] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc');
  const { isLoading, data: response, refetch } = useQuery(['transactions', sortOrder], () => TransactionService.all(sortOrder), {
    initialData: []
  });

  const onCreate = () => {
    refetch();
    setCreating(false);
  }

  return (
    <div className="p-5 inline-block w-full drop-shadow-lg rounded-lg overflow-hidden">
      {isLoading &&
        <div>LOADING</div>
      }
      <button onClick={() => setCreating(true)}>+ New Transaction</button>
      <table className="w-full leading-normal">
        <thead>
        <tr>
          <th className="w-64 px-5 py-3  bg-slate-100 border-b border-slate-200  text-slate-800 text-left text-sm uppercase font-normal">
            <TransactionTableSortableHeader name={"Date"} sortDirection={sortOrder} onSortChange={e => setSortOrder(e)} />
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
            refetch={refetch}
          />
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable;