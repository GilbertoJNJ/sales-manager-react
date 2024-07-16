import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const Dashboard = () => {
  return <DashboardContainer>Bem-vindo ao Dashboard</DashboardContainer>;
};

export default Dashboard;