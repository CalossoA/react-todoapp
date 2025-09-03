import { useDispatch } from "react-redux";
import { removeTodo } from "./todosSlice";

const useRemoveTodo = () => {
  const dispatch = useDispatch();
  return (id) => {
    dispatch(removeTodo({ id }));
  };
};

export default useRemoveTodo;
