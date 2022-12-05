import http from "../http-common";
import ICarData from "../types/car.type";

class CarDataService {
  getAll() {
    return http.get<Array<ICarData>>("/cars");
  }

  get(id: string) {
    return http.get<ICarData>(`/cars/${id}`);
  }

  create(data: ICarData) {
    return http.post<ICarData>("/cars", data);
  }

  update(data: ICarData, id: any) {
    return http.put<any>(`/cars/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/cars/${id}`);
  }
}

export default new CarDataService();