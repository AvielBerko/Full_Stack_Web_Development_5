import { Container, Row, Col } from "react-bootstrap";
import PostsList from "./child-components/posts-list";
import { useState } from "react";

export default function Posts() {

  const [sortBy, setSortBy] = useState('id');

  const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Posts</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Sort By</label>
          <select value={sortBy} onChange={handleSortOptionChange}>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <PostsList sortBy={sortBy}/>
        </Col>
      </Row>
    </Container>
  );
}
