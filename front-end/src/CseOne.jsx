import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

function CseOne() {
  const navigate = useNavigate();

  const handleApply = () => {
    navigate("/apply");
  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Customer Success Engineer I Tier 1</Accordion.Header>
        <Accordion.Body>Job JD</Accordion.Body>
      </Accordion.Item>

      <Button
        onClick={handleApply}
        variant="primary"
        size="lg"
        style={{ cursor: "pointer" }}
      >
        Apply Now
      </Button>
    </Accordion>
  );
}

export default CseOne;
