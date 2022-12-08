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

    return (
      <div>
      <ul>
        {query.data?.data.map(rental => (
          <li key={rental._id}>{rental.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            _id: 1,
            description: "rental car",
            title: 'Sixt',
          })
        }}
      >
        Add Rental
      </button>
    </div>
    )
  }
  
  export default Rentals;