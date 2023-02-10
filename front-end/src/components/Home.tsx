import RentalForm from './RentalForm';
import { useState } from 'react'

const Home = () => {

  const [onSelect, setOnSelect] = useState([]) 

    return (
      <div>
        <RentalForm onSelect = {onSelect} />
        
      </div>
    )
  }
  
  export default Home