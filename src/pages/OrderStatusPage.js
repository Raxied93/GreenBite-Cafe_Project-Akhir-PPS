import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const OrderStatusContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const StatusText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #333;
`;

function OrderStatusPage() {
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/orders/status');
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };
    fetchStatus();
  }, []);

  return (
    <OrderStatusContainer>
      <Title>Order Status</Title>
      <StatusText>Status: {status}</StatusText>
    </OrderStatusContainer>
  );
}

export default OrderStatusPage;