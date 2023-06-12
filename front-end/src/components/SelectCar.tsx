import {useQuery} from 'react-query';
import carDataService from '../services/car.service';
import departmentDataService from '../services/department.service';
import rentalDataService from '../services/rental.service';

interface SelectCarProps {
rentalData: {
city: string;
startDate: Date;
endDate: Date;
}
}

const SelectCar = ({ rentalData }: SelectCarProps) => {
const { city, startDate, endDate } = rentalData;

const getAllCars = useQuery({ queryKey: ['cars'], queryFn: carDataService.getAllCars });

const getAllDepartments = useQuery({ queryKey: ['departments'], queryFn: departmentDataService.getAllDepartments });

const getAllRentals = useQuery({ queryKey: ['rentals'], queryFn: rentalDataService.getAll });

const cars: any[] = getAllCars.data?.data || [];

const departments: any[] = getAllDepartments.data?.data || [];

const rentals: any[] = getAllRentals.data?.data || [];

const filterCarsByCity = () => {
  const departmentsByCity = departments.filter((department) => department.location === city);

  const filteredCars = departmentsByCity.flatMap((department) => {
    const departmentCars = cars.filter((car) => car.departmentId === department._id);
    return departmentCars;
  });

  return filteredCars;
};

const filteredCars = filterCarsByCity();

return (
<div>

<label className="label">
<p>Miasto: {city}</p>
<p>Data rozpoczęcia: {startDate.toLocaleDateString()}</p>
<p>Data zakończenia: {endDate.toLocaleDateString()}</p>
</label>

<h1>Lista dostępnych pojazdów:</h1>

<label className="label">
          {filteredCars.map((car: any) => {
            const department = departments.find((department) => department._id === car.departmentId);
            const rental = rentals.find((rental) => rental._id === department.rentalId);

            return (
              <div className='box'>
                <div key={car._id}>
                <p>{car.brand} {car.model} rocznik: {car.year}</p>
                {rental && <p>Wypożyczalnia: {rental.title}</p>}
              </div>
              </div>
            );
          })}
        </label>

</div>

);
};

export default SelectCar;