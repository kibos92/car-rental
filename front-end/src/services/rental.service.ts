import http from "../http-common";
import IRentalData from "../types/rental.type";

class RentalDataService {
  getAll() {
    return http.get<Array<IRentalData>>("/api/rentals");
  }

  get(id: string) {
    return http.get<IRentalData>(`/api/rentals/${id}`);
  }

  create(data: IRentalData) {
    return http.post<IRentalData>("/api/rentals", data);
  }

  update(data: IRentalData, id: any) {
    return http.put<any>(`/api/rentals/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/api/rentals/${id}`);
  }
}

export default new RentalDataService();