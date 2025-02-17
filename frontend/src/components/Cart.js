import React, { useState } from "react";
import { Button, Offcanvas, ListGroup, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";

function Cart({ selectedJobs, onHire, onRemoveJob }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleHire = () => {
    const jobDetails = selectedJobs.map(job => `*${job.profession}* di ${job.city}, ${job.province}`).join('\n');
    const message = `Saya ingin menghire kandidat berikut:\n\n${jobDetails}`;
    const whatsappUrl = `https://wa.me/6285788322061?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

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
          <Button variant="success" className="mt-3 btn-block" onClick={handleHire} disabled={selectedJobs.length === 0}>
            Hire
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Cart;