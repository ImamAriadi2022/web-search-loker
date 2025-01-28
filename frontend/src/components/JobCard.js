import React from "react";
import { Card } from "react-bootstrap";

function JobCard({ job }) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{job.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {job.location}, {job.province}
        </Card.Subtitle>
        <Card.Text>{job.description}</Card.Text>
        <Card.Text className="text-muted">Profession: {job.profession}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default JobCard;