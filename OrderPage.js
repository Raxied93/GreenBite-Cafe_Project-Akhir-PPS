import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components
const OrderPageContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
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

function OrderPage() {
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (quantity <= 0) {
      alert('Quantity must be greater than 0');
      return;
    }
    try {
      const response = await fetch('/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity })
      });
      const data = await response.json();
      console.log('Order placed:', data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <OrderPageContainer>
      <Title>Order Drinks</Title>
      <form onSubmit={handleOrder}>
        <FormGroup>
          <Label>Quantity:</Label>
          <Input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
          />
        </FormGroup>
        <Button type="submit">Order</Button>
      </form>
    </OrderPageContainer>
  );
}

export default OrderPage;