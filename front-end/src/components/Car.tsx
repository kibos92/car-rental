import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { Link } from "react-router-dom";
import CarDataService from '../services/car.service';

const Car = () => {

  const { rentalId: rentalId } = useParams();
  const { departmentId: departmentId } = useParams();
  const { carId: carId  } = useParams();

  const getOneCar = useQuery(["cars", rentalId, departmentId, carId], () => {
    return CarDataService.get(String(rentalId), String(departmentId), String(carId));
  });
    
  const car = getOneCar.data?.data;

  return (
    <div>

            <div className='block'>
                {car?.brand}
            </div>
            <div className='block'>
                {car?.model}
            </div>
            <div className='block'>
                {car?.plateNumber}
            </div>
            <div className='block'>
                {car?.year}
            </div>

            <Link to={`/rentals/${rentalId}/departments/${departmentId}/`} className="button is-primary">Return</Link>

    </div>
  )
}

export default Car
