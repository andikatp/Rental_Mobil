
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./styles/App.css";
import { HomePage, Rental, List, Login, Register } from './pages';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/mobil' element={<Rental/>}></Route>
          <Route path='/lists' element={<List/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;
