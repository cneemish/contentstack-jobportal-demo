import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

function InternCse() {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Intern Customer Success Engineer</Accordion.Header>
        <Accordion.Body>Job JD</Accordion.Body>
      </Accordion.Item>

      <Button variant="primary" size="lg" active>
        Apply Now
      </Button>
    </Accordion>
  );
}

export default InternCse;
