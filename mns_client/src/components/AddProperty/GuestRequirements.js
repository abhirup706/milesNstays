import React from "react";
import { Modal, Form, Row, Col, Card } from "react-bootstrap";
import "../../stylesheets/addPropertyForm.css";

function GuestRequirements({ formData, setFormData }) {
  console.log({ formData });
  return (
    <div className="guest-req-container">
      <Card style={{ marginBottom: "5%", width: "60%" }}>
        <Card.Header>A Few More Details</Card.Header>
        <Card.Body style={{ padding: "10%" }}>
          <Form>
            <Row sm="3" md="2">
              <Form.Label>Select Maximum Number of Guests</Form.Label>
              {/* <Col sm="3" md="2"> */}
              <Form.Select
                className="form-control form-control-sm"
                id="exampleFormControlSelect1"
                value={formData.max_guests}
                onChange={(e) =>
                  setFormData({ ...formData, max_guests: e.target.value })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9 +</option>
              </Form.Select>
            </Row>
            <Row>
              <br />
            </Row>
            <Row sm="2" md="2">
              <Form.Label>Select Minimum Number of Nights</Form.Label>
              {/* <Col sm="3" md="2"> */}
              <Form.Select
                className="form-control form-control-sm"
                id="exampleFormControlSelect1"
                value={formData.min_nights}
                onChange={(e) =>
                  setFormData({ ...formData, min_nights: e.target.value })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9 +</option>
              </Form.Select>
            </Row>
            <Row>
              <br />
            </Row>
            <Row sm="3" md="2">
              <Form.Label>Select Maximum Number of Nights</Form.Label>
              {/* <Col sm="3" md="2"> */}
              <Form.Select
                className="form-control form-control-sm"
                id="exampleFormControlSelect1"
                value={formData.max_nights}
                onChange={(e) =>
                  setFormData({ ...formData, max_nights: e.target.value })
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9 +</option>
              </Form.Select>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default GuestRequirements;
