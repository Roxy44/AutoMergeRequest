import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './index.css'
import Home from './Pages/Home';
import Login from "./Pages/Login";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {user: ""};
  }

  checkUserRole = async (userId) => {
      await this.setState({ user: userId });
  }

  render() {
    return ( 
      <html> 
        <head>
          <meta name="description" content="Система автоматических merge request запросов для работников АО 'НПФ 'Микран'" />
        </head>
        <body>
          <BrowserRouter>
            <header>
              <Link to="/login" className="Link">Login</Link>
              <Link to="/home" className="Link">Home</Link>
            </header>
            <Routes>  
              <Route path="/" element={<Login checkUserRole={this.checkUserRole}/>} />
              <Route path="/login" element={<Login checkUserRole={this.checkUserRole}/>} /> 
              <Route path="/home" element={<Home userRole={this.state.user}/>} />
            </Routes>
          </BrowserRouter> 
        </body>
      </html>
    );
  } 
}

export default App;