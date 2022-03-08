import React from 'react';
import TransactionTable from './components/TransactionTable/TransactionTable';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function  App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionTable />
      <ToastContainer position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
