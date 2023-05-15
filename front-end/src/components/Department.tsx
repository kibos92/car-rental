import { useState} from 'react';
import { useParams } from 'react-router-dom'
import DepartmentDataService from '../services/department.service';
import ICarData from "../types/car.type";
import CarDataService from '../services/car.service';
import {useQueryClient, useQuery, useMutation} from 'react-query';
import { Link } from "react-router-dom";

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


    return (
      <div>
        
          <div className='block'>
                {department?.location}
            </div>
            <div className='block'>
                {department?.address}
            </div>
            <div className='block'>
                {department?.contactDetails}
            </div>

            <div className='block'>
      <form className='box'>
      <div className="field">
      <label className='label'>Dodaj nowy pojazd: </label>

      <div className="control">
        <input
          type='name'
          placeholder='Dodaj markę'
          value={carBrand}
          onChange={(e) => setCarBrand(e.target.value)}
        />
        </div>

        <div className="control">
        <input
          type='name'
          placeholder='Dodaj model'
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
        />
        </div>

        <div className="control">
        <input
          type='name'
          placeholder='Dodaj numer rejestracyjny'
          value={carPlateNumber}
          onChange={(e) => setCarPlateNumber(e.target.value)}
        />
        </div>

        <div className="control">
        <input
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
        Add Car
      </button>

      </form>
      </div>

      <label className='label'>Lista pojazdów: </label>
      <div className='block'>
      <ul>
        {getAll.data?.data
  .filter(car => car.departmentId === departmentId)
  .map(car => (
    <li className='block' key={car._id}>
      <Link to={`/rentals/${rentalId}/departments/${departmentId}/cars/${car._id}`}>
        {car.plateNumber}
      </Link>
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
            
            <Link to={`/rentals/${rentalId}/`} className="button is-primary">Return</Link>

      </div>
    )
  }
  
  export default Department