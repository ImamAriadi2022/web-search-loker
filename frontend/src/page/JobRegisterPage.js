import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";

function JobRegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [image, setImage] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [manualInput, setManualInput] = useState(false);

  useEffect(() => {
    axios.get('https://alamat.thecloudalert.com/api/provinsi/get/')
      .then(response => {
        setProvinces(response.data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the provinces!', error);
        setManualInput(true);
      });
  }, []);

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    setProvince(provinceId);
    setLocation("");

    // Fetch cities based on selected province
    axios.get(`https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${provinceId}`)
      .then(response => {
        setCities(response.data.result);
      })
      .catch(error => {
        console.error('There was an error fetching the cities!', error);
        setManualInput(true);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("title", title);
    formData.append("location", location);
    formData.append("province", province);
    formData.append("description", description);
    formData.append("portfolio", portfolio);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/api/jobs", {
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
        <Form.Group controlId="formName">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Masukkan email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Nomor Telepon/WA</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan nomor telepon atau WA"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formJobTitle">
          <Form.Label>Profesi</Form.Label>
          <Form.Control
            as="select"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          >
            <option value="">Pilih Profesi</option>
            <option value="Programmer">Programmer</option>
            <option value="Digital Marketer">Digital Marketer</option>
            <option value="Konten Kreator">Konten Kreator</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProvince">
          <Form.Label>Provinsi</Form.Label>
          <Form.Control
            as="select"
            value={province}
            onChange={handleProvinceChange}
          >
            <option value="">Pilih Provinsi</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.text}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formLocation">
          <Form.Label>Kota/Kabupaten</Form.Label>
          <Form.Control
            as="select"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!province}
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.text}
              </option>
            ))}
          </Form.Control>
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