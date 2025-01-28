import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function JobRegisterPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("province", province);
    formData.append("description", description);
    formData.append("portfolio", portfolio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Pekerjaan berhasil didaftarkan!");
      } else {
        console.error("Error mendaftarkan pekerjaan:", response.statusText);
      }
    } catch (error) {
      console.error("Error mendaftarkan pekerjaan:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Daftarkan Pekerjaan</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formJobTitle">
          <Form.Label>Judul Pekerjaan</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan judul pekerjaan"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formLocation">
          <Form.Label>Lokasi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan lokasi pekerjaan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProvince">
          <Form.Label>Provinsi</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan provinsi"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Masukkan deskripsi pekerjaan"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPortfolio">
          <Form.Label>Link Portofolio</Form.Label>
          <Form.Control
            type="url"
            placeholder="Masukkan link portofolio"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formImage">
          <Form.Label>Unggah Foto</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Daftar
        </Button>
      </Form>
    </Container>
  );
}

export default JobRegisterPage;