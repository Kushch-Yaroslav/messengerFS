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

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

function MiddleHeader({ user, currentChat }) {
  const otherMember = currentChat?.members.find(
    (member) => member._id !== user._id
  );

  const avatarColor = stringToColor(otherMember.firstName);
  const initial = otherMember.firstName[0];
  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
        <div className="wrapper">
          <div className="user-img" style={{ backgroundColor: avatarColor }}>
            {!otherMember.avatar && <span className="avatar">{initial}</span>}
            {otherMember?.avatar && (
              <img className="avatar" src={otherMember.avatar} />
            )}
            {/* <img
              className="avatar"
              src="https://html5css.ru/w3images/avatar5.png"
            /> */}
          </div>
          <div className="user-info">
            <span className="user-name">{otherMember.firstName}</span>
            <span className="user-online">ONLINE</span>
          </div>
        </div>
      </Form>
      <Form inline>
        {/* <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row> */}
      </Form>
    </Navbar>
  );
}
// const mapDispatchToProps = {
//   logOut: loginUserLogOut,
// };

const mapStateToProps = ({ user, currentChat }) => ({ user, currentChat });

export default connect(mapStateToProps)(MiddleHeader);
