
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import Register from './components/Register';
import QuizComp from './components/QuizComp';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/test' element={<QuizComp />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
