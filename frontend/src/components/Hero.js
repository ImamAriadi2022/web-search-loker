import React from 'react';
import { Container } from 'react-bootstrap';

function Hero() {
  return (
    <div className="hero-section text-center bg-primary text-white py-5">
      <Container>
        <h1>Selamat Datang di Portal Pekerjaan</h1>
        <p>Temukan pekerjaan impian Anda di sini!</p>
      </Container>
    </div>
  );
}

export default Hero;