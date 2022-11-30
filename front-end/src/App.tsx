import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Rentals from './Rentals';
import Departments from './Departments';
import Cars from './Cars';
import Home from './Home';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/rentals">
          <Rentals />
        </Route>
        <Route path="/rentals/${id}/departments">
          <Departments />
        </Route>
        <Route path="/rentals/${id}/departments/${departmentId}/cars ">
          <Cars />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
