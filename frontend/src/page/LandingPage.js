import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Filter from '../components/Filter';
import SectionCard from '../components/SectionCard';
import Footer from '../components/Footer';

function LandingPage() {
  const [filter, setFilter] = useState({});

  const handleFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Filter onFilter={handleFilter} />
      <SectionCard filter={filter} />
      <Footer />
    </>
  );
}

export default LandingPage;