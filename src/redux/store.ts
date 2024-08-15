import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/slice/user-slice';
import todoReducer from '@/redux/slice/todo-slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    todo: todoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
