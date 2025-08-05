import React, { useState } from "react";
// Import Bootstrap CSS (essential for react-bootstrap components)
import "bootstrap/dist/css/bootstrap.min.css";
// Import your custom CSS file
import "./style.css"; // This line imports the CSS into your component's scope

// Import React-Bootstrap components
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CseOne from "./CseOne.jsx"; // Import your CseOne component
import CseOneLevelTwo from "./cseOneLevelTwo.jsx";
import InternCse from "./InternCse.jsx";

// The main App component that will render the JobApply component.
// This is typically in App.js or index.js
function App() {
  return (
    // The JobApply component will handle its own layout and styling
    <JobApply />
  );
}

function JobApply() {
  const [show, setShow] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleShow = (job) => {
    setSelectedJob(job);
    setShow(true);
  };
  const handleClose = () => setShow(false);

  return (
    // React.Fragment allows returning multiple top-level elements without adding an extra DOM node
    <React.Fragment>
      {/* Navbar fixed to the top */}
      <Navbar
        fixed="top"
        expand="lg"
        className="bg-body-tertiary custom-navbar-shadow"
      >
        <Container>
          <Navbar.Brand href="#home" className="custom-navbar-brand">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Apply Job</Nav.Link>
              <Nav.Link href="#link">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main content area to center the ListGroup */}
      {/* The 'main-content-area' class will handle centering the list group */}
      <div className="main-content-area">
        <ListGroup as="ul" className="centered-list-group">
          <ListGroup.Item
            as="li"
            active={selectedJob === "CSE1"}
            onClick={() => handleShow("CSE1")}
            style={{ cursor: "pointer" }}
          >
            Customer Success Engineer I Tier 1
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={selectedJob === "CSE2"}
            onClick={() => handleShow("CSE2")}
            style={{ cursor: "pointer" }}
          >
            Customer Success Engineer II Tier 1
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            active={selectedJob === "CSE3"}
            onClick={() => handleShow("CSE3")}
            style={{ cursor: "pointer" }}
          >
            Intern Customer Success Engineer
          </ListGroup.Item>
        </ListGroup>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedJob === "CSE1"
              ? "Customer Success Engineer I Tier 1"
              : selectedJob === "CSE2"
              ? "Customer Success Engineer II Tier 1"
              : selectedJob === "CSE3"
              ? "Intern Customer Success Engineer"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedJob === "CSE1" && <CseOne />}
          {selectedJob === "CSE2" && <CseOneLevelTwo />}
          {selectedJob === "CSE3" && <InternCse />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default App; // Export the App component as default
