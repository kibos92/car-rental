import './App.css';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import {QueryClient, QueryClientProvider} from 'react-query';

import Rentals from './components/Rentals';
import Department from './components/Department';
import Car from './components/Car';
import Home from './components/Home';
import Navbar from './components/NavBar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Rental from './components/Rental';
import ReservationForm from './components/ReservationForm'
import Done from './components/Done'

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ReservationForm",
    element: <ReservationForm />,
  },
  {
    path: "/Done",
    element: <Done />,
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
    path: "/rentals/:rentalId/departments/:departmentId",
    element: <Department />,
  },
  {
    path: "/rentals/:rentalId/departments/:departmentId/cars/:carId",
    element: <Car />,
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
