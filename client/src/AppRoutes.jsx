import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BuyTickets from './pages/BuyTickets/BuyTickets';
import CreateConcert from './pages/CreateConcert/CreateConcert';
import ConcertDetails from './pages/ConcertDetails/ConcertDetails';
import Auth from './pages/Auth/Auth';
import MyOrders from './pages/MyOrders/MyOrders';
import TicketView from './pages/TicketView/TicketView';
import Admin from './pages/Admin/Admin';
import Validator from './pages/Validator/Validator';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/buy/:id" element={<BuyTickets />} />
      <Route path="/concert/:id" element={<ConcertDetails />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/my-orders" element={<MyOrders />} />
      <Route path="/my-orders/:orderId" element={<TicketView />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/create" element={<CreateConcert />} />
      <Route path="/validator" element={<Validator />} />
    </Routes>
  );
}
