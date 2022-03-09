import React from 'react';
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
      <TransactionTable />
      <ToastContainer position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
