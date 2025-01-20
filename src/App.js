import LandingPage from './components/LandingPage.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseItem from './components/ExpenseItem.js';
import Login from './components/auth/Login.js';
import Register from './components/auth/Register.js';
import Visuals from './components/Visuals.js';

function App() {
  return (
    <Router>
      <div className=' hidden md:grid'>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/addExpense" element={<ExpenseItem />} />
          <Route exact path='/visuals' element={<Visuals />} />
        </Routes>
      </div>
      <div className='flex flex-col text-center justify-center h-screen md:hidden'>
        <h1 className='text-xl text-red-500 font-bold'>NOT SUPPORTED FOR SMALL SCREENS. OPEN IN MEDIUM AND LARGE SCREEN FOR CLEAR VISUALS</h1>
      </div>
    </Router>
  );
}

export default App;
