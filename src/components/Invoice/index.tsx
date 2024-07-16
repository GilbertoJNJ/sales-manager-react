import styled from 'styled-components';

const InvoiceContainer = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
`;

const Invoice = () => {
  return <InvoiceContainer>Gestão de Nota Fiscal</InvoiceContainer>;
};

export default Invoice;