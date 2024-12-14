import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled components
const ManageMenuContainer = styled.div`
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

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #28a745;
  color: white;

  &:hover {
    background-color: #218838;
  }
`;

const BeverageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const BeverageItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &.edit {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  &.delete {
    background-color: #dc3545;
    color: white;

    &:hover {
      background-color: #c82333;
    }
  }
`;

function ManageMenuPage() {
  const [beverages, setBeverages] = useState([]);

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await fetch('/beverages');
        const data = await response.json();
        setBeverages(data);
      } catch (error) {
        console.error('Error fetching beverages:', error);
      }
    };
    fetchBeverages();
  }, []);

  const handleAddBeverage = async () => {
    // Logic untuk menambah minuman
  };

  const handleEditBeverage = async (beverageId) => {
    // Logic untuk mengedit minuman
  };

  const handleDeleteBeverage = async (beverageId) => {
    try {
      await fetch(`/beverages/${beverageId}`, {
        method: 'DELETE'
      });
      setBeverages(beverages.filter(beverage => beverage.id !== beverageId));
    } catch (error) {
      console.error('Error deleting beverage:', error);
    }
  };

  return (
    <ManageMenuContainer>
      <Title>Manage Menu</Title>
      <Button onClick={handleAddBeverage}>Add Beverage</Button>
      <BeverageList>
        {beverages.map(beverage => (
          <BeverageItem key={beverage.id}>
            <span>{beverage.name} - Rp.  {beverage.price}</span>
            <div>
              <ActionButton className="edit" onClick={() => handleEditBeverage(beverage.id)}>Edit</ActionButton>
              <ActionButton className="delete" onClick={() => handleDeleteBeverage(beverage.id)}>Delete</ActionButton>
            </div>
          </BeverageItem>
        ))}
      </BeverageList>
    </ManageMenuContainer>
  );
}

export default ManageMenuPage;