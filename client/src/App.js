import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingView from './views/LandingView';
import HomeView from './views/HomeView';
import Login2 from './components/Login2';
import LoginView from './views/LoginView';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
  <Routes>
    <Route path='/' exact element={<LandingView/>}></Route>
    <Route path='/login' exact element={<LoginView/>}></Route>
    <Route path='/home' exact element={<HomeView/>}></Route>
  </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;