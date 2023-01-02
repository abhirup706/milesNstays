import { Col, Row, Form, InputGroup } from "react-bootstrap";
import "./searchbar.css";
import { BsSearch } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const searchUsingCity = async (e) => {
    console.log("in here")
    e.preventDefault();
    try {
      let api_url = `http://localhost:3000/listings/?city=${city}`;
      let listings = await fetch(api_url);
      let data = await listings.json();
      navigate("/allProperties", {
        state: {
          data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Row >
      <Form className="search" onSubmit={searchUsingCity}>
        <Col md="3"></Col>
        <Col md="6" className="search-inputs">
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Add City"
              aria-label="Add City"
              aria-describedby="basic-addon2"
              onChange={(e) => setCity(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" type="submit">
              Search using Place
            </Button>
          </InputGroup>
        </Col>
        <Col md="3"></Col>
      </Form>
    </Row>
  );
}

export default SearchBar;
