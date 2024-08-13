import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  name: string | null;
}

const initUser: IUser = {
  name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    addName: (state, action) => {
      localStorage.setItem('name', action.payload);
      state.name = localStorage.getItem('name');
    },
  },
});

export const { addName } = userSlice.actions;

export default userSlice.reducer;
