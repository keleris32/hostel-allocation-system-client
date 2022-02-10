import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from '../pages';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={Home} />
        <Route path="/login" element={Login} />
        <Route path="/register" element={Register} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
