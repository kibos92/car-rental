import http from "../http-common";
import IUserData from "../types/user.type";

class UserDataService {
  get() {
    return http.get<IUserData>("/api/user");
  }

  register(data: IUserData) {
    return http.post<IUserData>("/api/register", data);
  }

  login(data: IUserData) {
    return http.post<IUserData>("/api/login", data);
  }

  getAll() {
    return http.get<Array<IUserData>>("/api/users");
  }

  update(data: IUserData, id: any) {
    return http.put<any>(`/api/users/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/api/users/${id}`);
  }
}

export default new UserDataService();