import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../stylesheets/signUpModal.css";
import SignUpForm from "./signUpForm";
import LoginForm from "./loginForm";

function SignUpLoginModal(props) {
  const [loginFlag, setLoginFlag] = useState(true);
  return (
    <Modal show={props.showModal} onHide={props.closeModal} size="lg">
      <Modal.Header className="text-center">
        <Button
          className="selected-button"
          id="loginButton"
          onClick={(e) => {
            setLoginFlag(true);
            document.getElementById("loginButton").className +=
              " selected-button";
            document
              .getElementById("signUpButton")
              .classList.remove("selected-button");
          }}
        >
          Login
        </Button>
        <Button
          id="signUpButton"
          onClick={(e) => {
            setLoginFlag(false);
            document
              .getElementById("loginButton")
              .classList.remove("selected-button");
            document.getElementById("signUpButton").className +=
              " selected-button";
          }}
        >
          Sign Up
        </Button>
      </Modal.Header>
      <Modal.Body>
        {loginFlag && <LoginForm closeModal={props.closeModal} />}
        {!loginFlag && <SignUpForm closeModal={props.closeModal} />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.closeModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpLoginModal;
