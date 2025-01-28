import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

function JobRegisterPage() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          location,
          province,
          description,
        }),
      });

      if (response.ok) {
        alert("Job registered successfully!");
      } else {
        console.error("Error registering job:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering job:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Register Job</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formJobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter job location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formProvince">
          <Form.Label>Province</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter job description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default JobRegisterPage;