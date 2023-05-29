import { ListGroup } from "react-bootstrap";
import { useSession } from "../../../../hooks/use-session-storage/use-session";
import User from "../../../../lib/data/dataObjects/User";
import { useEffect, useState } from "react";
import Todo from "../../../../lib/data/dataObjects/Todo";
import TodosItem from "./todos-item";
import { Nullable } from "../../../../types/react.types";
import { UserSerializer } from "../../../../lib/data/dataObjects/serialization";

type TodosListProps = {
  sortBy: string;
  filterBy: string;
};

export default function TodosList({sortBy, filterBy}: TodosListProps) {
  const [user, _] = useSession<Nullable<User>>(
    "user",
    null,
    UserSerializer
  );
  const [todos, setTodos] = useState<Todo[]>([]);
  const [shownTodos, setShownTodos] = useState<Todo[]>([]);


  if (!user?.id) return <></>;

  const handleSort = () => {
    let sortedPosts: Todo[];

    switch (sortBy) {
      case 'name':
        sortedPosts = [...shownTodos].sort((a, b) => {
          if (a.title && b.title) { return a.title.localeCompare(b.title) }
          return 0;
        });
        break;
      case 'id':
        sortedPosts = [...shownTodos].sort((a, b) => {
          if (a.id && b.id) {
            const idA = String(a.id);
            const idB = String(b.id);
            return idA.localeCompare(idB);
          }
          // Handle the case where either a.id or b.id is undefined
          return 0;
        });
        break;
      default:
        sortedPosts = shownTodos;
        break;
    }
    setShownTodos(sortedPosts);
  }

  const handleFilter = () => {
    let filteredTodos: Todo[];

    switch (filterBy) {
      case 'done':
        filteredTodos = [...todos].filter((a) => a.completed);
        break;
      case 'notDone':
        filteredTodos = [...todos].filter((a) => !a.completed);
        break;
      case 'none':
      default:
        filteredTodos = todos;
        break;
    }
    setShownTodos(filteredTodos);
  }

  useEffect(() => {
    user.todos.then((todos) => {
      setTodos(todos);
      setShownTodos(todos)
    });
  }, [user]);

  useEffect(() => {
    handleSort();
  }, [sortBy]);

  useEffect(() => {
    handleFilter();
  }, [filterBy]);



  const todosDOM = shownTodos.map((todo: Todo) => {
    return <TodosItem todo={todo} key={todo.id} />;
  });

  return <ListGroup>{todosDOM}</ListGroup>;
}
