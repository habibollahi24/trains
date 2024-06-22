import { Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route
          element={
            <div>
              HomePage
              <Outlet />
            </div>
          }
        >
          <Route path="/" element={<div>salam</div>} />
          <Route path="/about" element={<div>salam2</div>} />
        </Route> */}
      </Routes>
    </div>
  );
};

export default App;
