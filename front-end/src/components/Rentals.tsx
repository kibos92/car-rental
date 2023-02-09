import { useState} from 'react';
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
  const [rentalAddress, setRentalAddress] = useState('')
  const [rentalContact, setRentalContact] = useState('')

    return (
      <div>
        <div className='block'>
      <form className='box'>
      <div className="field">
      <label className='label'>Dodaj nową wypożyczalnie: </label>
      <div className="control">
        <input
          type='name'
          placeholder='Dodaj nazwę'
          value={rentalName}
          onChange={(e) => setRentalName(e.target.value)}
        />
        </div>
        <div className="control">
        <input
          type='address'
          placeholder='Dodaj adres'
          value={rentalAddress}
          onChange={(e) => setRentalAddress(e.target.value)}
        />
        </div>
        <div className="control">
        <input
          type='address'
          placeholder='Dodaj kontakt'
          value={rentalContact}
          onChange={(e) => setRentalContact(e.target.value)}
        />
        </div>
        </div>

      <button
        className='button is-primary'
        onClick={() => {
          addOne.mutate({
            title: rentalName,
            headquarters: rentalAddress,
            contactDetails: rentalContact
          })
        }}
      >
        Add Rental
      </button>
      </form>
      </div>

        <label className='label'>Lista wypożyczalni: </label>
        <div className='block'>
      <ul>
        {getAll.data?.data.map(rental => (
          <li key={rental._id}>{rental.title}</li>
        ))}
      </ul>
      </div>
    </div>
    )
  }
  
  export default Rentals;