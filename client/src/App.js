import axios from 'axios';
import React from 'react';
import TransactionTable from './components/TransactionTable/TransactionTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoading: true,
      transactions: []
    };
  }

  componentDidMount() {
    axios('http://127.0.0.1:666/transactions')
      .then(res => {
        this.setState({
          transactions: res.data
        })
      })
      .catch(error => {
        alert('err-or');
        console.error(error);
      })
      .finally(() => {
        this.setState({
          isLoading: false
        })
      });
  }

  render() {
    const { transactions } = this.state;
    return (
      <main>
        <div >
          <TransactionTable transactions={transactions} />
        </div>
      </main>
    );
  }
}

export default App;
