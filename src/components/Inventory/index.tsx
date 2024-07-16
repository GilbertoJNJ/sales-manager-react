import styled from 'styled-components';

const InventoryContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const Inventory = () => {
  return <InventoryContainer>Gestão de Estoque</InventoryContainer>;
};

export default Inventory;