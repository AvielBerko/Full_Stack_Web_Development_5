import { useSession } from "../../../hooks/use-session-storage/use-session";
import { Container, Row, Col } from "react-bootstrap";
import User from "../../../lib/data/dataObjects/User";
import UserInfo from "./child-components/user-info";
import { Nullable } from "../../../types/react.types";
import { UserSerializer } from "../../../lib/data/dataObjects/serialization";

export default function Info() {
  const [user, setUser] = useSession<Nullable<User>>("user", null, UserSerializer);

  if (!user?.id) return <></>;

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Info</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserInfo user={user} setUser={setUser}></UserInfo>
        </Col>
      </Row>
    </Container>
  );
}
