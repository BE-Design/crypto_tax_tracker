import React, { useState } from 'react';
import TransactionService from "../../api/services/transaction";
import TransactionTableCell from './TransactionTableCell';
import { useMutation } from 'react-query';

function TransactionCreateRow({ onSave, onCancel }) {
  const [transaction, setTransaction] = useState({});
  const { mutate, isLoading } = useMutation(() => TransactionService.create(transaction), {
    onSuccess: () => {
      onSave();
    }
  });

  const handleInput = (key, e) => {
    setTransaction({ ...transaction, [key]: e.target.value });
  };

  return (
    <tr>
      <td>
        <TransactionTableCell type={"date"} value={null} editing={true} onChange={e => handleInput("tradedAt", e)} />
      </td>
      <td>
        <TransactionTableCell type={"text"} value={null} editing={true} onChange={e => handleInput("currency", e)} />
        <TransactionTableCell type={"text"} value={null} editing={true} onChange={e => handleInput("tradedFor", e)} />
      </td>
      <td>
        <TransactionTableCell type={"text"} value={null} editing={true} onChange={e => handleInput("tradeType", e)} />
      </td>
      <td>
        <TransactionTableCell type={"number"} value={null} editing={true} onChange={e => handleInput("amount", e)} />
      </td>
      <td>
        <TransactionTableCell type={"currency"} value={null} editing={true} onChange={e => handleInput("totalInUsd", e)} />
      </td>
      <td>
        <TransactionTableCell type={"currency"} value={null} editing={true} onChange={e => handleInput("feesInUsd", e)} />
      </td>
      <td>
        <TransactionTableCell type={"currency"} value={null} editing={true} onChange={e => handleInput("costBasis", e)} />
      </td>
      <td>
        {/* todo gain/loss: static not editable */}
      </td>
      <td>
        <TransactionTableCell type={"date"} value={null} editing={true} onChange={e => handleInput("acquiredAt", e)} />
      </td>
      <td>
        <TransactionTableCell type={"text"} value={null} editing={true} onChange={e => handleInput("exchange", e)} />
      </td>
      <td>
        <button type="button" onClick={onCancel}>&times;</button>
        <button type="button" onClick={mutate}>Save</button>
      </td>
    </tr>
  );
}

export default TransactionCreateRow;