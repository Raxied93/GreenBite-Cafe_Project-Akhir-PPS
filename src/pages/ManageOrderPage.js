import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const ManageOrdersContainer = styled.div`
  max-width: 800px;
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

const OrderList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

function ManageOrderPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const handleProcessOrder = async (orderId) => {
    try {
      await fetch(`/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'processed' })
      });
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'processed' } : order
      ));
    } catch (error) {
      console.error('Error processing order:', error);
    }
  };

  return (
    <ManageOrdersContainer>
      <Title>Manage Orders</Title>
      <OrderList>
        {orders.map(order => (
          <OrderItem key={order.id}>
            <span>{order.customer_name} - ${order.total_price}</span>
            <Button onClick={() => handleProcessOrder(order.id)}>Process Order</Button>
          </OrderItem>
        ))}
      </OrderList>
    </ManageOrdersContainer>
  );
}

export default ManageOrderPage;