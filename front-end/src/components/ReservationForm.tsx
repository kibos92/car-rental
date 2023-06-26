import { useLocation } from 'react-router-dom';

const ReservationForm = () => {
  const location = useLocation();
  const { car } = location.state;
  const {rentalData} = location.state;

  return (
    <div>
      <label className="label">
      <p>Miasto: {rentalData.city}</p>
      <p>Data rozpoczęcia: {rentalData.startDate.toLocaleDateString()}</p>
      <p>Data zakończenia: {rentalData.endDate.toLocaleDateString()}</p>
      <p>Wybrany pojazd: {car.brand} {car.model}</p>
      </label>
    </div>
  );
};

export default ReservationForm;