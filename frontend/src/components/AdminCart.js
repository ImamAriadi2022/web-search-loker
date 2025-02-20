import React, { useState, useEffect } from "react";
import { Button, Offcanvas, ListGroup, Badge, Modal, Spinner, Alert } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import CustomNavbar from "../components/Navbar";

function AdminCart() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "08123456789",
      profession: "Programmer",
      city: "Jakarta",
      province: "DKI Jakarta",
      description: "Mengembangkan dan memelihara aplikasi web.",
      portfolio: "https://example.com/portfolio1",
      salary: 10000000,
      education: "S1",
      address: "Jl. Sudirman",
      age: 25,
      image: "https://example.com/profile1.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "08123456788",
      profession: "Digital Marketer",
      city: "Bandung",
      province: "Jawa Barat",
      description: "Membuat konsep visual untuk mengkomunikasikan ide.",
      portfolio: "https://example.com/portfolio2",
      salary: 8000000,
      education: "S1",
      address: "Jl. Asia Afrika",
      age: 28,
      image: "https://example.com/profile2.jpg"
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "08123456787",
      profession: "Konten Kreator",
      city: "Surabaya",
      province: "Jawa Timur",
      description: "Menghasilkan konten yang menarik untuk berbagai platform.",
      portfolio: "https://example.com/portfolio3",
      salary: 7000000,
      education: "SMA",
      address: "Jl. Tunjungan",
      age: 22,
      image: "https://example.com/profile3.jpg"
    }
  ]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShowDetails = (job) => {
    setSelectedJob(job);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
    setShowDetails(false);
  };

  const handleApprove = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    alert("Pekerjaan disetujui!");
  };

  const handleReject = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    alert("Pekerjaan ditolak!");
  };

  const handleDelete = (id) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
    alert("Pekerjaan dihapus!");
  };

  const totalPrice = jobs.length * 10000;

  return (
    <>
      <Button variant="primary" className="cart-button" onClick={handleShow}>
        <FaShoppingCart />
        {jobs.length > 0 && (
          <Badge pill bg="danger" className="cart-badge">
            {jobs.length}
          </Badge>
        )}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Keranjang Admin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {jobs.length > 0 ? (
            <ListGroup>
              {jobs.map((job, index) => (
                <ListGroup.Item key={index}>
                  {job.profession} di {job.city}, {job.province}
                  <Button variant="info" size="sm" className="float-end" onClick={() => handleShowDetails(job)}>
                    Lihat Detail
                  </Button>
                  <Button variant="success" size="sm" className="float-end me-2" onClick={() => handleApprove(job.id)}>
                    Setujui
                  </Button>
                  <Button variant="danger" size="sm" className="float-end me-2" onClick={() => handleReject(job.id)}>
                    Tolak
                  </Button>
                  <Button variant="secondary" size="sm" className="float-end me-2" onClick={() => handleDelete(job.id)}>
                    Hapus
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Keranjang kosong</p>
          )}
          <div className="mt-3">
            <h5>Total Harga: Rp {totalPrice.toLocaleString()}</h5>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Pekerjaan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob && (
            <>
              <p><strong>Nama:</strong> {selectedJob.name}</p>
              <p><strong>Email:</strong> {selectedJob.email}</p>
              <p><strong>Telepon:</strong> {selectedJob.phone}</p>
              <p><strong>Profesi:</strong> {selectedJob.profession}</p>
              <p><strong>Kota:</strong> {selectedJob.city}</p>
              <p><strong>Provinsi:</strong> {selectedJob.province}</p>
              <p><strong>Deskripsi:</strong> {selectedJob.description}</p>
              <p><strong>Portofolio:</strong> <a href={selectedJob.portfolio} target="_blank" rel="noopener noreferrer">Lihat Portofolio</a></p>
              <p><strong>Gaji:</strong> Rp {selectedJob.salary.toLocaleString()}</p>
              <p><strong>Pendidikan:</strong> {selectedJob.education}</p>
              <p><strong>Alamat:</strong> {selectedJob.address}</p>
              <p><strong>Usia:</strong> {selectedJob.age}</p>
              <p><strong>Foto:</strong> <img src={selectedJob.image} alt="Profile" width="100" height="100" /></p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminCart;