import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BuyTickets, { BuyTicketsReturn } from './pages/BuyTickets/BuyTickets';
import CreateConcert from './pages/CreateConcert/CreateConcert';
import ConcertDetails from './pages/ConcertDetails/ConcertDetails';
import Auth from './pages/Auth/Auth';
import MyOrders from './pages/MyOrders/MyOrders';
import TicketView from './pages/TicketView/TicketView';
import ConcertList from './pages/ConcertList/ConcertList';
import EditConcert from './pages/EditConcert/EditConcert';
import Validator from './pages/Validator/Validator';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/buy/:id" element={<BuyTickets />} />
      <Route path="/return" element={<BuyTicketsReturn />} />
      <Route path="/concert/:id" element={<ConcertDetails />} />
      <Route path="/auth" element={<Auth />} />

      {/* User routes */}
      <Route path="/my-orders" element={
        <ProtectedRoute roles={['admin', 'user']}>
          <MyOrders />
        </ProtectedRoute>
      } />
      <Route path="/my-orders/:orderId" element={
        <ProtectedRoute roles={['admin', 'user']}>
          <TicketView />
        </ProtectedRoute>
      } />

      {/* Scanner + admin routes */}
      <Route path="/validator" element={
        <ProtectedRoute roles={['admin', 'scanner']}>
          <Validator />
        </ProtectedRoute>
      } />

      {/* Admin only routes */}
      <Route path="/admin" element={
        <ProtectedRoute roles={['admin']}>
          <ConcertList />
        </ProtectedRoute>
      } />
      <Route path="/edit/:id" element={
        <ProtectedRoute roles={['admin']}>
          <EditConcert />
        </ProtectedRoute>
      } />
      <Route path="/create" element={
        <ProtectedRoute roles={['admin']}>
          <CreateConcert />
        </ProtectedRoute>
      } />
    </Routes>
  );
}