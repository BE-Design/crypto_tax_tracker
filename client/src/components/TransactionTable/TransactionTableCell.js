import React from "react";

function TransactionTableCell({ type, value, editing, onChange }) {
  const formatDisplayValue = (type, value) => {
    switch (type) {
      case "date":
        return value ? (new Date(value).toLocaleString()) : null;
      case "currency":
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        });
        return value ? formatter.format(value) : null;
      default:
        return value;
    }
  };

  const renderInput = (type, value) => {
    switch (type) {
      case "date":
        return (<input type="datetime-local" defaultValue={value} onChange={onChange} />)
      case "number":
        return (<input type="number" defaultValue={value} onChange={onChange} />)
      default:
        return (<input type="text" defaultValue={value} onChange={onChange} />)
    }
  };

  return (
    <div>
      {editing ? (
        renderInput(type, value)
      ) : (
        formatDisplayValue(type, value)
      )}
    </div>
  );
}

export default TransactionTableCell;