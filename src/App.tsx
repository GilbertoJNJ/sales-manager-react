import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyled from './components/GlobalStyled';
import PrivateRoute from './utils/PrivateRoute';
import { Dashboard, Inventory, Invoice, Login, Profile, Notification } from './pages';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyled />
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