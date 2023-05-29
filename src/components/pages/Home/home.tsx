import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSession } from "../../../hooks/use-session-storage/use-session";
import User from "../../../lib/data/dataObjects/User";
import { Nullable } from "../../../types/react.types";
import { UserSerializer } from "../../../lib/data/dataObjects/serialization";

export default function Home() {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );

  if (!user) return <p>There was an error loading the page.</p>;

  return (
    <Container className="text-center">
      <Row>
        <Col>
          <h1>Welcome, {user.name}!</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>In this site you can:</h2>
          <ul>
            <li>
              Track you're <Link to="/todos">Todos.</Link>
            </li>
            <li>
              View and manage your <Link to="/posts">Posts.</Link>
            </li>
            <li>
              View and manage your <Link to="/albums">Albums.</Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}
