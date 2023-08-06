import { useState} from 'react';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import RentalDataService from '../services/rental.service';
import { Link } from "react-router-dom";

const Rentals = () => {

  const queryClient = useQueryClient();

  const getAll = useQuery({ queryKey: ['rentals'], queryFn: RentalDataService.getAll });

  const addOne = useMutation({
    mutationFn: RentalDataService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] })
    },
  })

  const deleteOne = useMutation({
    mutationFn: RentalDataService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] })
    },
  })

  const [rentalName, setRentalName] = useState('')
  const [rentalAddress, setRentalAddress] = useState('')
  const [rentalContact, setRentalContact] = useState('')

    return (
      <div>
        <div className="columns">
        <div className="column">

        <div className='block'>
      <form className='box'>
      <div className="field">
      <label className='label'>Dodaj nową wypożyczalnię: </label>
      <div className="control">
        <input className="input"
          type='name'
          placeholder='Dodaj nazwę'
          value={rentalName}
          onChange={(e) => setRentalName(e.target.value)}
        />
        </div>
        <div className="control">
        <input className="input"
          type='address'
          placeholder='Dodaj adres'
          value={rentalAddress}
          onChange={(e) => setRentalAddress(e.target.value)}
        />
        </div>
        <div className="control">
        <input className="input"
          type='address'
          placeholder='Dodaj kontakt'
          value={rentalContact}
          onChange={(e) => setRentalContact(e.target.value)}
        />
        </div>
        </div>

      <button
        className='button is-primary'
        onClick={(event) => {
          event.preventDefault();
          addOne.mutate({
            title: rentalName,
            headquarters: rentalAddress,
            contactDetails: rentalContact,
            departments: []
          })
        }}
      >
        Dodaj wypożyczalnię
      </button>

      </form>
      </div>
      </div>

      <div className="column">
      <div className='block'>
        <label className='label'>Lista wypożyczalni: </label>

      <ul>
        {getAll.data?.data.map(rental => (
          <li key={rental._id}><Link to={`/rentals/${rental._id}`}>{rental.title} </Link>
          <button
        className='delete'
        onClick={() => {
          deleteOne.mutate(rental._id)
        }}>
        </button>
          </li>
        ))}
      </ul>
      </div>
</div>
      </div>

    </div>
    )
  }
  
  export default Rentals;