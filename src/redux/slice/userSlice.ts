import { createSlice } from '@reduxjs/toolkit';

interface IUser {
  name: string | null;
}

const initUser: IUser = {
  name: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    addName: (state, action) => {
      localStorage.setItem('name', action.payload);
      state.name = action.payload;
    },
    removeName: (state) => {
      localStorage.removeItem('name');
      state.name = null;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { addName, removeName, setName } = userSlice.actions;

export default userSlice.reducer;
