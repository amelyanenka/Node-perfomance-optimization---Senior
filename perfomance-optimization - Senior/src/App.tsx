import { Outlet, Route, Routes } from 'react-router-dom';

import { Limits } from './pages/Limits';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Limits />} />
        <Route path="*" element="There's nothing here!" />
      </Routes>
      <Outlet />
    </>
  );
}

export default App;
