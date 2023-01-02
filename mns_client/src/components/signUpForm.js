import { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Country, State, City } from "country-state-city";
import "../stylesheets/signUpModal.css";
import md5 from "md5";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

function SignUpForm(props) {
  var navigator = useNavigate()
  var errorFlag;
  var emailErrorFlag;
  var phoneErrorFlag;
  var userErrorFlag;
  var passwordErrorFlag;
  var formDataInitialState = {
    username: "",
    password: "",
    name: {
      suffix: "",
      first_name: "",
      middle_name: "",
      last_name: "",
    },
    gender: "",
    contact: {
      email: "",
      phone: "",
      emergency: "",
    },
    address: {
      street: "",
      unit_no: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  };
  const [formData, setFormData] = useState(formDataInitialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [govID, setGovID] = useState("");

  const validate_field = (field, field_name) => {
    if (field === "") {
      errorFlag = true;
      document.getElementById(field_name + "_error").style.display = "inline";
      document.getElementById(field_name).style.border = "2px solid red";
    }
  };

  const on_focus_error = (e) => {
    document.getElementById(e.target.id + "_error").style.display = "none";
    document.getElementById(e.target.id).style.border = "1px solid #ced4da";
  };

  const checkPhoneNum = (e) => {
    phoneErrorFlag = false;
    if (formData.contact.phone !== "") {
      fetch(`http://localhost:3000/users/phone/${formData.contact.phone}`)
        .then((response) => response.json())
        .then((data) => {
          if (data === "exists") {
            phoneErrorFlag = true;
            document.getElementById("phone_num_exists").style.display =
              "inline";
            document.getElementById("phone_number").style.border =
              "2px solid red";
          }
        });
    }
  };

  const checkEmail = (e) => {
    emailErrorFlag = false;
    if (formData.contact.email !== "") {
      fetch(`http://localhost:3000/users/email/${formData.contact.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data === "exists") {
            emailErrorFlag = true;
            document.getElementById("email_exists").style.display = "inline";
            document.getElementById("email").style.border = "2px solid red";
          }
        });
    }
  };

  const checkUsername = (e) => {
    userErrorFlag = false;
    var error;
    if (formData.username !== "") {
      if (formData.username.length < 6) {
        userErrorFlag = true;
        error = document.getElementById("username_length_error");
        error.style.display = "inline";
        document.getElementById("username").style.border = "2px solid red";
      } else {
        error = document.getElementById("username_length_error");
        error.style.display = "none";
        document.getElementById("username").style.border = "1px solid #ced4da";
        fetch(`http://localhost:3000/users/username/${formData.username}`)
          .then((response) => response.json())
          .then((data) => {
            if (data === "exists") {
              userErrorFlag = true;
              document.getElementById("username_exists").style.display =
                "inline";
              document.getElementById("username").style.border =
                "2px solid red";
            }
          });
      }
    }
  };

  const checkPassword = (password) => {
    passwordErrorFlag = false;
    if (password !== "") {
      // Regular expression that checks for at least 6 characters,
      // at least one uppercase letter, one lowercase letter,
      // one number, and one special character
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      const isValid = regex.test(password);
      if (!isValid) {
        passwordErrorFlag = true;
        document.getElementById("password_req").style.display = "inline";
        document.getElementById("password").style.border = "2px solid red";
      }
    }
  };

  const validate_form = () => {
    errorFlag = false;
    validate_field(formData.name.first_name, "first_name");
    validate_field(formData.name.last_name, "last_name");
    validate_field(formData.address.street, "street");
    validate_field(formData.address.country, "country");
    validate_field(formData.address.state, "state");
    validate_field(formData.address.city, "city");
    validate_field(formData.address.zip, "zip");
    validate_field(formData.contact.email, "email");
    validate_field(formData.contact.phone, "phone_number");
    validate_field(formData.username, "username");
    validate_field(formData.password, "password");
    validate_field(confirmPassword, "confirm_password");
    if (
      formData.password !== "" &&
      confirmPassword !== "" &&
      confirmPassword !== formData.password
    ) {
      errorFlag = true;
      var error = document.getElementById("confirm_password_error");
      error.style.display = "inline";
      error.innerHTML = "Password does not match";
      document.getElementById("confirm_password").style.border =
        "2px solid red";
    }
    validate_field(formData.gender, "gender");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    validate_form();
    checkEmail(formData.email);
    checkPhoneNum(formData.contact.phone);
    checkPassword(password);
    checkUsername(formData.username);
    const Data = new FormData();
    Data.append("file", govID);
    Data.append("data", JSON.stringify(formData));
    if (
      !(
        errorFlag ||
        phoneErrorFlag ||
        emailErrorFlag ||
        userErrorFlag ||
        passwordErrorFlag
      )
    ) {
      const requestOptions = {
        method: "POST",
        body: Data,
      };

      fetch("http://localhost:3000/users/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          ReactSession.set("id", data._id);
          ReactSession.set("username", data.username);
          ReactSession.set("first_name", data.name.first_name);
          ReactSession.set("last_name", data.name.last_name);
          ReactSession.set("is_host", data.is_host);
        });
      setFormData(formDataInitialState);
      setConfirmPassword("");
      setGovID("");
      props.closeModal()
      fetch("http://localhost:3000/listings/")
        .then((response) => response.json())
        .then((data) =>
          navigator("/allProperties", {
            state: {
              data,
            },
          })
        );
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Row>
          <Col sm="3" md="2">
            <Form.Select
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: {
                    ...formData.name,
                    suffix: e.target.value,
                  },
                })
              }
            >
              <option value={""}>Title</option>
              <option value={"Mr."}>Mr.</option>
              <option value={"Mrs."}>Mrs.</option>
              <option value={"Ms."}>Ms.</option>
              <option value={"Jr."}>Jr.</option>
              <option value={"Dr."}>Dr.</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Control
              type="text"
              id="first_name"
              placeholder="First Name *"
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: {
                    ...formData.name,
                    first_name: e.target.value,
                  },
                })
              }
            />
            <Form.Text className="error" id="first_name_error">
              Please enter First Name
            </Form.Text>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Middle Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: {
                    ...formData.name,
                    middle_name: e.target.value,
                  },
                })
              }
            />
          </Col>
          <Col>
            <Form.Control
              type="text"
              id="last_name"
              placeholder="Last Name *"
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: {
                    ...formData.name,
                    last_name: e.target.value,
                  },
                })
              }
            />
            <Form.Text className="error" id="last_name_error">
              Please enter Last Name
            </Form.Text>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Address</Form.Label>
        <Row className="pb-2">
          <Col>
            <Form.Control
              type="text"
              id="street"
              placeholder="Street *"
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
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
            <Form.Control
              type="number"
              placeholder="Unit No"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
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
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    country: e.target.value,
                  },
                });
                document.getElementById("state").removeAttribute("disabled");
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
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    state: e.target.value,
                  },
                });
                document.getElementById("city").removeAttribute("disabled");
              }}
              disabled
            >
              <option value={""}>State *</option>
              {State.getStatesOfCountry(formData.address.country).map(
                (state) => (
                  <option value={state.isoCode} key={state.isoCode}>
                    {state.name}
                  </option>
                )
              )}
            </Form.Select>
            <Form.Text className="error" id="state_error">
              Please select state
            </Form.Text>
          </Col>
          <Col>
            <Form.Select
              id="city"
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
                    city: e.target.value,
                  },
                });
              }}
              disabled
            >
              <option value={""}>City *</option>
              {City.getCitiesOfState(
                formData.address.country,
                formData.address.state
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
              placeholder="Zip Code *"
              pattern="\d{5,5}(-\d{4,4})?"
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: {
                    ...formData.address,
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
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              id="email"
              placeholder="Email ID *"
              onBlur={(e) => checkEmail(e.target.value)}
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: {
                    ...formData.contact,
                    email: e.target.value,
                  },
                })
              }
            />
            <Form.Text className="error" id="email_error">
              Please enter Email
            </Form.Text>
            <Form.Text className="error" id="email_exists">
              Please enter a different email. This already exists in the system.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              id="phone_number"
              placeholder="Phone Number *"
              pattern="[0-9]{10}"
              onBlur={(e) => checkPhoneNum(e.target.value)}
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: {
                    ...formData.contact,
                    phone: e.target.value,
                  },
                })
              }
            />
            <Form.Text className="error" id="phone_number_error">
              Please enter Phone Number
            </Form.Text>
            <Form.Text className="error" id="phone_num_exists">
              Please enter a different Phone No. This already exists in the
              system.
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              placeholder="Emergency Contact"
              pattern="[0-9]{10}"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: {
                    ...formData.contact,
                    emergency: e.target.value,
                  },
                })
              }
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="username"
              placeholder="Username *"
              onFocus={(e) => {
                on_focus_error(e);
                document.getElementById("username_exists").style.display =
                  "none";
                document.getElementById("username_length_error").style.display =
                  "none";
              }}
              onBlur={(e) => checkUsername(e.target.value)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  username: e.target.value,
                })
              }
            />
            <Form.Text className="error" id="username_error">
              Please enter Username
            </Form.Text>
            <Form.Text className="error" id="username_exists">
              Please enter a different username. This already exists in the
              system.
            </Form.Text>
            <Form.Text className="error" id="username_length_error">
              Username must be at least 6 characters
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password *"
              onBlur={(e) => checkPassword(e.target.value)}
              onFocus={(e) => {
                on_focus_error(e);
                document.getElementById("password_req").style.display = "none";
              }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: md5(e.target.value),
                });
                setPassword(e.target.value);
              }}
            />
            <Form.Text className="error" id="password_error">
              Please enter Password
            </Form.Text>
            <Form.Text className="error" id="password_req">
              Password must have <br />
              at least 6 characters, <br />
              at least one uppercase letter, <br />
              at least one lowercase letter, <br />
              at least one number, <br />
              at least one special character
            </Form.Text>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              id="confirm_password"
              placeholder="Confirm Password *"
              onFocus={(e) => on_focus_error(e)}
              onChange={(e) => setConfirmPassword(md5(e.target.value))}
            />
            <Form.Text className="error" id="confirm_password_error">
              Please confirm password
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md="3" sm="4">
          <Form.Select
            id="gender"
            onFocus={(e) => on_focus_error(e)}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value,
              })
            }
          >
            <option value={""}>Gender</option>
            <option value={"Male"}>Male</option>
            <option value={"Female"}>Female</option>
            <option value={"Others"}>Others</option>
            <option value={"Do not wish to Disclose"}>
              Do not wish to Disclose
            </option>
          </Form.Select>
          <Form.Text className="error" id="gender_error">
            Please enter gender
          </Form.Text>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Control
              type="file"
              placeholder="Government ID"
              onChange={(e) => setGovID(e.target.files[0])}
              multiple
            />
            <Form.Text className="text-muted">Upload Government ID</Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center mx-3">
        <Button type="submit">Sign Up</Button>
      </Row>
    </Form>
  );
}

export default SignUpForm;
