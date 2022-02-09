import React, { useState } from 'react';
import TransactionService from "../../api/services/transaction";
import TransactionTableRow from "./TransactionTableRow";
import { useQuery } from 'react-query'

function TransactionTable() {
  const [creating, setCreating] = useState(false);
  const { isLoading, data: response, refetch } = useQuery('transactions', () => TransactionService.all(), {
    initialData: []
  });

  return (
    <div>
      {isLoading &&
        <div>LOADING</div>
      }
      <button onClick={() => setCreating(true)}>+ New Transaction</button>
      <table>
        <thead>
        <tr>
          <th>Date</th>
          <th>Pair</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Total</th>
          <th>Fees</th>
          <th>Basis</th>
          <th>Gain/Loss</th>
          <th>Acquired</th>
          <th>Exchange</th>
        </tr>
        </thead>
        <tbody>
        {creating &&
        <tr>
          <td>WTF</td>
        </tr>
        }
        {response.data && response.data.map(item => (
          <TransactionTableRow
            key={item.id}
            transaction={item}
            onSave={refetch}
          />
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionTable;