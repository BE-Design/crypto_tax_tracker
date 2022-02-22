import React from 'react';

function TransactionTableSortableHeader({name, sortDirection, onSortChange}) {
  return (
    <div className="sortable-header">
      {name}
      <span className="sort-arrows">
        <span className={`up-arrow ${sortDirection === 'asc' ? '--active' : ''}`} onClick={() => onSortChange('asc')} />
        <span className={`down-arrow ${sortDirection === 'desc' ? '--active' : ''}`} onClick={() => onSortChange('desc')} />
      </span>
    </div>
  )
}

export default TransactionTableSortableHeader;