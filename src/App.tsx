import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigateBar from './components/NavigateBar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Invoice from './pages/Invoice';
import Background from './components/Background';
import GlobalStyled from './components/GlobalStyled';

function App() {
  return (
    <Router>
      <div className="App">
        <GlobalStyled/>
        <Background />
        <NavigateBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;