import React, { useState, useEffect } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import JobCard from "./JobCard";

function SectionCard({ filter = {} }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

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