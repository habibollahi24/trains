import {
  decrementByAmount,
  increment,
} from '../store/feature/counter/counterSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';

export default function Counter() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <div>
      Counter - {count}
      <button onClick={() => dispatch(increment())}>add</button>
      <button onClick={() => dispatch(decrementByAmount(5))}>add 5</button>
    </div>
  );
}
