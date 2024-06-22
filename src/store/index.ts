import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './feature/counter/counterSlice';
import todosSlice from './feature/todo/todoSlice';
import usersSlice from './feature/users/usersSlice';
import localStorageMiddleware from './middleware';
import postSlice from './feature/posts/postSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    todos: todosSlice,
    users: usersSlice,
    posts: postSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
});

// store.dispatch(getPosts('1'));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
