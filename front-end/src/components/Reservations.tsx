import { useQuery} from 'react-query';
import ReservationDataService from '../services/reservation.service';

const Reservations = () => {
  
  const getAll = useQuery({ queryKey: ['reservations'], queryFn: ReservationDataService.getAll });

    return (
      <div>
        
        <div className="content">
  
        <h1>Lista rezerwacji:</h1>
        <div className='block'>
      <ul>
        {getAll.data?.data.map(reservation => (
          <li className='block' key={reservation._id}>

            CarID: {reservation.carId},
            UserID: {reservation.userId},
            StartDate: {reservation.startDate},
            EndDate: {reservation.endDate}
            
            </li>
        ))}
      </ul>
      </div>
        </div>

      </div>
    );
  };
  
  export default Reservations;