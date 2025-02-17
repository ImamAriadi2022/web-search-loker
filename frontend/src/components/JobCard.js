import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import JobCard from "./JobCard";

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
    portfolio: "https://example.com/portfolio1.jpg",
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
    portfolio: "https://example.com/portfolio2.jpg",
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
    portfolio: "https://example.com/portfolio3.jpg",
  },
];

function SectionCard({ filter = {} }) {
  const [filteredJobs, setFilteredJobs] = useState(staticJobs);

  useEffect(() => {
    const filterJobs = () => {
      const filtered = staticJobs.filter((job) => {
        const matchesProvince = filter.province ? job.province === filter.province : true;
        const matchesDistrict = filter.district ? job.location === filter.district : true;
        const matchesProfession = filter.profession ? job.profession === filter.profession : true;
        const matchesCity = filter.city ? job.city === filter.city : true;
        const matchesSalary = filter.salary ? job.salary === parseInt(filter.salary) : true;
        const matchesEducation = filter.education ? job.education === filter.education : true;
        const matchesAddress = filter.address ? job.address.includes(filter.address) : true;
        const matchesAge = filter.age ? job.age === parseInt(filter.age) : true;
        return (
          matchesProvince &&
          matchesDistrict &&
          matchesProfession &&
          matchesCity &&
          matchesSalary &&
          matchesEducation &&
          matchesAddress &&
          matchesAge
        );
      });
      setFilteredJobs(filtered);
    };

    filterJobs();
  }, [filter]);

  return (
    <Container className="mt-4">
      <Row>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Col key={job.id} md={4}>
              <JobCard job={job} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="warning">Pekerjaan tidak ditemukan.</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default SectionCard;