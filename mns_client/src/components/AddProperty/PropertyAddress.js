import React from "react";
import { Modal, Form, Row, Col, Card } from "react-bootstrap";
import "../../stylesheets/addPropertyForm.css";
import { Country, State, City } from "country-state-city";

function PropertyAddress({ formData, setFormData }) {
  const on_focus_error = (e) => {
    document.getElementById(e.target.id + "_error").style.display = "none";
    document.getElementById(e.target.id).style.border = "1px solid #ced4da";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("inside handlechange");
    if (Number.isNaN(value)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        property_address: {
          ...prevFormData.property_address,
          [name]: parseInt(value),
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        property_address: {
          ...prevFormData.property_address,
          [name]: value,
        },
      }));
    }
  };
  console.log("before return");
  return (
    <div className="prop-addr-container">
      <Card style={{ marginBottom: "5%", width: "60%" }}>
        <Card.Header>Property Address</Card.Header>
        <Card.Body style={{ padding: "10%" }}>
          <Form>
            <Form.Group className="mb-3">
              <Row className="pb-2">
                <Col>
                  <Form.Label>Street name</Form.Label>
                  <Form.Control
                    type="text"
                    id="street"
                    value={formData.property_address.street}
                    placeholder="Street *"
                    onFocus={(e) => on_focus_error(e)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        property_address: {
                          ...formData.property_address,
                          street: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Text className="error" id="street_error">
                    Please enter Street Address
                  </Form.Text>
                </Col>
                <Col md="3" sm="4">
                  <Form.Label>Apartment Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Unit No"
                    value={formData.property_address.unit_no}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        property_address: {
                          ...formData.property_address,
                          unit_no: e.target.value,
                        },
                      })
                    }
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Select
                    id="country"
                    value={formData.property_address.country}
                    onFocus={(e) => on_focus_error(e)}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        property_address: {
                          ...formData.property_address,
                          country: e.target.value,
                        },
                      });
                      document
                        .getElementById("state")
                        .removeAttribute("disabled");
                    }}
                  >
                    <option value={""}>Country *</option>
                    {Country.getAllCountries().map((country) => (
                      <option value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="error" id="country_error">
                    Please select country
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Select
                    id="state"
                    value={formData.property_address.state}
                    onFocus={(e) => on_focus_error(e)}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        property_address: {
                          ...formData.property_address,
                          state: e.target.value,
                        },
                      });
                      document
                        .getElementById("city")
                        .removeAttribute("disabled");
                    }}
                    disabled
                  >
                    <option value={""}>State *</option>
                    {State.getStatesOfCountry(
                      formData.property_address.country
                    ).map((state) => (
                      <option value={state.isoCode} key={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="error" id="state_error">
                    Please select state
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Select
                    id="city"
                    value={formData.property_address.city}
                    onFocus={(e) => on_focus_error(e)}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        property_address: {
                          ...formData.property_address,
                          city: e.target.value,
                        },
                      });
                    }}
                    disabled
                  >
                    <option value={""}>City *</option>
                    {City.getCitiesOfState(
                      formData.property_address.country,
                      formData.property_address.state
                    ).map((city) => (
                      <option value={city.isoCode} key={city.isoCode}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="error" id="city_error">
                    Please select city
                  </Form.Text>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    id="zip"
                    value={formData.property_address.zip}
                    placeholder="Zip Code *"
                    pattern="\d{5,5}(-\d{4,4})?"
                    onFocus={(e) => on_focus_error(e)}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        property_address: {
                          ...formData.property_address,
                          zip: e.target.value,
                        },
                      })
                    }
                  />
                  <Form.Text className="error" id="zip_error">
                    Please enter Zip Code
                  </Form.Text>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PropertyAddress;
