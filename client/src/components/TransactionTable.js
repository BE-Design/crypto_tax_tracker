import PropTypes from 'prop-types'

const TransactionTable = ({ transactions }) => {
  return (
    <ul>
      {transactions.map(item => (
        <li key={item.id}>
          {item.currency}
        </li>
      ))}
    </ul>
  )
}

TransactionTable.defaultProps = {
  transactions: [],
}

TransactionTable.propTypes = {
  transactions: PropTypes.array
}

export default TransactionTable;