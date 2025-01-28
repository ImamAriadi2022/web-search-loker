import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import JobCard from "./JobCard";

const staticJobs = [
  {
    id: 1,
    title: "Software Engineer",
    location: "Jakarta",
    province: "DKI Jakarta",
    description: "Develop and maintain web applications.",
    profession: "Programmer",
  },
  {
    id: 2,
    title: "Graphic Designer",
    location: "Bandung",
    province: "West Java",
    description: "Create visual concepts to communicate ideas.",
    profession: "Digital Marketer",
  },
  {
    id: 3,
    title: "Content Creator",
    location: "Surabaya",
    province: "East Java",
    description: "Produce engaging content for various platforms.",
    profession: "Konten Kreator",
  },
];

function SectionCard({ filter = {} }) {
  const [jobs, setJobs] = useState(staticJobs);

  useEffect(() => {
    const filterJobs = () => {
      const filtered = staticJobs.filter((job) => {
        const matchesProvince = filter.province ? job.province === filter.province : true;
        const matchesDistrict = filter.district ? job.district === filter.district : true;
        const matchesProfession = filter.profession ? job.profession === filter.profession : true;
        return matchesProvince && matchesDistrict && matchesProfession;
      });
      setJobs(filtered);
    };

    filterJobs();
  }, [filter]);

  return (
    <Container className="mt-4">
      <Row>
        {jobs.map((job) => (
          <Col key={job.id} md={4}>
            <JobCard job={job} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SectionCard;