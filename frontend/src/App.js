import logo from './logo.svg';
import './App.css';
import Qrcodegenerator from './main';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Test from './test';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Qrcodegenerator/>}/>
      <Route path='/test' element={<Test/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
