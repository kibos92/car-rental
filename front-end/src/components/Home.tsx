import RentalForm, { RentalData } from "./RentalForm";
import { useState } from "react";
import SelectCar from "./SelectCar";

const Home = () => {
  const [rentalData, setRentalData] = useState<RentalData | null>(null)

  return (
    <div>
      {rentalData ? (
        <SelectCar rentalData ={rentalData} />
      ) : (
        <RentalForm
          onSelect={(rentalData) => {
            setRentalData(rentalData);
          }}
        />
      )}
    </div>
  );
};

export default Home;