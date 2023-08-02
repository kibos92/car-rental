import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {QueryClient, QueryClientProvider} from "react-query";

import Rentals from "./components/Rentals";
import Department from "./components/Department";
import Car from "./components/Car";
import Home from "./components/Home";

import Rental from "./components/Rental";
import ReservationForm from "./components/ReservationForm";
import Done from "./components/Done";
import Reservations from "./components/Reservations";
import Login from "./components/Login";
import Register from "./components/Register";
import { UserProvider } from "./hooks/useUser";
import { Page } from "./components/Page";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Page>
        <Home />
      </Page>
    ),
  },
  {
    path: "/Login",
    element: (
      <Page>
        <Login />
      </Page>
    ),
  },
  {
    path: "/Register",
    element: (
      <Page>
        <Register />
      </Page>
    ),
  },
  {
    path: "/ReservationForm",
    element: (
      <Page>
        <ReservationForm />
      </Page>
    ),
  },
  {
    path: "/Done",
    element: (
      <Page>
        <Done />
      </Page>
    ),
  },
  {
    path: "/Reservations",
    element: (
      <Page>
        <Reservations />
      </Page>
    ),
  },
  {
    path: "/rentals",
    element: (
      <Page>
        <Rentals />
      </Page>
    ),
  },
  {
    path: "/rentals/:id",
    element: (
      <Page>
        <Rental />
      </Page>
    ),
  },
  {
    path: "/rentals/:rentalId/departments/:departmentId",
    element: (
      <Page>
        <Department />
      </Page>
    ),
  },
  {
    path: "/rentals/:rentalId/departments/:departmentId/cars/:carId",
    element: (
      <Page>
        <Car />
      </Page>
    ),
  },
]);

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserProvider>
    
  );
}

export default App;
