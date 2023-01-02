import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import md5 from "md5";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const loginUser = (event) => {
    event.preventDefault();
    var data = {
      username: username,
      password: password,
    };
    fetch("http://localhost:3000/users/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data === "login failed") {
          document.getElementById("error_login").style.display = "inline";
        } else {
          console.log(data);
          ReactSession.set("id", data._id);
          ReactSession.set("username", data.username);
          ReactSession.set("first_name", data.name.first_name);
          ReactSession.set("last_name", data.name.last_name);
          ReactSession.set("is_host", data.is_host);
          ReactSession.set("is_ui_host", false);
          props.closeModal();
          navigate("/dashboard")
        }
      });
  };
  return (
    <Form onSubmit={loginUser}>
      <Form.Text className="error justify-content-center" id="error_login" style={{ color: "red" }}>
        Username or password is incorrect
      </Form.Text>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          placeholder="password"
          onChange={(e) => setPassword(md5(e.target.value))}
        ></Form.Control>
      </Form.Group>
      <Row className="justify-content-center mx-3">
        <Button type="submit">Login</Button>
      </Row>
    </Form>
  );
}

export default LoginForm;
