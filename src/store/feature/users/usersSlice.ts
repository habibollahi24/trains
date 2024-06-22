import { createSlice } from '@reduxjs/toolkit';

type UsersType = {
  users: { id: string; name: string }[];
};

const initialState: UsersType = {
  users: [
    { id: '0', name: 'mohammad' },
    { id: '1', name: 'ali' },
    { id: '2', name: 'mohsen' },
    { id: '3', name: 'reza' },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

// export const { } = todosSlice.actions;
export default usersSlice.reducer;
