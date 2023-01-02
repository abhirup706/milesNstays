import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Row, Col, Card } from "react-bootstrap";
import "../../stylesheets/addPropertyForm.css";

function HomeInfo({ formData, setFormData }) {
  return (
    <div className="home-info-container">
      <Card style={{ marginBottom: "5%", width: "60%" }}>
        <Card.Header>Property Information</Card.Header>
        <Card.Body style={{ padding: "10%" }}>
          <Form>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label>Property Name</Form.Label>
                  {/* <Col sm="3" md="2"> */}
                  <Form.Control
                    value={formData.property_name}
                    type="text"
                    id="prop_name"
                    placeholder={"Property Name *"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        property_name: e.target.value,
                      })
                    }
                  />
                  {/* </Col> */}
                  {/* </Row>
          <Row><br/></Row>
          <Row> */}
                </Col>
                <Col>
                  <Form.Label>Select Property Type</Form.Label>
                  {/* <Col sm="3" md="2"> */}
                  <Form.Select
                    value={formData.property_type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        property_type: e.target.value,
                      })
                    }
                  >
                    <option value={"Treehouse"} defaultChecked>
                      Tree House
                    </option>
                    <option value={"Apartment"}>Apartment</option>
                    <option value={"Villa"}>Villa</option>
                  </Form.Select>
                  {/* </Col> */}
                </Col>
              </Row>
              <Row>
                <br />
              </Row>

              <Row>
                <Col>
                  <Form.Label>Select Number of Beds</Form.Label>
                  {/* <Col sm="3" md="2"> */}
                  <Form.Select
                    className="form-control form-control-sm"
                    id="exampleFormControlSelect1"
                    value={formData.bed_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bed_count: parseInt(e.target.value, 10),
                      })
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
                </Col>
                <Col>
                  <Form.Label>Select Number of Beds</Form.Label>
                  {/* <Col sm="3" md="2"> */}
                  <Form.Select
                    className="form-control form-control-sm"
                    id="exampleFormControlSelect1"
                    value={formData.bath_count}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bath_count: parseInt(e.target.value, 10),
                      })
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
                </Col>
              </Row>

              <Row>
                <br />
              </Row>

              <Row>
                <Col>
                  <Form.Label>Select Cancellation Policy</Form.Label>
                  <Form.Select
                    value={formData.cancellation_policy}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cancellation_policy: e.target.value,
                      })
                    }
                  >
                    <option value="flexible">Flexible</option>
                    <option value="moderate">Moderate</option>
                    <option value="strict">Strict</option>
                    <option value="restricted">Restricted</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Select Room Type</Form.Label>
                  <Form.Select
                    value={formData.room_type}
                    onChange={(e) =>
                      setFormData({ ...formData, room_type: e.target.value })
                    }
                  >
                    <option value="Private Room">Private Room</option>
                    <option value="Shared Room">Shared Room</option>
                    <option value="Entire Home">Entire Home/Apartment</option>
                    <option value="Hotel Room">Hotel Room</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <br />
              </Row>
              <Row>
                <Form.Label>
                  Give Us A Brief Summary About Your House
                </Form.Label>
                {/* <Col sm="3" md="2"> */}
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={formData.summary}
                  onChange={(e) =>
                    setFormData({ ...formData, summary: e.target.value })
                  }
                />
                {/* </Col> */}
              </Row>
              <Row>
                <br />
              </Row>
              <Row>
                <Form.Label>
                  Give Us A More Detailed Description About Your House
                </Form.Label>
                {/* <Col sm="3" md="2"> */}
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                {/* </Col> */}
              </Row>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default HomeInfo;
