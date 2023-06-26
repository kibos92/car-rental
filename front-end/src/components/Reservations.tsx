import { useQuery} from 'react-query';
import ReservationDataService from '../services/reservation.service';
import CarDataService from '../services/car.service';

const Reservations = () => {
  
  const getAll = useQuery({ queryKey: ['reservations'], queryFn: ReservationDataService.getAll });

  const getAllCars = useQuery('cars', CarDataService.getAllCars);

    return (
      <div>
        
        <div className="content">
  
        <h1>Lista rezerwacji:</h1>
        <div className='block'>
        <ul>
        {getAll.data?.data.map((reservation) => {
          const car = getAllCars.data?.data.find((car) => car._id === reservation.carId);
          const carName = car ? `${car.brand} ${car.model}` : '';

          return (
            <li className='block' key={reservation._id}>
              UserID: {reservation.userId}, 
              StartDate: {reservation.startDate.slice(0, 10)}, 
              EndDate: {reservation.endDate.slice(0, 10)}, 
              Car: {carName}
            </li>
          );
        })}
      </ul>
      </div>
        </div>

      </div>
    );
  };
  
  export default Reservations;