import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const staticProvinces = [
  { id: 1, text: "DKI Jakarta" },
  { id: 2, text: "West Java" },
  { id: 3, text: "East Java" },
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

  const handleFilter = () => {
    onFilter({
      province: selectedProvince,
      district: selectedDistrict,
      profession: selectedProfession,
    });
  };

  return (
    <Container className="mt-4">
      <h3>Filter Jobs</h3>
      <Form>
        <Form.Group as={Row} controlId="formProvince">
          <Form.Label column sm={2}>Province:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
            >
              <option value="">Select Province</option>
              {staticProvinces.map((province) => (
                <option key={province.id} value={province.text}>
                  {province.text}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDistrict">
          <Form.Label column sm={2}>District:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedProvince}
            >
              <option value="">Select District</option>
              {staticDistricts.map((district) => (
                <option key={district.id} value={district.text}>
                  {district.text}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formProfession">
          <Form.Label column sm={2}>Profession:</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="select"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
            >
              <option value="">Select Profession</option>
              <option value="Programmer">Programmer</option>
              <option value="Digital Marketer">Digital Marketer</option>
              <option value="Konten Kreator">Konten Kreator</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Button variant="primary" onClick={handleFilter}>
          Apply Filters
        </Button>
      </Form>
    </Container>
  );
}

export default Filter;