import Input from "../../common/Input/input";
import { useEffect, useState } from "react";
import { Container, Col, Row, Alert } from "react-bootstrap";
import BlockButton from "../../common/BlockButton/block-button";
import { Nullable, State } from "../../../types/react.types";
import User from "../../../lib/data/dataObjects/User";
import { useNavigate } from "react-router-dom";
import { useSession } from "../../../hooks/use-session-storage/use-session";
import { UserSerializer } from "../../../lib/data/dataObjects/serialization";

const WRONG_LOGIN = "Wrong username or password.";

function checkLogin(user: User, password: string): boolean {
  //due to the complex of the data structure, we cant do the request in the server
  if (!user.address?.geo?.lat) return false;
  return user.address.geo.lat.slice(-4) === password;
}

export default function Login() {
  const [username, setUsername]: State<string> = useState("");
  const [password, setPassword]: State<string> = useState("");
  const [alert, setAlert] = useState<Nullable<string>>(null);

  const [auth, setAuth] = useSession<Nullable<User>>("user", null,UserSerializer);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    const user = new User({});
    user.first({ username }).then(() => {
      if (user.id) {
        if (checkLogin(user, password)) {
          console.log("login success", user);
          setAuth(user);
        } else {
          setAlert(WRONG_LOGIN);
        }
      } else {
        setAlert(WRONG_LOGIN);
      }
    });
  };

  useEffect(() => {
    if (auth) {
      navigate("/home", { replace: true });
    }
  }, [auth]);

  const alertDOM = (
    <Row>
      <Col>
        <Alert variant="danger" onAbort={() => setAlert(null)} dismissible>
          {alert}
        </Alert>
      </Col>
    </Row>
  );

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      {alert && alertDOM}
      <Row>
        <Col>
          <Input
            inputType="text"
            placeholder="Username"
            value={username}
            setter={setUsername}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Input
            inputType="password"
            placeholder="Password"
            value={password}
            setter={setPassword}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <BlockButton onClick={handleLoginClick}>Login</BlockButton>
        </Col>
      </Row>
    </Container>
  );
}
