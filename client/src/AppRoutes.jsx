import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import BuyTickets, { BuyTicketsReturn } from './pages/BuyTickets/BuyTickets';
import CreateConcert from './pages/CreateConcert/CreateConcert';
import ConcertDetails from './pages/ConcertDetails/ConcertDetails';
import Auth from './pages/Auth/Auth';
import MyOrders from './pages/MyOrders/MyOrders';
import TicketView from './pages/TicketView/TicketView';
import Admin from './pages/Admin/Admin';
import EditConcert from './pages/EditConcert/EditConcert';
import Validator from './pages/Validator/Validator';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/buy/:id" element={
        <ProtectedRoute roles={['user']}>
          <BuyTickets />
        </ProtectedRoute>
      } />
      <Route path="/return" element={
        <ProtectedRoute roles={['user']}>
          <BuyTicketsReturn />
        </ProtectedRoute>
      } />
      <Route path="/concert/:id" element={<ConcertDetails />} />
      <Route path="/auth" element={<Auth />} />

      {/* User routes */}
      <Route path="/my-orders" element={
        <ProtectedRoute roles={['user']}>
          <MyOrders />
        </ProtectedRoute>
      } />
      <Route path="/my-orders/:orderId" element={
        <ProtectedRoute roles={['user']}>
          <TicketView />
        </ProtectedRoute>
      } />

      {/* Validator + admin routes */}
      <Route path="/validator" element={
        <ProtectedRoute roles={['validator']}>
          <Validator />
        </ProtectedRoute>
      } />

      {/* Admin only routes */}
      <Route path="/admin" element={
        <ProtectedRoute roles={['admin']}>
          <Admin />
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