import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/EmployeeList';
import CreateEmployee from './pages/CreateEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;