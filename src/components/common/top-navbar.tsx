import { Navbar, Nav, Container } from "react-bootstrap";
import { useSession } from "../../hooks/use-session-storage/use-session";

export default function TopNavbar() {

  const [user,setUser] = useSession("user",null);

  const logOut = () => {
    setUser(null);
  };

  const notLoggedInLinks = (
    <Nav className="me-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </Nav>
  );

  const loggedInLinks = (
    <>
      <Navbar.Brand href="/home">JPH visual</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/info">My Info</Nav.Link>
        <Nav.Link href="/todos">My Todos</Nav.Link>
        <Nav.Link href="/posts">My Posts</Nav.Link>
        <Nav.Link href="/albums">My Albums</Nav.Link>
        <Nav.Link href="#" onClick={logOut}>
          Logout
        </Nav.Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {user ? loggedInLinks : notLoggedInLinks}
      </Container>
    </Navbar>
  );
}
