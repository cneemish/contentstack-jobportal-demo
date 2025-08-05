import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

function CseOne() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Customer Success Engineer I Tier 1</Accordion.Header>
        <Accordion.Body>Job JD</Accordion.Body>
      </Accordion.Item>

      <Button variant="primary" size="lg" active>
        Apply Now
      </Button>
    </Accordion>
  );
}

export default CseOne;
