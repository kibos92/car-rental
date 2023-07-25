import http from "../http-common";
import IReservationData from "../types/reservation.type";

class ReservationDataService {
  getAll() {
    return http.get<Array<IReservationData>>("/api/reservations");
  }

  get(id: string) {
    return http.get<IReservationData>(`/api/reservations/${id}`);
  }

  create(data: IReservationData) {
    return http.post<IReservationData>("/api/reservations", data);
  }

  update(data: IReservationData, id: any) {
    return http.put<any>(`/api/reservations/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/api/reservations/${id}`);
  }
}

export default new ReservationDataService();