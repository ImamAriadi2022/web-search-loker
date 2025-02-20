import React, { useState, useEffect } from "react";
import { Button, Offcanvas, ListGroup, Badge, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import LoginModal from "./LoginModal";

function Cart({ selectedJobs, onRemoveJob }) {
  const [show, setShow] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showWaiting, setShowWaiting] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [subscriptionType, setSubscriptionType] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(localStorage.getItem("isSubscribed") === "true");
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    setIsSubscribed(localStorage.getItem("isSubscribed") === "true");
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (isLoggedIn) {
      setShow(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = () => {
    setShowLogin(false);
    setShow(true);
  };

  const handlePayment = () => {
    setShowPayment(true);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  const handleSubscriptionChange = (e) => {
    setSubscriptionType(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePurchase = () => {
    if (subscriptionType === "Bulanan" || subscriptionType === "Tahunan") {
      localStorage.setItem("isSubscribed", "true");
      setIsSubscribed(true);
    }
    setShowPayment(false);
    setShowWaiting(true);
    setTimeout(() => {
      setShowWaiting(false);
      setShowDetails(true);
    }, 4000);
  };

  const handleUnsubscribe = () => {
    localStorage.removeItem("isSubscribed");
    setIsSubscribed(false);
  };

  const handleDownloadPDF = () => {
    alert("PDF telah diunduh!");
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  const totalPrice = selectedJobs.length * 10000;

  return (
    <>
      <Button variant="primary" className="cart-button" onClick={handleShow}>
        <FaShoppingCart />
        {selectedJobs.length > 0 && (
          <Badge pill bg="danger" className="cart-badge">
            {selectedJobs.length}
          </Badge>
        )}
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Keranjang</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedJobs.length > 0 ? (
            <ListGroup>
              {selectedJobs.map((job, index) => (
                <ListGroup.Item key={index}>
                  {job.profession} di {job.city}, {job.province}
                  <Button variant="danger" size="sm" className="float-end" onClick={() => onRemoveJob(index)}>
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
            {!isSubscribed && (
              <>
                <Button variant="success" className="mt-3 btn-block" onClick={handlePayment} disabled={selectedJobs.length === 0}>
                  Beli Data
                </Button>
                <Button variant="info" className="mt-3 btn-block" onClick={handlePayment}>
                  Langganan
                </Button>
              </>
            )}
            {isSubscribed && (
              <>
                <Alert variant="success" className="mt-3">
                  Anda telah berlangganan. Tunggu admin memberikan data lengkap.
                </Alert>
                <Button variant="primary" className="mt-3 btn-block" onClick={handleShowDetails}>
                  Dapatkan Detail Data
                </Button>
                <Button variant="danger" className="mt-3 btn-block" onClick={handleUnsubscribe}>
                  Berhenti Berlangganan
                </Button>
              </>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <LoginModal show={showLogin} handleClose={() => setShowLogin(false)} handleLogin={handleLogin} />

      <Modal show={showPayment} onHide={handlePaymentClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formSubscriptionType">
              <Form.Label>Jenis Langganan</Form.Label>
              <Form.Control as="select" value={subscriptionType} onChange={handleSubscriptionChange}>
                <option value="">Pilih Langganan</option>
                <option value="Satuan">Satuan (Rp 10,000 per data)</option>
                <option value="Bulanan">Bulanan (Rp 500,000 per bulan, 6 data per hari)</option>
                <option value="Tahunan">Tahunan (Rp 4,000,000 per tahun, 100 data per bulan)</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formPaymentMethod" className="mt-3">
              <Form.Label>Metode Pembayaran</Form.Label>
              <Form.Control as="select" value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option value="">Pilih Metode Pembayaran</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="QRIS">QRIS</option>
                <option value="Dana">Dana</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePaymentClose}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handlePurchase} disabled={!subscriptionType || !paymentMethod}>
            Bayar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showWaiting} onHide={() => setShowWaiting(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Menunggu Konfirmasi</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="mt-3">Tunggu sebentar, admin sedang memproses data Anda...</p>
        </Modal.Body>
      </Modal>

      <Modal show={showDetails} onHide={() => setShowDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Data Lengkap</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Berikut adalah detail data lengkap yang diberikan oleh admin:</p>
          <ul>
            {selectedJobs.map((job, index) => (
              <li key={index}>
                <strong>{job.profession}</strong> di {job.city}, {job.province}
                <ul>
                  <li>Gaji: Rp {job.salary.toLocaleString()}</li>
                  <li>Pendidikan: {job.education}</li>
                  <li>Alamat: {job.address}</li>
                  <li>Usia: {job.age} tahun</li>
                  <li>Portofolio: {job.portfolio.join(", ")}</li>
                </ul>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetails(false)}>
            Tutup
          </Button>
          <Button variant="primary" onClick={handleDownloadPDF}>
            Unduh sebagai PDF
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;