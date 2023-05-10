import { useCallback, useReducer, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/TodoTemplate';

function createBulkTodos(){
  const array = [];
  for(let i = 1; i <= 2500; i++){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });

  }
  return array;
}

function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT':
      // {type : 'INSERT', todo}
      return todos.concat(action.todo);
    case 'REMOVE':
      // {type : 'REMOVE', todo}
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      // {type : 'TOGGLE', todo}
      return todos.map(todo => 
        todo.id === action.id ? { ...todo, checked: !todo.checked} : todo,
       );
    default:
      return todos;
  }
}

function App(){
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  // 고윳값으로 사용될 id
  // ref를 사용하여 변수 담기
  const nextId = useRef(2501);
  const onInsert = useCallback(
    text => {
      const todo = {
        id : nextId.current,
        text,
        checked : false,
      };
      dispatch({type : 'INSERT', todo});
      nextId.current += 1; // nextId 1씩 더하기
  },[],);

  const onRemove = useCallback(
    id => {
      dispatch({type: 'REMOVE', id});
  },[],)

  const onToggle = useCallback(
    id => {
      dispatch({type: 'TOGGLE', id});
  },[],)

  return (
  <TodoTemplate>
    <TodoInsert onInsert={onInsert}/>
    <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
  </TodoTemplate>
  );
};

export default App;