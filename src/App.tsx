import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import GamePage from './pages/GamePage';

// import './App.css';

const queryClient = new QueryClient()

const App = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
      <GamePage />
    </QueryClientProvider>
  );
};

export default App;