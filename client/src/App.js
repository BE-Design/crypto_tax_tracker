import React from 'react';
import TransactionTable from './components/TransactionTable/TransactionTable';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function  App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TransactionTable />
    </QueryClientProvider>
  );
}

export default App;
