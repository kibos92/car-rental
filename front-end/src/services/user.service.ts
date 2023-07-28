import http from "../http-common";
import IUserData from "../types/user.type";
import ILoginData from "../types/login.type";

class UserDataService {
  get() {
    return http.get<IUserData>("/api/user");
  }

  register(data: IUserData) {
    return http.post<IUserData>("/api/register", data);
  }

  login(data: ILoginData) {
    return http.post<ILoginData>("/api/login", data);
  }

  logout() {
    return http.post<IUserData>("/api/logout");
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