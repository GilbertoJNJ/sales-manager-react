import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Invoice from './components/Invoice';
import styled from 'styled-components';

const MainContainer = styled.div`
  padding-top: 30px;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

function App() {
  return (
    <Router>
      <div className="App">
        <Home />
        <MainContainer>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/invoice" element={<Invoice />} />
        </Routes>
        </MainContainer>
      </div>
    </Router>
  );
}

export default App;