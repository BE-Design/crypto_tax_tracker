import PropTypes from 'prop-types';
import TransactionTableCell from "./TransactionTableCell";
import React from "react";

class TransactionTableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transaction: props.transaction,
      editing: false,
      dirtyState: Object.assign({}, props.transaction)
    };
  }

  handleInput(key, e) {
    this.setState({ dirtyState: { ...this.state.dirtyState, [key]: e.target.value } })
    this.state.dirtyState[key] = e.target.value;
  }

  handleCancel() {
    this.setState({
      editing: false,
      dirtyState: Object.assign({}, this.props.transaction)
    });
  }

  render() {
    const { transaction, editing } = this.state;

    return (
      <tr>
        <td>
          <TransactionTableCell type={"date"} value={transaction.tradedAt} editing={editing} onChange={e => this.handleInput("tradedAt", e)} />
        </td>
        <td>
          <TransactionTableCell type={"text"} value={transaction.currency} editing={editing} onChange={e => this.handleInput("currency", e)} />
          <TransactionTableCell type={"text"} value={transaction.tradedFor} editing={editing} onChange={e => this.handleInput("tradedFor", e)} />
        </td>
        <td>
          <TransactionTableCell type={"text"} value={transaction.tradeType} editing={editing} onChange={e => this.handleInput("tradeType", e)} />
        </td>
        <td>
          <TransactionTableCell type={"number"} value={transaction.amount} editing={editing} onChange={e => this.handleInput("amount", e)} />
        </td>
        <td>
          <TransactionTableCell type={"currency"} value={transaction.totalInUsd} editing={editing} onChange={e => this.handleInput("totalInUsd", e)} />
        </td>
        <td>
          <TransactionTableCell type={"currency"} value={transaction.feesInUsd} editing={editing} onChange={e => this.handleInput("feesInUsd", e)} />
        </td>
        <td>
          <TransactionTableCell type={"currency"} value={transaction.costBasis} editing={editing} onChange={e => this.handleInput("costBasis", e)} />
        </td>
        <td>
          {/* todo gain/loss: static not editable*/}
        </td>
        <td>
          <TransactionTableCell type={"date"} value={transaction.acquiredAt} editing={editing} onChange={e => this.handleInput("acquiredAt", e)} />
        </td>
        <td>
          <TransactionTableCell type={"text"} value={transaction.exchange || "n/a"} onChange={e => this.handleInput("exchange", e)} />
        </td>
        <td>

          {editing &&
            <>
              <button type="button" onClick={() => this.handleCancel()}>&times;</button>
              <button type="button" onClick={() => {}}>Save</button>
            </>
          }
          {!editing &&
            <button type={"button"} onClick={() => this.setState({ editing: !this.editing })}>Edit</button>
          }
        </td>
      </tr>
    )
  }
}

TransactionTableRow.propTypes = {
  transaction: PropTypes.object
}

export default TransactionTableRow;