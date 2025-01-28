import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Portal Pekerjaan</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Beranda</Nav.Link>
            <Nav.Link href="/register">Daftar Pekerjaan</Nav.Link>
            <Nav.Link href="/admin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;