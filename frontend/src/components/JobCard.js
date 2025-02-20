import React, { useState } from "react";
import { Card, Button, Modal, Image, Carousel } from "react-bootstrap";
import LoginModal from "./LoginModal";

function JobCard({ job, onSelectJob }) {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (isLoggedIn) {
      onSelectJob(job);
      setShow(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setShowLogin(false);
    onSelectJob(job);
    setShow(true);
  };

  return (
    <>
      <Card className="mb-3">
        {job.profileImage && (
          <Card.Img variant="top" src={job.profileImage} alt="Profile Image" />
        )}
        <Card.Body>
          <Card.Title>{job.profession}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {job.city}, {job.province}
          </Card.Subtitle>
          <Card.Text>Gaji: Rp {job.salary.toLocaleString()}</Card.Text>
          <Card.Text>Pendidikan: {job.education}</Card.Text>
          <Card.Text>Alamat: {job.address}</Card.Text>
          <Card.Text>Usia: {job.age} tahun</Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Lihat Detail
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{job.profession}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={job.profileImage} alt="Profile Image" fluid className="mb-3" />
          <h5>Lokasi: {job.city}, {job.province}</h5>
          <p>Gaji: Rp {job.salary.toLocaleString()}</p>
          <p>Pendidikan: {job.education}</p>
          <p>Alamat: {job.address}</p>
          <p>Usia: {job.age} tahun</p>
          {job.portfolio && job.portfolio.length > 0 && (
            <div>
              <h5>Portofolio:</h5>
              <Carousel>
                {job.portfolio.map((image, index) => (
                  <Carousel.Item key={index}>
                    <Image src={process.env.PUBLIC_URL + image} alt={`Portfolio ${index + 1}`} fluid />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />
    </>
  );
}

export default JobCard;