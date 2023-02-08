import { useState } from 'react'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const Home = ({onSelect}: any) => {

  const [city, setCity] = useState('')
  const [startDate, setStartDate] =  useState(new Date())
  const [endDate, setEndDate] =  useState(new Date())

  const onSubmit = (e: any) => {
    e.preventDefault()

    if (!city) {
      alert('Please select any city')
      return
    }

    onSelect({ city, startDate, endDate })

    setCity('')
    setStartDate(new Date())
    setEndDate(new Date())
  }

    return (
      <div>
      <div className="block">
        Wybierz <strong>miasto</strong> oraz <strong>termin</strong> wynajmu samochodu.
      </div>
      <div className="block">
      <form className='box' onSubmit={onSubmit}>
      <div className="field">
      <label className='label'>Wybierz miasto: </label>
      <div className="select">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="warszawa">Warszawa</option>
          <option value="wroclaw">Wrocław</option>
          <option value="krakow">Kraków</option>
          <option selected value="lodz">Łódź</option>
          <option value="poznan">Poznań</option>
          <option value="gdansk">Gdańsk</option>
        </select>
        </div>
        </div>

        <div className="field">
      <label className='label'>Wybierz datę rozpoczęcia wynajmu: </label>
      <DatePicker selected={startDate} onChange={(date: any) => setStartDate(date)} />
        </div>

        <div className="field">
      <label className='label'>Wybierz datę zakończenia wynajmu: </label>
      <DatePicker selected={endDate} onChange={(date: any) => setEndDate(date)} />
        </div>

        <div className="field">
        <div className="control">
    <input type="submit" className="button is-primary" value="Submit"/>
        </div>
        </div>
      </form>
    </div>
    </div>
    )
  }
  
  export default Home