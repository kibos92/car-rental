import http from "../http-common";
import IRentalData from "../types/rental.type";

class RentalDataService {
  getAll() {
    return http.get<Array<IRentalData>>("/rentals");
  }

  get(_id: string) {
    return http.get<IRentalData>(`/rentals/${_id}`);
  }

  create(data: IRentalData) {
    return http.post<IRentalData>("/rentals", data);
  }

  update(data: IRentalData, _id: any) {
    return http.put<any>(`/rentals/${_id}`, data);
  }

  delete(_id: any) {
    return http.delete<any>(`/rentals/${_id}`);
  }
}

export default new RentalDataService();