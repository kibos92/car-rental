import {QueryClient, useQuery, useMutation} from 'react-query';
import RentalDataService from '../services/rental.service';

const queryClient = new QueryClient()

const Rentals = () => {

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
        {query.data.map(rental => (
          <li key={rental.id}>{rental.title}</li>
        ))}
      </ul>

      <button
        onClick={() => {
          mutation.mutate({
            id: 1,
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