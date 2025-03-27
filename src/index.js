import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Login/Login'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from './Homepage/homepage'
import Footer from './Footer/footer';
import CountryList from './Homepage/Countrylist';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>




<BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/homepage' element={<Home />} />
        <Route path='/footer' element={<Footer />} />
        <Route path='/Countrylist' element={<CountryList />} />
      </Routes>




    </BrowserRouter>
  
  </React.StrictMode>
);

reportWebVitals();
