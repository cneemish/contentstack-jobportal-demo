import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useState } from "react";

function ApplyForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    PhoneNumber: "",
    yearsOfExperience: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("PhoneNumber", form.PhoneNumber);
    formData.append("yearsOfExperience", form.yearsOfExperience);
    formData.append("resume", form.file);

    try {
      const response = await fetch("http://localhost:3001/apply", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("Application submitted!");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          PhoneNumber: "",
          yearsOfExperience: "",
          file: null,
        });
      } else {
        alert("Submission failed: " + data.error);
      }
    } catch (err) {
      alert("Submission error: " + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f6f8fa",
      }}
    >
      <div
        style={{
          width: "90vw",
          maxWidth: 700,
          background: "#fff",
          borderRadius: "8px",
          padding: "2rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          margin: "0 auto",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} md="4">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone Number"
                name="PhoneNumber"
                value={form.PhoneNumber}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Years Of Experience</Form.Label>
            <Form.Select
              name="yearsOfExperience"
              value={form.yearsOfExperience}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="0-1">0-1</option>
              <option value="1-2">1-2</option>
              <option value="2-4">2-4</option>
              <option value="4-6">4-6</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="position-relative mb-3">
            <Form.Label>Upload Resume</Form.Label>
            <Form.Control type="file" name="file" onChange={handleChange} />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      </div>
    </div>
  );
}

export default ApplyForm;
