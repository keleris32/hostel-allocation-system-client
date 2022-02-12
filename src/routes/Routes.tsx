import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalProvider from '../context/provider';
import { Home, Login, Register } from '../pages';

function AppRoutes() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default AppRoutes;
