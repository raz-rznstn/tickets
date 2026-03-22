import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import BuyTickets from './pages/BuyTickets';
import CreateConcert from './pages/CreateConcert';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyTickets />} />
          <Route path="/create" element={<CreateConcert />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
