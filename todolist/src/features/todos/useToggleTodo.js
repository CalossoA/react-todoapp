import { useDispatch } from "react-redux";
import { toggleTodo } from "./todosSlice";

const useToggleTodo = () => {
  const dispatch = useDispatch();
  return (id) => {
    dispatch(toggleTodo({ id }));
  };
};

export default useToggleTodo;
