import React from 'react';
import { ArrowSmUpIcon, ArrowSmDownIcon } from '@heroicons/react/solid';

function TransactionTableSortableHeader({name, sortDirection, onSortChange}) {
  return (
    <div className="inline-flex items-center gap-1">
      {name}
      <span className="cursor-pointer">
        {sortDirection === 'asc' &&
          <ArrowSmUpIcon className="h-5 w-5 text-slate-500" onClick={() => onSortChange('desc')} />
        }
        {sortDirection === 'desc' &&
          <ArrowSmDownIcon className="h-5 w-5 text-slate-500" onClick={() => onSortChange('asc') } />
        }
      </span>
    </div>
  )
}

export default TransactionTableSortableHeader;