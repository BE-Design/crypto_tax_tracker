import React, { useState } from 'react';
import { ReactComponent as RightArrowIcon } from '../../icons/arrow-right.svg';
import { ReactComponent as PencilIcon } from '../../icons/pencil-outline.svg';
import TransactionService from '../../api/services/transaction';
import TransactionTableCell from './TransactionTableCell';
import { useMutation } from 'react-query';

function TransactionTableRow({ transaction, refetch }) {
  const [dirtyState, setDirtyState] = useState(Object.assign({}, transaction));
  const [editing, setEditing] = useState(false);
  const { mutate, isLoading: isSaving } = useMutation(() => TransactionService.update(transaction.id, dirtyState), {
    onSuccess: () => {
      refetch();
      setEditing(false);
    }
  });


  // handles form input bindings to our dirty state version of the transaction.
  const handleInput = (key, e) => {
    setDirtyState({ ...dirtyState, [key]: e.target.value });
  };

  // edit cancelling will reset the dirty state
  const handleCancel = () => {
    setDirtyState(Object.assign({}, transaction));
    setEditing(false);
  };

  const { mutate: deleteFn, isLoading: isDeleting } = useMutation(() => TransactionService.delete(transaction.id), {
    onSuccess: () => {
      refetch();
    }
  });



  return (
    <tr>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"date"} value={transaction.tradedAt} editing={editing} onChange={e => handleInput("tradedAt", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <div className="flex items-center">
          <TransactionTableCell type={"text"} value={transaction.currency} editing={editing} onChange={e => handleInput("currency", e)} />
          {!editing &&
            <RightArrowIcon className="h-5 w-5" />
          }
          <TransactionTableCell type={"text"} value={transaction.tradedFor} editing={editing} onChange={e => handleInput("tradedFor", e)} />
        </div>

      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"text"} value={transaction.tradeType} editing={editing} onChange={e => handleInput("tradeType", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"number"} value={transaction.amount} editing={editing} onChange={e => handleInput("amount", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"currency"} value={transaction.totalInUsd} editing={editing} onChange={e => handleInput("totalInUsd", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"currency"} value={transaction.feesInUsd} editing={editing} onChange={e => handleInput("feesInUsd", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"currency"} value={transaction.costBasis} editing={editing} onChange={e => handleInput("costBasis", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        {/* todo gain/loss: static not editable */}
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"date"} value={transaction.acquiredAt} editing={editing} onChange={e => handleInput("acquiredAt", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        <TransactionTableCell type={"text"} value={transaction.exchange || "n/a"} onChange={e => handleInput("exchange", e)} />
      </td>
      <td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm"}>
        {editing &&
          <>
            <button type="button" onClick={handleCancel}>&times;</button>
            <button type="button" onClick={mutate}>Save</button>
          </>
        }
        {!editing &&
          <>
            <button type="button" onClick={() => setEditing(true)}>
              <PencilIcon className={"w-5 h-5"} />
            </button>
            <button type="button" onClick={deleteFn}>Delete</button>
          </>
        }
      </td>
    </tr>
  )
}

export default TransactionTableRow;