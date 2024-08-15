import { formatDate } from '@/utils/date-utils';
import { createSlice } from '@reduxjs/toolkit';

export interface ITodo {
  id: number;
  title: string;
  isChecked: boolean;
  createdAt: string;
}

export interface ITodoGroup {
  date: string;
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
        createdAt: formatDate(new Date()),
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
      const newTodos = state.map((group) => {
        if (group.date === action.payload.createdAt) {
          return {
            ...group,
            todos: group.todos.map((todo) =>
              todo.id === action.payload.id
                ? { ...todo, isChecked: !todo.isChecked }
                : todo
            ),
          };
        }

        return group;
      });

      localStorage.setItem('todoGroups', JSON.stringify(newTodos));

      return newTodos;
    },
    modifyTodo: (state, action) => {
      const newTodos = state.map((group) => {
        if (group.date === action.payload.createdAt) {
          return {
            ...group,
            todos: group.todos.map((todo) =>
              todo.id === action.payload.id
                ? {
                    ...todo,
                    title: action.payload.title,
                  }
                : todo
            ),
          };
        }

        return group;
      });

      localStorage.setItem('todoGroups', JSON.stringify(newTodos));

      return newTodos;
    },
    deleteTodo: (state, action) => {
      const selectedGroupIndex = state.findIndex(
        (group) => group.date === action.payload.createdAt
      );

      if (selectedGroupIndex !== -1) {
        const filterTodos = state[selectedGroupIndex].todos.filter(
          (todo) => todo.id !== action.payload.id
        );

        const newTodos = state
          .map((group, index) => {
            if (index === selectedGroupIndex) {
              return {
                ...group,
                todos: filterTodos,
              };
            }
            return group;
          })
          .filter((group) => group.todos.length > 0); // todos가 비어있지 않은 그룹만 남김

        localStorage.setItem('todoGroups', JSON.stringify(newTodos));

        return newTodos;
      }

      return state;
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
