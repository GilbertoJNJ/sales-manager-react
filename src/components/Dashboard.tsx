import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  height: 100vh; /* Ocupa 100% da altura da viewport */
  width: 100%; /* Ocupa 100% da largura */
  box-sizing: border-box; /* Inclui padding e border na largura e altura */
`;

const Dashboard = () => {
  return <DashboardContainer>Bem-vindo ao Dashboard</DashboardContainer>;
};

export default Dashboard;