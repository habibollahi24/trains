import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

type TodoState = {
  todos: {
    id: string;
    title: string;
    body: string;
    author: { id: string; name: string };
    date: string;
    reaction: { coffie: number; heart: number; wow: number; rocket: number };
  }[];
};
type PayloadType = {
  title: string;
  body: string;
  author: { id: string; name: string };
};

const initialState: TodoState = {
  todos: JSON.parse(localStorage.getItem('TODOS')!) || [],
};

const todosSlice = createSlice({
  name: 'my-todos',
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<PayloadType>) => {
      state.todos.push({
        id: nanoid(10),
        date: new Date().toISOString(),
        title: payload.title,
        body: payload.body,
        author: payload.author,
        reaction: { coffie: 0, heart: 0, wow: 0, rocket: 0 },
      });
    },
    deleteTodo: (state, { payload }: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== payload.id);
    },
    incrementReacttions: (
      state,
      { payload }: PayloadAction<{ id: string; key: string }>
    ) => {
      const { id, key } = payload;

      const todo = state.todos.find((todo) => todo.id === id);

      if (todo) todo.reaction[key as keyof typeof todo.reaction]++;
    },
  },
});

export const { addTodo, deleteTodo, incrementReacttions } = todosSlice.actions;
export default todosSlice.reducer;
