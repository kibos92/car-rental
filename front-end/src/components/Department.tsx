import { useState} from 'react';
import { useParams } from 'react-router-dom'
import DepartmentDataService from '../services/department.service';
import ICarData from "../types/car.type";
import CarDataService from '../services/car.service';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import { Link } from "react-router-dom";
import IDepartmentData from '../types/department.type';
import Modal from './Modal';

const Department = () => {

  const { rentalId: rentalId } = useParams();
  const { departmentId: departmentId } = useParams();

  const [carBrand, setCarBrand] = useState('')
  const [carModel, setCarModel] = useState('')
  const [carPlateNumber, setCarPlateNumber] = useState('')
  const [carYear, setCarYear] = useState('')

  const queryClient = useQueryClient();

  const getAll = useQuery(['cars', rentalId, departmentId], () => CarDataService.getAll(rentalId!,departmentId));

  const addOne = useMutation((newCar: ICarData) => {
    return CarDataService.create(rentalId!, departmentId!, newCar);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })

  const deleteOne = useMutation((carId: string) => {
    return CarDataService.delete(rentalId!, departmentId!, carId);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })

  const getOneDepartment = useQuery(["departments", rentalId, departmentId], () => {
    return DepartmentDataService.get(String(rentalId), String(departmentId));
  });
    
  const department = getOneDepartment.data?.data;

  const updateOneDepartment = useMutation((updatedDepartment: IDepartmentData) => {
    return DepartmentDataService.update(rentalId!, updatedDepartment, departmentId!);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] })
    },
  })

  const handleLocationChange = (updatedLocation: string) => {
    updateOneDepartment.mutate({ ...department, location: updatedLocation, address: department!.address, contactDetails: department!.contactDetails, cars: department!.cars, rentalId: department!.rentalId });
  };

  const handleAddressChange = (updatedAddress: string) => {
    updateOneDepartment.mutate({  ...department, location: department!.location, address: updatedAddress, contactDetails: department!.contactDetails, cars: department!.cars, rentalId: department!.rentalId });
  };

  const handleContactDetailsChange = (updatedContactDetails: string) => {
    updateOneDepartment.mutate({  ...department, location: department!.location, address: department!.address, contactDetails: updatedContactDetails, cars: department!.cars, rentalId: department!.rentalId });
  };


    return (
      <div>
<div className='columns'>

<div className='column'>
<div className="block">
        <label className='label'>Oddział: </label>

  <Modal title={department?.location}>
    <input className="input"
      type="text"
      value={department?.location || ''}
      onChange={(e) => handleLocationChange(e.target.value)}
    />
  </Modal>
</div>

<div className="block">
            <label className='label'>Adres oddziału: </label>

  <Modal title={department?.address}>
    <input className="input"
      type="text"
      value={department?.address || ''}
      onChange={(e) => handleAddressChange(e.target.value)}
    />
  </Modal>
</div>

<div className="block">
            <label className='label'>Dane kontaktowe: </label>

  <Modal title={department?.contactDetails}>
    <input className="input"
      type="text"
      value={department?.contactDetails || ''}
      onChange={(e) => handleContactDetailsChange(e.target.value)}
    />
  </Modal>
</div>
</div>

<div className='column'>
            <div className='block'>
      <form className='box'>
      <div className="field">
      <label className='label'>Dodaj nowy pojazd: </label>

      <div className="control">
        <input className="input"
          type='name'
          placeholder='Dodaj markę'
          value={carBrand}
          onChange={(e) => setCarBrand(e.target.value)}
        />
        </div>

        <div className="control">
        <input className="input"
          type='name'
          placeholder='Dodaj model'
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
        />
        </div>

        <div className="control">
        <input className="input"
          type='name'
          placeholder='Dodaj nr rejestracyjny'
          value={carPlateNumber}
          onChange={(e) => setCarPlateNumber(e.target.value)}
        />
        </div>

        <div className="control">
        <input className="input"
          type='name'
          placeholder='Dodaj rok produkcji'
          value={carYear}
          onChange={(e) => setCarYear(e.target.value)}
        />
        </div>

        </div>

      <button
        className='button is-primary'
        onClick={(event) => {
          event.preventDefault();
          addOne.mutate({
            brand: carBrand,
            model: carModel,
            plateNumber: carPlateNumber,
            year: carYear,
            departmentId: departmentId
          })
        }}
      >
        Dodaj pojazd
      </button>

      </form>
      </div>
      </div>

<div className='column'>
      <div className='block'>
      <label className='label'>Lista pojazdów: </label>

      <ul>
        {getAll.data?.data
  .filter(car => car.departmentId === departmentId)
  .map(car => (
    <li key={car._id}>
      <Link to={`/rentals/${rentalId}/departments/${departmentId}/cars/${car._id}`}>
        {car.plateNumber} </Link>
      <button
        className='delete'
        onClick={() => {
          deleteOne.mutate(car._id)
        }}>
      </button>
    </li>
))}
      </ul>
      </div>
      </div>
      </div>

            <div className='block'>
            <Link to={`/rentals/${rentalId}/`} className="button is-primary">Powrót</Link>
            </div>
      </div>
    )
  }
  
  export default Department