import http from "../http-common";
import IReservationData from "../types/reservation.type";

class ReservationDataService {
  getAll() {
    return http.get<Array<IReservationData>>("/reservations");
  }

  get(id: string) {
    return http.get<IReservationData>(`/reservations/${id}`);
  }

  create(data: IReservationData) {
    return http.post<IReservationData>("/reservations", data);
  }

  update(data: IReservationData, id: any) {
    return http.put<any>(`/reservations/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/reservations/${id}`);
  }
}

export default new ReservationDataService();