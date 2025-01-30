import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button, Row, Col } from "react-bootstrap";

function AdminPage() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      location: "Jakarta",
      province: "DKI Jakarta",
      description: "Mengembangkan dan memelihara aplikasi web.",
      portfolio: "https://example.com/portfolio1",
      profession: "Programmer"
    },
    {
      id: 2,
      title: "Graphic Designer",
      location: "Bandung",
      province: "Jawa Barat",
      description: "Membuat konsep visual untuk mengkomunikasikan ide.",
      portfolio: "https://example.com/portfolio2",
      profession: "Digital Marketer"
    },
    {
      id: 3,
      title: "Content Creator",
      location: "Surabaya",
      province: "Jawa Timur",
      description: "Menghasilkan konten yang menarik untuk berbagai platform.",
      portfolio: "https://example.com/portfolio3",
      profession: "Konten Kreator"
    }
  ]);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProfession, setFilterProfession] = useState("");

  // Handle approve action
  const handleApprove = (id) => {
    setFilteredJobs((prev) =>
      prev.filter((job) => job.id !== id)
    );
    alert("Pekerjaan disetujui!");
  };

  // Handle reject action
  const handleReject = (id) => {
    setFilteredJobs((prev) =>
      prev.filter((job) => job.id !== id)
    );
    alert("Pekerjaan ditolak!");
  };

  // Handle delete action
  const handleDelete = (id) => {
    setFilteredJobs((prev) =>
      prev.filter((job) => job.id !== id)
    );
    alert("Pekerjaan dihapus!");
  };

  // Handle search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterJobs(e.target.value, filterProfession);
  };

  // Handle profession filter
  const handleFilterProfession = (e) => {
    setFilterProfession(e.target.value);
    filterJobs(searchQuery, e.target.value);
  };

  // Filter jobs based on search and profession
  const filterJobs = (search, profession) => {
    const filtered = jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesProfession = profession
        ? job.profession === profession
        : true;
      return matchesSearch && matchesProfession;
    });
    setFilteredJobs(filtered);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Panel Admin</h1>

      {/* Total Jobs */}
      <h2 className="mb-4">Total Pekerjaan: {filteredJobs.length}</h2>

      {/* Search and Filter Section */}
      <Form className="mb-4">
        <Row>
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Cari berdasarkan judul..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </Col>
          <Col md={6}>
            <Form.Control
              as="select"
              value={filterProfession}
              onChange={handleFilterProfession}
            >
              <option value="">Semua Profesi</option>
              <option value="Programmer">Programmer</option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="Konten Kreator">Konten Kreator</option>
            </Form.Control>
          </Col>
        </Row>
      </Form>

      {/* Jobs Table */}
      {filteredJobs.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Judul</th>
              <th>Lokasi</th>
              <th>Provinsi</th>
              <th>Deskripsi</th>
              <th>Portofolio</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{job.province}</td>
                <td>{job.description}</td>
                <td>
                  <a
                    href={job.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat Portofolio
                  </a>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(job.id)}
                    className="mr-2"
                  >
                    Setujui
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(job.id)}
                    className="mr-2"
                  >
                    Tolak
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDelete(job.id)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Tidak ada pekerjaan ditemukan.</p>
      )}
    </Container>
  );
}

export default AdminPage;