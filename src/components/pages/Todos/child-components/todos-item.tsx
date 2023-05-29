import { ListGroupItem, Form } from "react-bootstrap";
import Todo from "../../../../lib/data/dataObjects/Todo";
import { useState } from "react";

type TodosItemProps = {
  todo: Todo;
};

export default function TodosItem({ todo }: TodosItemProps) {
  if (!todo || todo.completed == null) return <></>;

  const [checked, setChecked] = useState<boolean>(todo.completed);

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <ListGroupItem>
      <Form.Check type="checkbox" label={todo.title} checked={checked} />
    </ListGroupItem>
  );
}
