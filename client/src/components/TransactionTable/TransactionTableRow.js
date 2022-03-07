import React, { useState } from 'react';
import TransactionService from '../../api/services/transaction';
import TransactionTableCell from './TransactionTableCell';
import { useMutation } from 'react-query';
import { ArrowRightIcon, PencilIcon, SaveIcon, TrashIcon, XIcon, CheckIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';

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

  //show confirmation div, delete transaction, refetch, and toast notification
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const { mutate: deleteFn, isLoading: isDeleting } = useMutation(() => TransactionService.delete(transaction.id), {
    onSuccess: () => {
      refetch();
      deleteSuccess();
    }
  });

  //toast notification for deleting
  const deleteSuccess = () => toast.success("Transaction deleted!")

  return (
    <tr>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"date"} value={transaction.tradedAt} editing={editing} onChange={e => handleInput("tradedAt", e)} />
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <div className="flex items-center">
          <TransactionTableCell type="text" value={transaction.currency} editing={editing} onChange={e => handleInput("currency", e)} />
          {!editing &&
            <ArrowRightIcon className="h-4 w-4" />
          }
          <TransactionTableCell type="text" value={transaction.tradedFor} editing={editing} onChange={e => handleInput("tradedFor", e)} />
        </div>

      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"text"} value={transaction.tradeType} editing={editing} onChange={e => handleInput("tradeType", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"number"} value={transaction.amount} editing={editing} onChange={e => handleInput("amount", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"currency"} value={transaction.totalInUsd} editing={editing} onChange={e => handleInput("totalInUsd", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"currency"} value={transaction.feesInUsd} editing={editing} onChange={e => handleInput("feesInUsd", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"currency"} value={transaction.costBasis} editing={editing} onChange={e => handleInput("costBasis", e)} />
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm">
        {/* todo gain/loss: static not editable */}
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"date"} value={transaction.acquiredAt} editing={editing} onChange={e => handleInput("acquiredAt", e)} />
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type={"text"} value={transaction.exchange || "n/a"} editing={editing} onChange={e => handleInput("exchange", e)} />
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm text-right w-5">
        {editing &&
          <span className="inline-flex gap-2 ml-auto text-slate-500">
            <button type="button" onClick={handleCancel}>
              <XIcon className="w-5 h-5" />
            </button>
            <button type="button" onClick={mutate}>
              <SaveIcon className="w-5 h-5" />
            </button>
          </span>
        }
        {!editing && !deleteConfirmation &&
          <span className="inline-flex gap-2 ml-auto text-slate-500">
            <button type="button" onClick={() => setEditing(true)}>
              <PencilIcon className="w-5 h-5" />
            </button>
            <button type="button" onClick={() => setDeleteConfirmation(true)}>
              <TrashIcon className="w-5 h-5" />
            </button>
          </span> 
        }
        {deleteConfirmation &&
          <span className="inline-flex gap-2 ml-auto text-slate-500">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            <button type="button" onClick={ deleteFn }>
              <CheckIcon className="w-5 h-5" />  
            </button>
            <button type="button" onClick={() => setDeleteConfirmation(false) }>
              <XIcon className="w-5 h-5" />  
            </button>
          </span>
        }
      </td>
    </tr>  
  )
}

export default TransactionTableRow;