import { useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import ReservationDataService from '../services/reservation.service';

const ReservationForm = () => {
  const location = useLocation();
  const { car } = location.state;
  const { rentalData } = location.state;

  const queryClient = useQueryClient();

  const addOne = useMutation({
    mutationFn: ReservationDataService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });

  const [insurerName, setInsurerName] = useState('');
  const [claimNumber, setClaimNumber] = useState('');

  const handleDone = () => {
    const startYear = rentalData.startDate.getFullYear();
    const startMonth = rentalData.startDate.getMonth();
    const startDay = rentalData.startDate.getDate();

    const endYear = rentalData.endDate.getFullYear();
    const endMonth = rentalData.endDate.getMonth();
    const endDay = rentalData.endDate.getDate();

    addOne.mutate({
      carId: car._id,
      userId: car._id,
      startDate: `${startYear}-${startMonth + 1}-${startDay}`,
      endDate: `${endYear}-${endMonth + 1}-${endDay}`, 
      insurerName: insurerName,
      claimNumber: claimNumber,
    });
  };

  return (
    <div>
      <div className="content">
        <h1>Szczegóły rezerwacji:</h1>
      </div>
      <label className="label">
        <p>Miasto: {rentalData.city}</p>
        <p>Data rozpoczęcia: {rentalData.startDate.toLocaleDateString()}</p>
        <p>Data zakończenia: {rentalData.endDate.toLocaleDateString()}</p>
        <p>Wybrany pojazd: {car.brand} {car.model}</p>
      </label>

      <div className='block'>
        <form className='box'>
          <div className="field">
            <label className='label'>Dodaj dane szkodowe: </label>
            <div className="control">
              <input
                type='name'
                placeholder='Ubezpieczyciel sprawcy'
                value={insurerName}
                onChange={(e) => setInsurerName(e.target.value)}
              />
            </div>
            <div className="control">
              <input
                type='address'
                placeholder='Numer szkody'
                value={claimNumber}
                onChange={(e) => setClaimNumber(e.target.value)}
              />
            </div>
          </div>
          <Link to="/Done" className='button is-primary' onClick={handleDone}>
            Done
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;