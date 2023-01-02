import { useState } from "react";
import { Col, DropdownButton } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { BsFillQuestionCircleFill, BsPerson } from "react-icons/bs";
import SignUpLoginModal from "./signUpLoginModal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { ReactSession } from "react-client-session";
import "./navbar.css";
import SearchBar from "./searchbar";

function NavbarHome() {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const openSignUpModal = () => setShowSignUpModal(true);
  const closeSignUpModal = () => setShowSignUpModal(false);
  const navigate = useNavigate()

  const location = useLocation().pathname;

  const selectPersonIcon = () => {
    console.log(ReactSession.get("id"))
    console.log('inhere')
    if (ReactSession.get("id") == undefined) {
      openSignUpModal()
    } else {
      document.getElementById("myDropdown").classList.toggle("show");
    }
  }
  console.log(ReactSession.get("id"))
  const logout = () => {
    localStorage.clear();
    document.getElementById("myDropdown").classList.toggle("show");
    navigate("/")
  }

  const redirectDashboard = () => {
    document.getElementById("myDropdown").classList.toggle("show");
    navigate("/dashboard")
  }

  return (
    <Navbar className="row fix-top" bg="light" expand="md" id="navbarmenu">
      <Col sm="2" className="logo-div">
        <Navbar.Brand>
          <Link to="/">
            <img
              src="/logo.png"
              className="d-inline-block align-top logo-img"
              alt="React Bootstrap logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Col>
      <Col sm="9">{!(location === "/") && <SearchBar />}</Col>
      <Navbar.Collapse
        className="col-sm-1 justify-content-end"
        id="basic-navbar-nav"
      >
        <ul className="navbar-nav">
          <li className="nav-item mx-2">
            <div className="dropdown">
              <Button onClick={selectPersonIcon}>
                <BsPerson style={{ width: "2em", height: "2em", float: "right" }} />
              </Button>
              <div id="myDropdown" class="dropdown-content">
                <a onClick={redirectDashboard}>Dashboard</a>
                <a onClick={logout}>Logout</a>
              </div>
              <SignUpLoginModal
                showModal={showSignUpModal}
                closeModal={closeSignUpModal}
              />
            </div>
          </li>
          <li className="nav-item mx-2">
            <Button>
              <BsFillQuestionCircleFill
                style={{ width: "2em", height: "2em" }}
              />
            </Button>
          </li>

        </ul>
      </Navbar.Collapse>
    </Navbar >
  );
}

export default NavbarHome;
