import http from "../http-common";
import ICarData from "../types/car.type";

class CarDataService {
  getAll(rentalId: any, departmentId: any) {
    return http.get<Array<ICarData>>(`/api/rentals/${rentalId}/departments/${departmentId}/cars`);
  }

  getAllCars() {
    return http.get<Array<ICarData>>("/api/cars");
  }

  get(rentalId: any, departmentId: any, id: string) {
    return http.get<ICarData>(`/api/rentals/${rentalId}/departments/${departmentId}/cars/${id}`);
  }

  create(rentalId: any, departmentId: any, data: ICarData) {
    return http.post<ICarData>(`/api/rentals/${rentalId}/departments/${departmentId}/cars`, data);
  }

  update(rentalId: any, departmentId: any, data: ICarData, id: any) {
    return http.put<any>(`/api/rentals/${rentalId}/departments/${departmentId}/cars/${id}`, data);
  }

  delete(rentalId: any, departmentId: any, id: any) {
    return http.delete<any>(`/api/rentals/${rentalId}/departments/${departmentId}/cars/${id}`);
  }
}

export default new CarDataService();