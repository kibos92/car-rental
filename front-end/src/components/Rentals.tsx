import { useState, ChangeEvent } from 'react';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import RentalDataService from '../services/rental.service';

const Rentals = () => {

  const queryClient = useQueryClient();

  const getAll = useQuery({ queryKey: ['rentals'], queryFn: RentalDataService.getAll });

  const addOne = useMutation({
    mutationFn: RentalDataService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] })
    },
  })

  const [rentalName, setRentalName] = useState('')

    return (
      <div>
        <label className='label'>Lista wypożyczalni: </label>
        <div className='block'>
      <ul>
        {getAll.data?.data.map(rental => (
          <li key={rental._id}>{rental.title}</li>
        ))}
      </ul>
      </div>

      <div className='block'>
      <form className='box'>
      <div className="field">
      <label className='label'>Dodaj nową wypożyczalnie: </label>
      <div className="control">
        <input
          type='name'
          value={rentalName}
          onChange={(e) => setRentalName(e.target.value)}
        />
        </div>
        </div>

      <button
        className='button is-primary'
        onClick={() => {
          addOne.mutate({
            description: "rental",
            title: rentalName
          })
        }}
      >
        Add Rental
      </button>
      </form>
      </div>
    </div>
    )
  }
  
  export default Rentals;