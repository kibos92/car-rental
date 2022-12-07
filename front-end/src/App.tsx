import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import {QueryClient, QueryClientProvider} from 'react-query';

import Rentals from './components/Rentals';
import Departments from './components/Departments';
import Cars from './components/Cars';
import Home from './components/Home';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
