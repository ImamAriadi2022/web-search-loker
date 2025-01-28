import React, { useState, useEffect } from "react";
import { Container, Table, Form, Button, Row, Col } from "react-bootstrap";

function AdminPage() {
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProfession, setFilterProfession] = useState("");

  // Fetch applicants when the component mounts
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await fetch("/api/applicants"); // API endpoint
        const data = await response.json();
        setApplicants(data);
        setFilteredApplicants(data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      }
    };

    fetchApplicants();
  }, []);

  // Handle approve action
  const handleApprove = async (id) => {
    try {
      await fetch(`/api/applicants/${id}/approve`, {
        method: "POST",
      });
      setFilteredApplicants((prev) =>
        prev.filter((applicant) => applicant.id !== id)
      );
      alert("Lamaran disetujui!");
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  // Handle reject action
  const handleReject = async (id) => {
    try {
      await fetch(`/api/applicants/${id}/reject`, {
        method: "POST",
      });
      setFilteredApplicants((prev) =>
        prev.filter((applicant) => applicant.id !== id)
      );
      alert("Lamaran ditolak!");
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  // Handle search query
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterApplicants(e.target.value, filterProfession);
  };

  // Handle profession filter
  const handleFilterProfession = (e) => {
    setFilterProfession(e.target.value);
    filterApplicants(searchQuery, e.target.value);
  };

  // Filter applicants based on search and profession
  const filterApplicants = (search, profession) => {
    const filtered = applicants.filter((applicant) => {
      const matchesSearch = applicant.fullName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesProfession = profession
        ? applicant.profession === profession
        : true;
      return matchesSearch && matchesProfession;
    });
    setFilteredApplicants(filtered);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Panel Admin</h1>

      {/* Total Applicants */}
      <h2 className="mb-4">Total Pelamar: {filteredApplicants.length}</h2>

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
              <option value="Software Engineer">Software Engineer</option>
              <option value="Graphic Designer">Graphic Designer</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="Content Writer">Content Writer</option>
            </Form.Control>
          </Col>
        </Row>
      </Form>

      {/* Applicants Table */}
      {filteredApplicants.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nama</th>
              <th>Profesi</th>
              <th>Portofolio</th>
              <th>Media Sosial</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant) => (
              <tr key={applicant.id}>
                <td>{applicant.fullName}</td>
                <td>{applicant.profession}</td>
                <td>
                  <a
                    href={applicant.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat Portofolio
                  </a>
                </td>
                <td>
                  <a
                    href={applicant.socialMedia}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lihat Profil
                  </a>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleApprove(applicant.id)}
                    className="mr-2"
                  >
                    Setujui
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(applicant.id)}
                  >
                    Tolak
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Tidak ada pelamar ditemukan.</p>
      )}
    </Container>
  );
}

export default AdminPage;