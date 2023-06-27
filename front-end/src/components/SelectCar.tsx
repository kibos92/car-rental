import {useQuery} from 'react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import carDataService from '../services/car.service';
import departmentDataService from '../services/department.service';
import rentalDataService from '../services/rental.service';
import reservationService from '../services/reservation.service';

interface SelectCarProps {
rentalData: {
city: string;
startDate: Date;
endDate: Date;
}
}

const SelectCar = ({ rentalData }: SelectCarProps) => {
const { city, startDate, endDate } = rentalData;
const [selectedCar, setSelectedCar] = useState<any>(null);

const handleCarClick = (car: any) => {
  setSelectedCar(car);
};

const getAllCars = useQuery({ queryKey: ['cars'], queryFn: carDataService.getAllCars });

const getAllDepartments = useQuery({ queryKey: ['departments'], queryFn: departmentDataService.getAllDepartments });

const getAllRentals = useQuery({ queryKey: ['rentals'], queryFn: rentalDataService.getAll });

const getAllReservations = useQuery({queryKey: ['reservations'], queryFn: reservationService.getAll});

const cars: any[] = getAllCars.data?.data || [];

const departments: any[] = getAllDepartments.data?.data || [];

const rentals: any[] = getAllRentals.data?.data || [];

const reservations: any[] = getAllReservations.data?.data || []

const filterCarsByCity = () => {
  const departmentsByCity = departments.filter((department) => department.location === city);

  const filteredCars = departmentsByCity.flatMap((department) => {
    const departmentCars = cars.filter((car) => car.departmentId === department._id);

    const hasReservation = departmentCars.some((car) =>
    reservations.some((reservation) => {
      return (
        reservation.carId === car._id &&
        ((new Date(startDate).toISOString().substring(0, 10) >= new Date(reservation.startDate).toISOString().substring(0, 10)) &&
        (new Date(startDate).toISOString().substring(0, 10) <= new Date(reservation.endDate).toISOString().substring(0, 10)) ||
        (new Date(endDate).toISOString().substring(0, 10) >= new Date(reservation.startDate).toISOString().substring(0, 10)) &&
        (new Date(endDate).toISOString().substring(0, 10) <= new Date(reservation.endDate).toISOString().substring(0, 10)))
      );
    })
  );

    if (hasReservation) {
      return [];
    }

    return departmentCars;
  });

  return filteredCars;
};

const filteredCars = filterCarsByCity();

return (
<div>

<div className="content">
  
  <h1>Lista dostępnych pojazdów:</h1>

</div>

<div className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
<label className="label">
          {filteredCars.map((car: any) => {
            const department = departments.find((department) => department._id === car.departmentId);
            const rental = rentals.find((rental) => rental._id === department.rentalId);

            return (
                <div className='button is-primary is-inverted' key={car._id} onClick={() => handleCarClick(car)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>{car.brand} {car.model}, rocznik: {car.year} - </p>
                {rental && <p> Wypożyczalnia: {rental.title}</p>}
              </div>
            );
          })}
        </label>
        </div>
          
        <div className="block" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {selectedCar ? (
      <Link to="/ReservationForm" state={{ car: selectedCar, rentalData: rentalData }}>
        <button className="button is-primary">
          Next
        </button>
      </Link>
    ) : (
      <button className="button is-primary" disabled>
        Next
      </button>
    )}
        </div>

</div>

);
};

export default SelectCar;