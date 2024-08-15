import { createSlice } from '@reduxjs/toolkit';

export interface ITodo {
  id: number;
  title: string;
  isChecked: boolean;
  createdAt: string;
}

const initTodos: ITodo[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState: initTodos,
  reducers: {
    addTodos: (state, action) => {
      const newTodo: ITodo = {
        id: action.payload.id,
        title: action.payload.title,
        isChecked: false,
        createdAt: formatDate(new Date()), // 포맷된 날짜 저장
      };

      state.push(newTodo);

      localStorage.setItem('todoList', JSON.stringify(state));
    },
    removeTodos: () => {
      localStorage.removeItem('todoList');
      return [];
    },
    getTodos: () => {
      const storedTodos = localStorage.getItem('todoList');
      return storedTodos ? JSON.parse(storedTodos) : [];
    },
    checkTodo: (state, action) => {
      const newTodos = state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, isChecked: !todo.isChecked }
          : todo
      );

      localStorage.setItem('todoList', JSON.stringify(newTodos));

      return newTodos;
    },
    modifyTodo: (state, action) => {
      const newTodos = state.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              title: action.payload.title,
            }
          : todo
      );

      localStorage.setItem('todoList', JSON.stringify(newTodos));

      return newTodos;
    },
    deleteTodo: (state, action) => {
      const newTodos = state.filter((todo) => todo.id !== action.payload);

      localStorage.setItem('todoList', JSON.stringify(newTodos));

      return newTodos;
    },
  },
});

const formatDate = (date: Date): string => {
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

export const {
  addTodos,
  removeTodos,
  getTodos,
  checkTodo,
  modifyTodo,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
