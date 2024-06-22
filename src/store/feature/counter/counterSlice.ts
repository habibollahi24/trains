import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'my-counter',
  initialState,
  reducers: {
    increment: (state) => {
      console.log(state);
      state.count = state.count + 1;
    },
    decrementByAmount: (state, action: PayloadAction<number>) => {
      state.count = state.count + action.payload;
    },
  },
});

export const { increment, decrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
