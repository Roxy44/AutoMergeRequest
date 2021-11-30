import React, { Component }  from 'react';
import { Route, BrowserRouter as Router, BrowserRouter, Routes, Link } from "react-router-dom";
import './index.css'

import Home from './Pages/Home';
import Login from "./Pages/Login";

export default function App() {
    return (
      <BrowserRouter>
      <header>
        <Link to="/login" className="Link">Login</Link>
        <Link to="/home" className="Link">Home</Link>
      </header>

        <Routes>  
          <Route path="/" element={<Login />} />s
          <Route path="login" element={<Login />} /> 
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    );
};