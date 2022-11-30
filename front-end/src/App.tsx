import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import Rentals from './components/Rentals';
import Departments from './components/Departments';
import Cars from './components/Cars';
import Home from './components/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rentals",
    element: <Rentals />,
  },
  {
    path: "/rentals/:id/departments",
    element: <Departments />,
  },
  {
    path: "/rentals/:id/departments/:id/cars",
    element: <Cars />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
