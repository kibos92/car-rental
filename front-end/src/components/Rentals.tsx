import { useState, ChangeEvent } from 'react';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import RentalDataService from '../services/rental.service';

const Rentals = () => {

  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ['rentals'], queryFn: RentalDataService.getAll });

  const mutation = useMutation({
    mutationFn: RentalDataService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rentals'] })
    },
  })

  const [rentalName, setRentalName] = useState('')

  const handleRentalNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRentalName(event.target.value);
};


    return (
      <div>
      <ul>
        {query.data?.data.map(rental => (
          <li key={rental._id}>{rental.title}</li>
        ))}
      </ul>
      <form>
      <label>Name</label>
        <input
          type='name'
          value={rentalName}
          onChange={handleRentalNameInputChange}
        />

      <button
        onClick={() => {
          mutation.mutate({
            description: "rental",
            title: rentalName
          })
        }}
      >
        Add Rental
      </button>
      </form>
    </div>
    )
  }
  
  export default Rentals;