import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { getPosts } from '../store/feature/posts/postSlice';

export default function Posts() {
  const { error, posts, loading } = useAppSelector((state) => state.posts);
  const dispatch = useAppDispatch();

  console.log(posts, loading, error);

  useEffect(() => {
    dispatch(getPosts('1'));
  }, []);

  return <div>Posts</div>;
}
