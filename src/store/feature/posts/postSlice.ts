import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (id: string) => {
    const { data } = await axios.get(BASE_URL + '/' + id);
    return data;
    // return data.slice(0, 4);
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: true,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = '';
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message!;
    });
  },
});

// export const { addTodo, deleteTodo, incrementReacttions } = postSlice.actions;
export default postSlice.reducer;
