import http from "../http-common";
import IUserData from "../types/user.type";

class UserDataService {
  get() {
    return http.get<IUserData>(`/user`);
  }

  register(data: IUserData) {
    return http.post<IUserData>("/register", data);
  }

  login(data: IUserData) {
    return http.post<IUserData>("/login", data);
  }

  getAll() {
    return http.get<Array<IUserData>>("/users");
  }

  update(data: IUserData, id: any) {
    return http.put<any>(`/users/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/users/${id}`);
  }
}

export default new UserDataService();