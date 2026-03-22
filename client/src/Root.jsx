import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BuyTickets from './pages/BuyTickets';
import CreateConcert from './pages/CreateConcert';

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<BuyTickets />} />
        <Route path="/create" element={<CreateConcert />} />
      </Routes>
    </BrowserRouter>
  );
}
