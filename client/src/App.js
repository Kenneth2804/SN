import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingView from './views/LandingView';
import HomeView from './views/HomeView';
import Login2 from './components/Login2';
import LoginView from './views/LoginView';
import UserProfile from './components/Profile/UserProfile';
import OtherProfiles from './components/Profile/OtherProfiles';
import EditProfile from './components/Profile/EditProfile';
import ForgotPassword from './components/menu/ForgotPassword';
import ViewForgotPassword from './components/menu/ViewForgotPassword';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
  <Routes>
    <Route path='/' exact element={<LandingView/>}></Route>
    <Route path='/login' exact element={<LoginView/>}></Route>
    <Route path='/home' exact element={<HomeView/>}></Route>
    <Route path='/profile' exact element={<UserProfile/>}></Route>
    <Route path='/profiles/:id' exact element={<OtherProfiles/>}></Route>
    <Route path='/edit' exact element={<EditProfile></EditProfile>}></Route>
    <Route path='/forgotpassword' exact element={<ViewForgotPassword></ViewForgotPassword>}></Route>
  </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;