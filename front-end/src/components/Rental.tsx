import { useParams } from 'react-router-dom'
import RentalDataService from '../services/rental.service';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import { Link } from "react-router-dom";

const Rental = () => {
    let { id } = useParams()

    const getOne = useQuery(["rentals", id], () => {
    return RentalDataService.get(String(id));
  });
    
      const rental = getOne.data?.data;
    
      return (
        <div>
            <div className='block'>
                {rental?.title}
            </div>
            <div className='block'>
                {rental?.headquarters}
            </div>
            <div className='block'>
                {rental?.contactDetails}
            </div>

            
            <Link to={`/rentals/`} className="button is-primary">Return</Link>
        </div>
      )
  }
  
  export default Rental