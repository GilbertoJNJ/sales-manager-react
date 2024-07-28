import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Invoice from './pages/Invoice';
import Notification from './pages/Notification';
import Profile from './pages/Profile';
import Login from './pages/Login';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;