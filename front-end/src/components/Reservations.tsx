import { useQuery} from 'react-query';
import ReservationDataService from '../services/reservation.service';
import CarDataService from '../services/car.service';
import UserDataService from '../services/user.service';

const Reservations = () => {
  
  const getAll = useQuery({ queryKey: ['reservations'], queryFn: ReservationDataService.getAll });
  const getAllCars = useQuery('cars', CarDataService.getAllCars);
  const getAllUsers = useQuery('users', UserDataService.getAll);

    return (
      <div>
        <div className="content">
        <h1>Lista rezerwacji:</h1>
        <div className='block'>
        <ul>
        {getAll.data?.data.map((reservation) => {
          const car = getAllCars.data?.data.find((car) => car._id === reservation.carId);
          const carName = car ? `${car.brand} ${car.model}` : '';

          const user = getAllUsers.data?.data.find((user) => user._id === reservation.userId);
          const userName = user ? `${user.username}` : '';

          return (
            <li key={reservation._id}>
              Numer rezerwacji: {reservation._id},
              Klient: {userName}, 
              Data rozpoczęcia wynajmu: {reservation.startDate.slice(0, 10)}, 
              Data zakończenia wynajmu: {reservation.endDate.slice(0, 10)}, 
              Pojazd zastępczy: {carName}
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