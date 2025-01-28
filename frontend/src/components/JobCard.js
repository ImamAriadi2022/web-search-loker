import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";

function JobCard({ job }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="mb-3">
        <Card.Img variant="top" src={job.image} alt={job.title} />
        <Card.Body>
          <Card.Title>{job.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {job.location}, {job.province}
          </Card.Subtitle>
          <Card.Text>{job.description}</Card.Text>
          <Card.Text className="text-muted">Profession: {job.profession}</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            View Details
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={job.image} alt={job.title} className="img-fluid mb-3" />
          <h5>Location: {job.location}, {job.province}</h5>
          <p>{job.description}</p>
          <p className="text-muted">Profession: {job.profession}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default JobCard;