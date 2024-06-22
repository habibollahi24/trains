/* eslint-disable @typescript-eslint/no-explicit-any */
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import {
  addTodo,
  deleteTodo,
  incrementReacttions,
} from './feature/todo/todoSlice';

const localStorageMiddleware = createListenerMiddleware();

localStorageMiddleware.startListening({
  matcher: isAnyOf(addTodo, deleteTodo, incrementReacttions),
  effect: (_, listenerApi: any) => {
    localStorage.setItem(
      'TODOS',
      JSON.stringify(listenerApi.getState().todos.todos)
    );
    console.log('side effect via localstorage');
  },
});

export default localStorageMiddleware;
