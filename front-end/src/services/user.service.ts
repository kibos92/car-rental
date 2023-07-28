import http from "../http-common";
import IUserData from "../types/user.type";

export interface UserCredentials {
  username: string;
  password: string;
}

class UserDataService {
  get() {
    return http.get<IUserData>("/api/user");
  }

  register(data: UserCredentials) {
    return http.post<IUserData>("/api/register", data);
  }

  login(data: UserCredentials) {
    return http.post<IUserData>("/api/login", data);
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