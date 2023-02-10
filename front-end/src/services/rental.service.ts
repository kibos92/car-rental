import http from "../http-common";
import IRentalData from "../types/rental.type";
import { Schema } from "mongoose";

class RentalDataService {
  getAll() {
    return http.get<Array<IRentalData>>("/rentals");
  }

  get(id: string) {
    return http.get<IRentalData>(`/rentals/${id}`);
  }

  create(data: IRentalData) {
    return http.post<IRentalData>("/rentals", data);
  }

  update(data: IRentalData, id: any) {
    return http.put<any>(`/rentals/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/rentals/${id}`);
  }
}

export default new RentalDataService();