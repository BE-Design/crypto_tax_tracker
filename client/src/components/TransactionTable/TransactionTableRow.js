import TransactionTableCell from "./TransactionTableCell";
import React, { useState } from "react";

function TransactionTableRow({ transaction }) {
  const [dirtyState, setDirtyState] = useState(Object.assign({}, transaction));
  const [editing, setEditing] = useState(false);

  // handles form input bindings to our dirty state version of the transaction.
  const handleInput = (key, e) => {
    setDirtyState({ ...dirtyState, [key]: e.target.value });
  };

  // edit cancelling will reset the dirty state
  const handleCancel = () => {
    setDirtyState(Object.assign({}, transaction));
    setEditing(false);
  };

  return (
    <tr>
      <td>
        <TransactionTableCell type={"date"} value={transaction.tradedAt} editing={editing} onChange={e => handleInput("tradedAt", e)} />
      </td>
      <td>
        <TransactionTableCell type={"text"} value={transaction.currency} editing={editing} onChange={e => handleInput("currency", e)} />
        <TransactionTableCell type={"text"} value={transaction.tradedFor} editing={editing} onChange={e => handleInput("tradedFor", e)} />
      </td>
      <td>
        <TransactionTableCell type={"text"} value={transaction.tradeType} editing={editing} onChange={e => handleInput("tradeType", e)} />
      </td>
      <td>
        <TransactionTableCell type={"number"} value={transaction.amount} editing={editing} onChange={e => handleInput("amount", e)} />
      </td>
      <td>
        <TransactionTableCell type={"currency"} value={transaction.totalInUsd} editing={editing} onChange={e => handleInput("totalInUsd", e)} />
      </td>
      <td>
        <TransactionTableCell type={"currency"} value={transaction.feesInUsd} editing={editing} onChange={e => handleInput("feesInUsd", e)} />
      </td>
      <td>
        <TransactionTableCell type={"currency"} value={transaction.costBasis} editing={editing} onChange={e => handleInput("costBasis", e)} />
      </td>
      <td>
        {/* todo gain/loss: static not editable*/}
      </td>
      <td>
        <TransactionTableCell type={"date"} value={transaction.acquiredAt} editing={editing} onChange={e => handleInput("acquiredAt", e)} />
      </td>
      <td>
        <TransactionTableCell type={"text"} value={transaction.exchange || "n/a"} onChange={e => handleInput("exchange", e)} />
      </td>
      <td>
        {editing &&
          <>
            <button type="button" onClick={handleCancel}>&times;</button>
            <button type="button" onClick={() => {}}>Save</button>
          </>
        }
        {!editing &&
          <button type={"button"} onClick={() => setEditing(true)}>Edit</button>
        }
      </td>
    </tr>
  )
}

export default TransactionTableRow;