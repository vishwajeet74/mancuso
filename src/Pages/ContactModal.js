import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { InlineWidget } from 'react-calendly';

function ContactModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header>
      <a href='' onClick={(e) => { e.preventDefault(); handleClose(); }} className='icon-box text-white p-2 m-1'>
              <i className="fa-solid fa-xmark"></i>
            </a>
      </Modal.Header>
      <Modal.Body>
        <InlineWidget url="https://calendly.com/mikemancuso?hide_gdpr_banner=1" />
      </Modal.Body>
    </Modal>
  );
}

export default ContactModal;
