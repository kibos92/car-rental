import {useQueryClient, useQuery, useMutation} from 'react-query';
import carDataService from '../services/car.service';
import ICarData from '../types/car.type';

interface SelectCarProps {
rentalData: {
city: string;
startDate: Date;
endDate: Date;
}
}

const SelectCar = ({ rentalData }: SelectCarProps) => {
const { city, startDate, endDate } = rentalData;

const getAll = useQuery({ queryKey: ['cars'], queryFn: carDataService.getAllCars });

const cars: any[] = getAll.data?.data || [];

return (
<div>

<h1>Wybrane opcje wynajmu samochodu:</h1>
<p>Miasto: {city}</p>
<p>Data rozpoczęcia: {startDate.toLocaleDateString()}</p>
<p>Data zakończenia: {endDate.toLocaleDateString()}</p>

<h1>Lista pojazdów</h1>

{cars.map((car: any) => (
        <div key={car._id}>
          <p>Marka: {car.brand}</p>
          <p>Model: {car.model}</p>
        </div>
      ))}

</div>
);
};

export default SelectCar;