import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const staticProvinces = [
  { id: 1, text: "DKI Jakarta" },
  { id: 2, text: "Jawa Barat" },
  { id: 3, text: "Jawa Timur" },
];

const staticDistricts = [
  { id: 1, text: "Jakarta" },
  { id: 2, text: "Bandung" },
  { id: 3, text: "Surabaya" },
];

function Filter({ onFilter }) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const handleFilter = () => {
    onFilter({
      province: selectedProvince,
      district: selectedDistrict,
      profession: selectedProfession,
      salary: selectedSalary,
      education: selectedEducation,
      age: selectedAge,
    });
  };

  const handleReset = () => {
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedProfession("");
    setSelectedSalary("");
    setSelectedEducation("");
    setSelectedAge("");
    onFilter({
      province: "",
      district: "",
      profession: "",
      salary: "",
      education: "",
      age: "",
    });
  };

  return (
    <Container className="mt-4">
      <h3>Filter Pekerjaan</h3>
      <Form>
        <Form.Group as={Row} controlId="formProvince">
          <Form.Label column sm={2}>Provinsi:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Pilih Provinsi</option>
              {staticProvinces.map((province) => (
                <option key={province.id} value={province.text}>
                  {province.text}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDistrict">
          <Form.Label column sm={2}>Kota/Kabupaten:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedProvince}
            >
              <option value="">Pilih Kota/Kabupaten</option>
              {staticDistricts.map((district) => (
                <option key={district.id} value={district.text}>
                  {district.text}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formSalary">
          <Form.Label column sm={2}>Gaji Bulanan:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={selectedSalary}
              onChange={(e) => setSelectedSalary(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formEducation">
          <Form.Label column sm={2}>Pendidikan Terakhir:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={selectedEducation}
              onChange={(e) => setSelectedEducation(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formAge">
          <Form.Label column sm={2}>Usia:</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              value={selectedAge}
              onChange={(e) => setSelectedAge(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formProfession">
          <Form.Label column sm={2}>Profesi:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
            >
              <option value="">Pilih Profesi</option>
              <option value="Programmer">Programmer</option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="Konten Kreator">Konten Kreator</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Row>
          <Col sm={6}>
            <Button variant="primary" onClick={handleFilter} block>
              Terapkan Filter
            </Button>
          </Col>
          <Col sm={6}>
            <Button variant="secondary" onClick={handleReset} block>
              Atur Ulang Filter
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Filter;