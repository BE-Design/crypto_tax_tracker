import PropTypes from 'prop-types';
import React from 'react';
import TransactionTableRow from "./TransactionTableRow";

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creating: false
    };
  }

  render() {
    const { creating, editing } = this.state;
    const { transactions } = this.props;

    return (
      <div>
        <button onClick={() => this.setState({ creating: true })}>+ New Transaction</button>
        <br /><br />
        <table>
          <thead>
          <tr>
            <th>Date</th>
            <th>Pair</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Total</th>
            <th>Fees</th>
            <th>Basis</th>
            <th>Gain/Loss</th>
            <th>Acquired</th>
            <th>Exchange</th>
          </tr>
          </thead>
          <tbody>
          {creating &&
          <tr>
            <td>WTF</td>
          </tr>
          }
          {transactions.map(item => (
            <TransactionTableRow
              key={item.id}
              transaction={item}
              editing={editing}
            />
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}

TransactionTable.defaultProps = {
  transactions: [],
}

TransactionTable.propTypes = {
  transactions: PropTypes.array
}

export default TransactionTable;