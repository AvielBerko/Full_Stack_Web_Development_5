import { Container, Row, Col } from "react-bootstrap";
import TodosList from "./child-components/todos-list";
import { useState } from "react";

export default function Todos() {

  const [sortBy, setSortBy] = useState('id');
  const [filterBy, setFilterBy] = useState('id');

  const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleFilterOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  return (
    <Container>
      <Row className="text-center">
        <Col>
          <h1>Todos</h1>
        </Col>
      </Row>
      <Row>
        <Col>
        <div className="d-flex flex-row gap-2">
          <label>Sort By</label>
          <select value={sortBy} onChange={handleSortOptionChange}>
            <option value="id">ID</option>
            <option value="name">Name</option>
          </select>
          <label>Filter</label>
          <select value={filterBy} onChange={handleFilterOptionChange}>
            <option value="none">None</option>
            <option value="done">Done</option>
            <option value="notDone">Not Done</option>
          </select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <TodosList sortBy={sortBy} filterBy={filterBy}/>
        </Col>
      </Row>
    </Container>
  );
}
