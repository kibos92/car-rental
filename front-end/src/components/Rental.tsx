import { useState} from 'react';
import { useParams } from 'react-router-dom'
import DepartmentDataService from '../services/department.service';
import IDepartmentData from "../types/department.type";
import RentalDataService from '../services/rental.service';
import IRentalData from '../types/rental.type';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import { Link } from "react-router-dom";
import Modal from './Modal';

const Rental = () => {
  const { id } = useParams<{ id: string }>(); 

    const [departmentLocation, setDepartmentLocation] = useState('')
    const [departmentAddress, setDepartmentAddress] = useState('')
    const [departmentContact, setDepartmentContact] = useState('')

    const queryClient = useQueryClient();

    const getAll = useQuery(['departments', id], () => DepartmentDataService.getAll(id!));

    const addOne = useMutation((newDepartment: IDepartmentData) => {
      return DepartmentDataService.create(id!, newDepartment);
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['departments'] })
      },
    })

    const deleteOne = useMutation((departmentId: string) => {
      return DepartmentDataService.delete(id!, departmentId);
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['departments'] })
      },
    })

    const updateOneRental = useMutation((updatedRental: IRentalData) => {
      return RentalDataService.update(updatedRental, id!);
    }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['rentals'] })
      },
    })

    const getOneRental = useQuery(["rentals", id], () => {
    return RentalDataService.get(String(id));
  });
    
      const rental = getOneRental.data?.data;

      const handleTitleChange = (updatedTitle: string) => {
        updateOneRental.mutate({ ...rental, title: updatedTitle, headquarters: rental!.headquarters, contactDetails: rental!.contactDetails, departments: rental!.departments });
      };

      const handleHeadquartersChange = (updatedHeadquarters: string) => {
        updateOneRental.mutate({ ...rental, title: rental!.title, headquarters: updatedHeadquarters, contactDetails: rental!.contactDetails, departments: rental!.departments });
      };

      const handleContactDetailsChange = (updatedContactDetails: string) => {
        updateOneRental.mutate({ ...rental, title: rental!.title, headquarters: rental!.headquarters, contactDetails: updatedContactDetails, departments: rental!.departments });
      };
      
      return (
        <div>
<div className='columns'>

<div className='column'>
<div className="block">
<label className='label'>Nazwa: </label>

  <Modal title={rental?.title}>
    <input className="input"
      type="text"
      value={rental?.title || ''}
      onChange={(e) => handleTitleChange(e.target.value)}
    />
  </Modal>
</div>

<div className="block">
            <label className='label'>Adres główny: </label>

  <Modal title={rental?.headquarters}>
    <input className="input"
      type="text"
      value={rental?.headquarters || ''}
      onChange={(e) => handleHeadquartersChange(e.target.value)}
    />
  </Modal>
</div>

<div className="block">
            <label className='label'>Dane kontaktowe: </label>

  <Modal title={rental?.contactDetails}>
    <input className="input"
      type="text"
      value={rental?.contactDetails || ''}
      onChange={(e) => handleContactDetailsChange(e.target.value)}
    />
  </Modal>
</div>
</div>

<div className='column'>
            <div className='block'>
      <form className='box'>
      <div className="field" >
      <label className='label'>Dodaj nowy oddział: </label>

      <div className="control">
        <input className="input"
          type='name'
          placeholder='Dodaj lokalizację'
          value={departmentLocation}
          onChange={(e) => setDepartmentLocation(e.target.value)}
        />
        </div>

        <div className="control">
        <input className="input"
          type='address'
          placeholder='Dodaj adres'
          value={departmentAddress}
          onChange={(e) => setDepartmentAddress(e.target.value)}
        />
        </div>

        <div className="control">
        <input className="input"
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
            cars: [],
            rentalId: id
          })
        }}
      >
        Dodaj oddział
      </button>

      </form>
      </div>
      </div>

<div className='column'>
      <div className='block'>
      <label className='label'>Lista oddziałów: </label>

      <ul>
        {getAll.data?.data
  .filter(department => department.rentalId === id)
  .map(department => (
    <li key={department._id}>
      <Link to={`/rentals/${id}/departments/${department._id}`}>
        {department.location} </Link>
      <button
        className='delete'
        onClick={() => {
          deleteOne.mutate(department._id)
        }}>
      </button>
    </li>
))}
      </ul>
      </div>

      </div>
            </div>
            
            <div className='block'>
            <Link to={`/rentals/`} className="button is-primary">Powrót</Link>
            </div>
        </div>
      )
  }
  
  export default Rental