import React, { useState } from "react";
import "../../stylesheets/addPropertyForm.css";
import { Modal, Form, Row, Col, Card } from "react-bootstrap";
import TimePicker from "react-bootstrap-time-picker";

function PropertyRules({ formData, setFormData }) {
  const [isSmokingOn, setIsSmokingOn] = useState(false);
  const [isPetsOn, setIsPetsOn] = useState(false);
  const [isPartiesOn, setIsPartiesOn] = useState(false);

  const handleChangeCheckin = (newTime) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      house_rules: {
        ...prevFormData.house_rules,
        check_in: newTime,
      },
    }));
  };

  const handleChangeCheckout = (newTime) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      house_rules: {
        ...prevFormData.house_rules,
        check_out: newTime,
      },
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "check_in" || name === "check_out") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        house_rules: {
          ...prevFormData.house_rules,
          [name]: value.toString(),
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        house_rules: {
          ...prevFormData.house_rules,
          [name]: value.toString(),
        },
      }));
    }
  };

  const handleChangeSwitchSmoking = (event) => {
    setIsSmokingOn(!isSmokingOn);
    setFormData((prevFormData) => ({
      ...prevFormData,
      house_rules: {
        ...prevFormData.house_rules,
        smoking: isSmokingOn,
      },
    }));
  };

  const handleChangeSwitchPets = (event) => {
    setIsPetsOn(!isPetsOn);
    setFormData((prevFormData) => ({
      ...prevFormData,
      house_rules: {
        ...prevFormData.house_rules,
        pets: isPetsOn,
      },
    }));
  };

  const handleChangeSwitchParties = (event) => {
    setIsPartiesOn(!isPartiesOn);
    setFormData((prevFormData) => ({
      ...prevFormData,
      house_rules: {
        ...prevFormData.house_rules,
        parties: isPartiesOn,
      },
    }));
  };

  const handleChangeCheck = (event) => {
    let e_name = event.target.name;
    if (formData.amenities[e_name]) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amenities: {
          ...prevFormData.amenities,
          [event.target.name]: false,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        amenities: {
          ...prevFormData.amenities,
          [event.target.name]: true,
        },
      }));
    }
  };

  return (
    <div className="house-rules-container">
      <Card style={{ marginBottom: "5%", width: "60%" }}>
        <Card.Header>Price Details</Card.Header>
        <Card.Body style={{ padding: "10%" }}>
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Enter Check In Time</Form.Label>
                <TimePicker
                  name="check_in"
                  onChange={handleChangeCheckin}
                  value={formData.house_rules.check_in}
                />
              </Col>
              <Col>
                <Form.Label>Enter Check Out Time</Form.Label>
                <TimePicker
                  name="check_out"
                  onChange={handleChangeCheckout}
                  value={formData.house_rules.check_out}
                />
              </Col>
              <Col>
                <Form.Label>Select Check In Type</Form.Label>
                <Form.Select
                  name="check_in_type"
                  value={formData.house_rules.check_in_type}
                  onChange={handleChange}
                >
                  <option value={"Self Check-in"} defaultChecked>
                    Self Check-In
                  </option>
                  <option value={"Locker"}>Locker</option>
                  <option value={"Contact"}>Contact Host</option>
                </Form.Select>
              </Col>
            </Row>

            <Row>
              <br />
            </Row>

            <Row>
              <Col>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  name="smoking"
                  label="Smoking is Allowed"
                  checked={formData.house_rules.smoking}
                  onChange={handleChangeSwitchSmoking}
                />
              </Col>
              <Col>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Pets Are Allowed"
                  checked={formData.house_rules.pets}
                  onChange={handleChangeSwitchPets}
                />
              </Col>
              <Col>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Parties Are Allowed"
                  checked={formData.house_rules.parties}
                  onChange={handleChangeSwitchParties}
                />
              </Col>
            </Row>
            <Row>
              <br />
            </Row>
            <Row>
              <Form.Label>Select The Amenities</Form.Label>
            </Row>
            <Col>
              <Row>
                <label>
                  <input
                    type="checkbox"
                    name="swimming_pool"
                    checked={formData.amenities.swimming_pool}
                    onChange={handleChangeCheck}
                  />
                  Infinity Pool
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="natural_gas_barbeque"
                    checked={formData.amenities.natural_gas_barbeque}
                    onChange={handleChangeCheck}
                  />
                  Natural Gas Barbeque
                </label>
              </Row>
              <Row>
                <label>
                  <input
                    type="checkbox"
                    name="sun_lounger"
                    checked={formData.amenities.sun_lounger}
                    onChange={handleChangeCheck}
                  />
                  Sun Lounger
                </label>
              </Row>
            </Col>
            <Col>
              <Row>
                <label>
                  <input
                    type="checkbox"
                    name="garden"
                    checked={formData.amenities.garden}
                    onChange={handleChangeCheck}
                  />
                  Garden
                </label>
              </Row>
              <Row>
                <label>
                  <input
                    type="checkbox"
                    name="television"
                    checked={formData.amenities.television}
                    onChange={handleChangeCheck}
                  />
                  Television
                </label>
              </Row>
            </Col>
            <Row>
              <br />
            </Row>
            <Row>
              <Form.Label>Enter Any Additional Notes For the Guest</Form.Label>
              {/* <Col sm="3" md="2"> */}
              <Form.Control
                as="textarea"
                name="additional_notes"
                rows={4}
                value={formData.house_rules.additional_notes}
                onChange={handleChange}
              />
              {/* </Col> */}
            </Row>
          </Form.Group>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PropertyRules;
