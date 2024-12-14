import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components
const HomepageContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Header = styled.header`
  position: relative; /* Make the header relative to place the button absolute */
  display: flex;
  justify-content: center; /* Center the title */
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
`;

const Title = styled.h1`
  margin: 0;
`;

const LoginButton = styled(Link)`
  position: absolute; /* Position it absolutely */
  top: 10px;
  right: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #218838;
  }
`;

const ProductPreview = styled.div`
  margin-top: 30px;
`;

const ProductItem = styled.div`
  display: inline-block;
  text-align: center;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
  background-color: #fff;
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  border-radius: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  color: #555;
  margin-bottom: 15px;
`;

const OrderButton = styled(Link)`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = styled.footer`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  text-align: center;
`;

const FooterText = styled.p`
  margin: 0;
`;

function Homepage() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    // Fetch image URL from backend
    fetch('http://localhost:3000/beverages')
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setImageUrl(data[0].image_url); // Assuming you want to display the first beverage's image
        }
      })
      .catch(error => console.error('Error fetching image URL:', error));
  }, []);

  return (
    <HomepageContainer>
      {/* Header dengan tombol Login di pojok kiri atas */}
      <Header>
        <LoginButton to="/login">Login</LoginButton>
        <Title>Welcome to GreenBite Cafe</Title>
      </Header>

      {/* Preview Produk */}
      <ProductPreview>
        <h2>Featured Product</h2>
        <ProductItem>
          <ProductImage 
            src={imageUrl || '/images/cappuccino.jpg'} // Use fetched image URL or fallback
            alt="Cappuccino" 
          />
          <ProductTitle>Cappuccino</ProductTitle>
          <ProductDescription>Enjoy the rich taste of freshly brewed Cappuccino.</ProductDescription>
          <OrderButton to="/order">Order Now</OrderButton>
        </ProductItem>
      </ProductPreview>

      {/* Footer */}
      <Footer>
        <FooterText>&copy; 2024 GreenBite Beverage Ordering System. All rights reserved.</FooterText>
      </Footer>
    </HomepageContainer>
  );
}

export default Homepage;
