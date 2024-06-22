import { useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import {
  addTodo,
  deleteTodo,
  incrementReacttions,
} from '../store/feature/todo/todoSlice';

export default function TodosList() {
  const todos = useAppSelector((state) => state.todos.todos);
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const [author, setAuthor] = useState('');
  const [ascending, setAscending] = useState(true);

  const addHandler = () => {
    const title = titleRef.current?.value;
    const body = bodyRef.current?.value;
    if (title && body && author) {
      dispatch(addTodo({ title, body, author: JSON.parse(author) }));
      titleRef.current.value = '';
      bodyRef.current.value = '';
    }
  };

  const relativeTime = (date: string) => {
    const rtf = new Intl.RelativeTimeFormat('fa');

    const justTime = Number(new Date().getTime());
    const createdTime = Number(new Date(date).getTime());

    const subDate = Math.floor((createdTime - justTime) / (1000 * 60));

    if (Math.abs(Number(subDate)) < 1) return 'اندکی قبل';
    if (Math.abs(Number(subDate)) > 1000) return ' یک روز قبل';

    return rtf.format(Number(subDate), 'minute');
  };

  const memoizedTodo = useMemo(() => {
    return [...todos].sort((a, b) => {
      return ascending
        ? +new Date(a.date) - +new Date(b.date)
        : +new Date(b.date) - +new Date(a.date);
    });
  }, [ascending, todos]);

  const handleReactions = (id: string, key: string) => {
    // console.log(id, key);
    dispatch(incrementReacttions({ id, key }));
  };

  return (
    <div>
      <h2>list</h2>
      <div style={{ display: 'flex' }}>
        <input ref={titleRef} type="text" placeholder="title" />
        <textarea ref={bodyRef} placeholder="body" />

        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="">please select</option>
          {users.map((user) => {
            return (
              <option
                key={user.id}
                value={JSON.stringify({ id: user.id, name: user.name })}
              >
                {user.name}
              </option>
            );
          })}
        </select>
        <button
          disabled={
            !titleRef.current?.value && !bodyRef.current?.value && !author
          }
          onClick={addHandler}
        >
          add
        </button>
        <button onClick={() => setAscending((prev) => !prev)}>
          {ascending ? 'صعودی' : 'نزولی'}
        </button>
      </div>

      <div>
        {memoizedTodo.map((todo) => {
          return (
            <div
              key={todo.id}
              id="table"
              style={{
                display: 'flex',
                width: '100vw',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingBottom: '1rem',
              }}
            >
              <p>{todo.title}</p>
              <p>{todo.body}</p>
              <p>{todo.id}</p>
              <p>{todo.author.name}</p>
              <p>
                {new Date(todo.date).toLocaleDateString('fa-IR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <p style={{ direction: 'rtl' }}>{relativeTime(todo.date)}</p>

              {Object.entries(todo.reaction).map(([key, value]) => (
                <button onClick={() => handleReactions(todo.id, key)} key={key}>
                  {key}:{value}
                </button>
              ))}

              <button onClick={() => dispatch(deleteTodo({ id: todo.id }))}>
                ❌
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
