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
    children: [
      {
        path: "rentals",
        element: <Rentals />,
        children: [
          {
            path: "/:id/departments",
            element: <Departments />,
            children: [
              {
                path: "/:id/cars",
                element: <Cars />
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
