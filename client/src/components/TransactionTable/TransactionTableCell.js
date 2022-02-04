import PropTypes from 'prop-types';
import React from "react";

class TransactionTableCell extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDisplayValue(type, value) {
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
  }

  renderInput(type, value) {
    switch (type) {
      case "date":
        return (<input type="datetime-local" defaultValue={value} onChange={this.props.onChange} />)
      default:
        return (<input type={type} defaultValue={value} onChange={this.props.onChange} />)
    }
  }

  render() {
    const { type, value, editing } = this.props;
    return (
      <div>
        {editing ? (
          this.renderInput(type, value)
        ) : (
          this.formatDisplayValue(type, value)
        )}
      </div>
    )
  }
}

TransactionTableCell.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  type: PropTypes.string,
  editing: PropTypes.bool
}

export default TransactionTableCell;