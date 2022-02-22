import React, { useState } from 'react';
import { useMutation } from 'react-query';
import TransactionService from "../../api/services/transaction";
import TransactionTableCell from './TransactionTableCell';
import { SaveIcon, XIcon } from '@heroicons/react/outline';

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
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="date" value={null} editing={true} onChange={e => handleInput("tradedAt", e)} />
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <div className="flex items-center">
          <TransactionTableCell type="text" value={null} editing={true} onChange={e => handleInput("currency", e)} />
          <TransactionTableCell type="text" value={null} editing={true} onChange={e => handleInput("tradedFor", e)} />
        </div>
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="text" value={null} editing={true} onChange={e => handleInput("tradeType", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="number" value={null} editing={true} onChange={e => handleInput("amount", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="currency" value={null} editing={true} onChange={e => handleInput("totalInUsd", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="currency" value={null} editing={true} onChange={e => handleInput("feesInUsd", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="currency" value={null} editing={true} onChange={e => handleInput("costBasis", e)} />
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm">
        {/* todo gain/loss: static not editable */}
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="date" value={null} editing={true} onChange={e => handleInput("acquiredAt", e)} />
      </td>
      <td className="w-48 px-5 py-5 border-b border-slate-200 bg-white text-sm">
        <TransactionTableCell type="text" value={null} editing={true} onChange={e => handleInput("exchange", e)} />
      </td>
      <td className="px-5 py-5 border-b border-slate-200 bg-white text-sm text-right w-5">
        <span className="inline-flex gap-2 ml-auto text-slate-500">
          <button type="button" onClick={onCancel}>
            <XIcon className="w-5 h-5" />
          </button>
          <button type="button" onClick={mutate}>
            <SaveIcon className="w-5 h-5" />
          </button>
        </span>
      </td>
    </tr>
  );
}

export default TransactionCreateRow;