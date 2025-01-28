import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import JobCard from "./JobCard";

const staticJobs = [
  {
    id: 1,
    title: "Software Engineer",
    location: "Jakarta",
    province: "DKI Jakarta",
    description: "Mengembangkan dan memelihara aplikasi web.",
    profession: "Programmer",
  },
  {
    id: 2,
    title: "Graphic Designer",
    location: "Bandung",
    province: "Jawa Barat",
    description: "Membuat konsep visual untuk mengkomunikasikan ide.",
    profession: "Digital Marketer",
  },
  {
    id: 3,
    title: "Content Creator",
    location: "Surabaya",
    province: "Jawa Timur",
    description: "Menghasilkan konten yang menarik untuk berbagai platform.",
    profession: "Konten Kreator",
  },
];

function SectionCard({ filter = {} }) {
  const [jobs, setJobs] = useState(staticJobs);
  const [filteredJobs, setFilteredJobs] = useState(staticJobs);

  useEffect(() => {
    const filterJobs = () => {
      const filtered = jobs.filter((job) => {
        const matchesProvince = filter.province ? job.province === filter.province : true;
        const matchesDistrict = filter.district ? job.location === filter.district : true;
        const matchesProfession = filter.profession ? job.profession === filter.profession : true;
        return matchesProvince && matchesDistrict && matchesProfession;
      });
      setFilteredJobs(filtered);
    };

    filterJobs();
  }, [filter, jobs]);

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