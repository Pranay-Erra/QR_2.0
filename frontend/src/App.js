import logo from './logo.svg';
import './App.css';
import Qrcodegenerator from './main';
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Test from './test';
import AdminDashboard from './adminDashboard';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Qrcodegenerator/>}/>
      <Route path='/test' element={<Test/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
