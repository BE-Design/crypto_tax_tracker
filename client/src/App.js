import React from 'react';
import CoinCard from "./components/CoinCard/CoinCard";
import TransactionTable from './components/TransactionTable/TransactionTable';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: 60 * 1000 // 1 minute
  }
});

function  App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 bg-gray-100 h-screen">
        <div className="mb-24 flex justify-between">
          {/* todo ideally I'd like this list to be customizable and likely broken out into another component... */}
          <CoinCard coin="bitcoin" />
          <CoinCard coin="ethereum" />
          <CoinCard coin="cosmos" />
          <CoinCard coin="dogecoin" />
          <CoinCard coin="polkadot" />
        </div>
        <TransactionTable />
      </div>
      <ToastContainer position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
