import React from 'react';
import { Container } from 'react-bootstrap';

function Hero() {
  return (
    <div className="hero-section text-center bg-primary text-white py-5">
      <Container>
        <h1>Welcome to Job Portal</h1>
        <p>Find your dream job here!</p>
      </Container>
    </div>
  );
}

export default Hero;