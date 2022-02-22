import React, { useState } from 'react';
import TransactionCreateRow from "./TransactionCreateRow";
import TransactionService from "../../api/services/transaction";
import TransactionTableHeader from "./TransactionTableHeader";
import TransactionTableRow from "./TransactionTableRow";
import { useQuery } from 'react-query'

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
    <div className={"p-5 inline-block w-full drop-shadow-lg rounded-lg overflow-hidden"}>
      {isLoading &&
        <div>LOADING</div>
      }
      <button onClick={() => setCreating(true)}>+ New Transaction</button>
      <table className={"w-full leading-normal"}>
        <thead>
        <tr>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>
            <TransactionTableHeader name={"Date"} sortDirection={sortOrder} onSortChange={e => setSortOrder(e)} />
          </th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Pair</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Type</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Amount</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Total</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Fees</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Basis</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Gain/Loss</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Acquired</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}>Exchange</th>
          <th className={"px-5 py-3 bg-white  border-b border-slate-200 text-slate-800  text-left text-sm uppercase font-normal bg-slate-100"}></th>
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