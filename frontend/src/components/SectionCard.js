import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import JobCard from "./JobCard";
import Cart from "./Cart";

const staticJobs = [
  {
    id: 1,
    province: "DKI Jakarta",
    location: "Jakarta",
    profession: "Programmer",
    city: "Jakarta",
    salary: 10000000,
    education: "S1",
    address: "Jl. Sudirman",
    age: 25,
    portfolio: ["/portfolio/1.png", "/portfolio/2.png", "/portfolio/3.png", "/portfolio/4.png", "/portfolio/5.png", "/portfolio/6.png"],
    profileImage: "https://st3.depositphotos.com/1643295/18528/i/1600/depositphotos_185282362-stock-photo-indian-professional-programmer-sitting-his.jpg",
  },
  {
    id: 2,
    province: "Jawa Barat",
    location: "Bandung",
    profession: "Digital Marketer",
    city: "Bandung",
    salary: 8000000,
    education: "S1",
    address: "Jl. Asia Afrika",
    age: 28,
    portfolio: ["/portfolio/1.png", "/portfolio/2.png", "/portfolio/3.png", "/portfolio/4.png", "/portfolio/5.png", "/portfolio/6.png"],
    profileImage: "https://satelitweb.com/wp-content/uploads/2024/04/Digital-Marketing-Satelitweb.webp",
  },
  {
    id: 3,
    province: "Jawa Timur",
    location: "Surabaya",
    profession: "Konten Kreator",
    city: "Surabaya",
    salary: 7000000,
    education: "SMA",
    address: "Jl. Tunjungan",
    age: 22,
    portfolio: ["/portfolio/1.png", "/portfolio/2.png", "/portfolio/3.png", "/portfolio/4.png", "/portfolio/5.png", "/portfolio/6.png"],
    profileImage: "https://cdn.topsellbelanja.com/wp-content/uploads/2022/03/5-Alat-Penting-yang-Wajib-Dimiliki-Content-Creator-1536x768-1.webp",
  },
];

function SectionCard({ filter = {} }) {
  const [filteredJobs, setFilteredJobs] = useState(staticJobs);
  const [selectedJobs, setSelectedJobs] = useState(() => {
    const savedJobs = localStorage.getItem("selectedJobs");
    return savedJobs ? JSON.parse(savedJobs) : [];
  });

  useEffect(() => {
    const filterJobs = () => {
      const filtered = staticJobs.filter((job) => {
        const matchesProvince = filter.province ? job.province === filter.province : true;
        const matchesDistrict = filter.district ? job.location === filter.district : true;
        const matchesProfession = filter.profession ? job.profession === filter.profession : true;
        const matchesSalary = filter.salary ? job.salary >= parseInt(filter.salary) : true;
        const matchesEducation = filter.education ? job.education === filter.education : true;
        const matchesAge = filter.age ? job.age <= parseInt(filter.age) : true;
        return (
          matchesProvince &&
          matchesDistrict &&
          matchesProfession &&
          matchesSalary &&
          matchesEducation &&
          matchesAge
        );
      });
      setFilteredJobs(filtered);
    };

    filterJobs();
  }, [filter]);

  const handleSelectJob = (job) => {
    const updatedSelectedJobs = [...selectedJobs, job];
    setSelectedJobs(updatedSelectedJobs);
    localStorage.setItem("selectedJobs", JSON.stringify(updatedSelectedJobs));
  };

  const handleRemoveJob = (index) => {
    const updatedSelectedJobs = selectedJobs.filter((_, i) => i !== index);
    setSelectedJobs(updatedSelectedJobs);
    localStorage.setItem("selectedJobs", JSON.stringify(updatedSelectedJobs));
  };

  const handleHire = () => {
    const jobDetails = selectedJobs.map(job => `*${job.profession}* di ${job.city}, ${job.province}`).join('\n');
    const message = `Saya ingin menghire kandidat berikut:\n\n${jobDetails}`;
    const whatsappUrl = `https://wa.me/6285788322061?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container className="mt-4">
      <Row>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col key={job.id} md={4}>
              <JobCard job={job} onSelectJob={handleSelectJob} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="warning">Pekerjaan tidak ditemukan.</Alert>
          </Col>
        )}
      </Row>
      <Cart selectedJobs={selectedJobs} onHire={handleHire} onRemoveJob={handleRemoveJob} />
    </Container>
  );
}

export default SectionCard;