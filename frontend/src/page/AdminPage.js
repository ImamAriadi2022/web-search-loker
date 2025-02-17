import React, { useState } from "react";
import { Container, Table, Form, Button, Row, Col } from "react-bootstrap";
import CostumNavbar from "../components/Navbar";

function AdminPage() {
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
      const matchesSearch = job.name
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
    <>
    <CostumNavbar />
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
              placeholder="Cari berdasarkan nama..."
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
              <th>Nama</th>
              <th>Email</th>
              <th>Telepon</th>
              <th>Profesi</th>
              <th>Kota</th>
              <th>Provinsi</th>
              <th>Deskripsi</th>
              <th>Portofolio</th>
              <th>Gaji</th>
              <th>Pendidikan</th>
              <th>Alamat</th>
              <th>Usia</th>
              <th>Foto</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.name}</td>
                <td>{job.email}</td>
                <td>{job.phone}</td>
                <td>{job.profession}</td>
                <td>{job.city}</td>
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
                <td>Rp {job.salary.toLocaleString()}</td>
                <td>{job.education}</td>
                <td>{job.address}</td>
                <td>{job.age}</td>
                <td>
                  <img src={job.image} alt="Profile" width="50" height="50" />
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
    </>
  );
}

export default AdminPage;