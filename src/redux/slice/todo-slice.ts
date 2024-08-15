import { formatDate } from '@/utils/date-utils';
import { createSlice } from '@reduxjs/toolkit';

export interface ITodo {
  id: number;
  title: string;
  isChecked: boolean;
  createdAt: Date;
}

export interface ITodoGroup {
  date: Date;
  todos: ITodo[];
}

const initTodoGroups: ITodoGroup[] = [];

const todoSlice = createSlice({
  name: 'todo',
  initialState: initTodoGroups,
  reducers: {
    addTodos: (state, action) => {
      const newTodo: ITodo = {
        id: action.payload.id,
        title: action.payload.title,
        isChecked: false,
        createdAt: new Date(),
      };

      const existingGroup = state.find(
        (group) => group.date === newTodo.createdAt
      );

      if (existingGroup) {
        // 해당 그룹에 새로운 투두 추가
        existingGroup.todos.push(newTodo);
      } else {
        // 새로운 그룹을 생성 후 추가
        state.push({
          date: newTodo.createdAt,
          todos: [newTodo],
        });
      }

      localStorage.setItem('todoGroups', JSON.stringify(state));
    },
    removeTodos: () => {
      localStorage.removeItem('todoGroups');
      return [];
    },
    getTodos: () => {
      const storedTodos = localStorage.getItem('todoGroups');
      return storedTodos ? JSON.parse(storedTodos) : [];
    },
    checkTodo: (state, action) => {
      const newTodos = state.map((group) => ({
        ...group,
        todos: group.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isChecked: !todo.isChecked }
            : todo
        ),
      }));

      localStorage.setItem('todoGroups', JSON.stringify(newTodos));

      return newTodos;
    },
    modifyTodo: (state, action) => {
      const newTodos = state.map((group) => ({
        ...group,
        todos: group.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                title: action.payload.title,
              }
            : todo
        ),
      }));

      localStorage.setItem('todoGroups', JSON.stringify(newTodos));

      return newTodos;
    },
    deleteTodo: (state, action) => {
      const newTodos = state
        .map((group) => ({
          ...group,
          todos: group.todos.filter((todo) => todo.id !== action.payload), // 해당 투두 삭제
        }))
        .filter((group) => group.todos.length > 0); // todos가 비어있지 않은 그룹만 남김

      localStorage.setItem('todoGroups', JSON.stringify(newTodos));

      return newTodos;
    },
  },
});

export const {
  addTodos,
  removeTodos,
  getTodos,
  checkTodo,
  modifyTodo,
  deleteTodo,
} = todoSlice.actions;

export default todoSlice.reducer;
