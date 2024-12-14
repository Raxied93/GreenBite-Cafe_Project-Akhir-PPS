import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const LoginPageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (data.success) {
      if (data.role === 'admin') {
        navigate('/manage-menu');
      } else if (data.role === 'owner') {
        navigate('/order-status');
      }
    } else {
      setError(data.message);
    }
  };

  return (
    <LoginPageContainer>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <Label>Username:</Label>
          <Input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </form>
    </LoginPageContainer>
  );
}

export default LoginPage;