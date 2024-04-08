import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { connect } from "react-redux";
import { loginUserLogOut } from "../../actions/actionCreators";
import { logOut } from "../../api";

function FormExample() {
  const handleLogOut = () => {
    logOut();
  };

  return (
    <Navbar className="bg-body-tertiary justify-content-between ">
      <Form inline className="navbar">
        <Row>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              ---
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
              <Dropdown.Item href="/" onClick={handleLogOut}>
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}
const mapDispatchToProps = {
  logOut: loginUserLogOut,
};

export default connect(null, mapDispatchToProps)(FormExample);
