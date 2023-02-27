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
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Rental from './components/Rental';

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
    path: "/rentals/:id",
    element: <Rental />,
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
    <div className='container'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='hero'>
      <Hero />
      </div>
      <div className='section'>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    </div>
    <div className='footer' style={{padding: 5}}>
      <Footer />
    </div>
    </div>
    
  );
}

export default App;
