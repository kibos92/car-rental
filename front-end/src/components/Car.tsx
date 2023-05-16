import { useParams } from 'react-router-dom'
import {useQueryClient, useQuery, useMutation} from 'react-query';
import { Link } from "react-router-dom";
import CarDataService from '../services/car.service';
import ICarData from "../types/car.type";
import Modal from './Modal';


const Car = () => {

  const { rentalId: rentalId } = useParams();
  const { departmentId: departmentId } = useParams();
  const { carId: carId  } = useParams();

  const queryClient = useQueryClient();

  const getOneCar = useQuery(["cars", rentalId, departmentId, carId], () => {
    return CarDataService.get(String(rentalId), String(departmentId), String(carId));
  });
    
  const car = getOneCar.data?.data;

  const updateOneCar = useMutation((updatedCar: ICarData) => {
    return CarDataService.update(rentalId!, departmentId!, updatedCar, carId!);
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
    },
  })

  const handleBrandChange = (updatedBrand: string) => {
    updateOneCar.mutate({ ...car, brand: updatedBrand, model: car!.model, plateNumber: car!.plateNumber, year: car!.year, departmentId: car!.departmentId });
  };

  const handleModelChange = (updatedModel: string) => {
    updateOneCar.mutate({ ...car, brand: car!.brand, model: updatedModel, plateNumber: car!.plateNumber, year: car!.year, departmentId: car!.departmentId });
  };

  const handlePlateNumberChange = (updatedPlateNumber: string) => {
    updateOneCar.mutate({ ...car, brand: car!.brand, model: car!.model, plateNumber: updatedPlateNumber, year: car!.year, departmentId: car!.departmentId });
  };

  const handleYearChange = (updatedYear: string) => {
    updateOneCar.mutate({ ...car, brand: car!.brand, model: car!.model, plateNumber: car!.plateNumber, year: updatedYear, departmentId: car!.departmentId });
  };

  return (
    <div>

<label className='label'>Marka: </label>

<div className="block">
  <Modal title={car?.brand}>
    <input
      type="text"
      value={car?.brand || ''}
      onChange={(e) => handleBrandChange(e.target.value)}
    />
  </Modal>
</div>

            <label className='label'>Model: </label>

            <div className="block">
  <Modal title={car?.model}>
    <input
      type="text"
      value={car?.model || ''}
      onChange={(e) => handleModelChange(e.target.value)}
    />
  </Modal>
</div>

            <label className='label'>Numer rejestracyjny: </label>

            <div className="block">
  <Modal title={car?.plateNumber}>
    <input
      type="text"
      value={car?.plateNumber || ''}
      onChange={(e) => handlePlateNumberChange(e.target.value)}
    />
  </Modal>
</div>

            <label className='label'>Rok produkcji: </label>

            <div className="block">
  <Modal title={car?.year}>
    <input
      type="text"
      value={car?.year || ''}
      onChange={(e) => handleYearChange(e.target.value)}
    />
  </Modal>
</div>

            <Link to={`/rentals/${rentalId}/departments/${departmentId}/`} className="button is-primary">Return</Link>

    </div>
  )
}

export default Car
