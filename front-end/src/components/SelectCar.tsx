interface SelectCarProps {
rentalData: {
city: string;
startDate: Date;
endDate: Date;
}
}

const SelectCar = ({ rentalData }: SelectCarProps) => {
const { city, startDate, endDate } = rentalData;

return (
<div>
<h1>Wybrane opcje wynajmu samochodu:</h1>
<p>Miasto: {city}</p>
<p>Data rozpoczęcia: {startDate.toLocaleDateString()}</p>
<p>Data zakończenia: {endDate.toLocaleDateString()}</p>
</div>
);
};

export default SelectCar;