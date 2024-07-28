import { useState } from 'react';
import styled from 'styled-components';
import authenticateStore from '../../store/authenticate.store';
import { useNavigate } from 'react-router-dom';
import GlobalStyled from '../../components/GlobalStyled';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Form = styled.form`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4d;
  font-size: 14px;
  text-align: center;
`;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Aqui você pode adicionar a lógica de autenticação
    if (email === '' || password === '') {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    // Simulação de autenticação (substitua com a lógica real)
    if (email === 'user@example.com' && password === 'password') {
      setError('');
      // Redirecionar ou fazer login
      console.log('Login bem-sucedido');
      authenticateStore.login({email: email, token:"token"});
      navigate('/dashboard');
    } else {
      setError('Credenciais inválidas.');
    }
  };

  return (
    <>
    <GlobalStyled/>
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Entrar</Button>
      </Form>
      </LoginContainer>
    </>
  );
};