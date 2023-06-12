import { useState } from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

export interface RentalData {
  city: string;
  startDate: Date;
  endDate: Date
}

interface RentalFormProps {
  onSelect: (rentalData: RentalData) => void;
}

const RentalForm = ({ onSelect }: RentalFormProps) => {
  const [city, setCity] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!city) {
      alert("Please select any city");
      return;
    }

    onSelect({ city, startDate, endDate });

    setCity("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <div>
      <div className="block">
        Wybierz <strong>miasto</strong> oraz <strong>termin</strong> wynajmu
        samochodu.
      </div>
      <div className="block">
        <form className="box" onSubmit={onSubmit}>
          <div className="field">
            <label className="label">Wybierz miasto: </label>
            <div className="select">
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">...</option>
                <option value="Warszawa">Warszawa</option>
                <option value="Wrocław">Wrocław</option>
                <option value="Kraków">Kraków</option>
                <option value="Łódź">Łódź</option>
                <option value="Poznań">Poznań</option>
                <option value="Gdańsk">Gdańsk</option>
                <option value="Katowice">Katowice</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label className="label">Wybierz datę rozpoczęcia wynajmu: </label>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
            />
          </div>

          <div className="field">
            <label className="label">Wybierz datę zakończenia wynajmu: </label>
            <DatePicker
              selected={endDate}
              onChange={(date: any) => setEndDate(date)}
            />
          </div>

          <div className="field">
            <div className="control">
              <input
                type="submit"
                className="button is-primary"
                value="Submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
  
  export default RentalForm