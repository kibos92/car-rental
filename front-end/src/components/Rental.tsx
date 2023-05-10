import { useState} from 'react';
import { useParams } from 'react-router-dom'
import DepartmentDataService from '../services/department.service';
import IDepartmentData from "../types/department.type";
import RentalDataService from '../services/rental.service';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import { Link } from "react-router-dom";

const Rental = () => {
  const { id } = useParams<{ id: string }>(); 

    const [departmentLocation, setDepartmentLocation] = useState('')
    const [departmentAddress, setDepartmentAddress] = useState('')
    const [departmentContact, setDepartmentContact] = useState('')

    const queryClient = useQueryClient();

    const addOne = useMutation((newDepartment: IDepartmentData) => {
      return DepartmentDataService.create(id!, newDepartment);
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['departments'] })
      },
    })

    const getOneRental = useQuery(["rentals", id], () => {
    return RentalDataService.get(String(id));
  });
    
      const rental = getOneRental.data?.data;
    
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

            <div className='block'>
      <form className='box'>
      <div className="field">
      <label className='label'>Dodaj nowy oddział: </label>

      <div className="control">
        <input
          type='name'
          placeholder='Dodaj lokalizację'
          value={departmentLocation}
          onChange={(e) => setDepartmentLocation(e.target.value)}
        />
        </div>

        <div className="control">
        <input
          type='address'
          placeholder='Dodaj adres'
          value={departmentAddress}
          onChange={(e) => setDepartmentAddress(e.target.value)}
        />
        </div>

        <div className="control">
        <input
          type='name'
          placeholder='Dodaj kontakt'
          value={departmentContact}
          onChange={(e) => setDepartmentContact(e.target.value)}
        />
        </div>

        </div>

      <button
        className='button is-primary'
        onClick={(event) => {
          event.preventDefault();
          addOne.mutate({
            location: departmentLocation,
            address: departmentAddress,
            contactDetails: departmentContact,
            cars: []
          })
        }}
      >
        Add Department
      </button>

      </form>
      </div>
            
            <Link to={`/rentals/`} className="button is-primary">Return</Link>
        </div>
      )
  }
  
  export default Rental