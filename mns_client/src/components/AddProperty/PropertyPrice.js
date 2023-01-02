import React from "react";
import "../../stylesheets/addPropertyForm.css";
import { Modal, Form, Row, Col, Card } from "react-bootstrap";

function PropertyPrice({ formData, setFormData }) {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      cost: {
        ...prevFormData.cost,
        [name]: value,
      },
    }));
  };

  return (
    <div className="price-container">
      <Card style={{ marginBottom: "5%", width: "60%" }}>
        <Card.Header>Price Details</Card.Header>
        <Card.Body style={{ padding: "10%" }}>
          <Form>
            <Row sm="3" md="2">
              <Col sm="3" md="4">
                <Form.Label>Enter Price Per Night *</Form.Label>
                <Form.Control
                  value={formData.cost.per_night}
                  type="number"
                  name="per_night"
                  id="Price Per Night"
                  placeholder={"Enter Price Per Night *"}
                  onChange={handleChange}
                />
              </Col>
              {/* </Row>
              <Row><br /></Row> */}
              {/* <Row sm="2" md="2"> */}

              <Col sm="3" md="4">
                <Form.Label>Enter Cleaning Fee *</Form.Label>
                <Form.Control
                  value={formData.cost.cleaning_fee}
                  type="number"
                  name="cleaning_fee"
                  id="Price Per Night"
                  placeholder={"Enter Price Per Night *"}
                  onChange={handleChange}
                />
              </Col>
              {/* </Row>
              <Row><br/></Row>
              <Row sm="3" md="2"> */}

              <Col sm="3" md="4">
                <Form.Label>Enter Deposit Amount *</Form.Label>
                <Form.Control
                  value={formData.cost.deposit}
                  type="number"
                  name="deposit"
                  id="Price Per Night"
                  placeholder={"Enter Price Per Night *"}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PropertyPrice;
