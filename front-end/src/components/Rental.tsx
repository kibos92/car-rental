import { useParams } from 'react-router-dom'
import RentalDataService from '../services/rental.service';
import {useQueryClient, useQuery, useMutation} from 'react-query';

const Rental = () => {
    let { id } = useParams()

    const getOne = useQuery(["rentals", id], () => {
    return RentalDataService.get(String(id));
  });
    
      const rental = getOne.data?.data;
    
      return <div>{JSON.stringify(rental?.title)}</div>;
  }
  
  export default Rental