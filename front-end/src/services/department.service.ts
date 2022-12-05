import http from "../http-common";
import IDepartmentData from "../types/department.type";

class DepartmentDataService {
  getAll() {
    return http.get<Array<IDepartmentData>>("/departments");
  }

  get(id: string) {
    return http.get<IDepartmentData>(`/departments/${id}`);
  }

  create(data: IDepartmentData) {
    return http.post<IDepartmentData>("/departments", data);
  }

  update(data: IDepartmentData, id: any) {
    return http.put<any>(`/departments/${id}`, data);
  }

  delete(id: any) {
    return http.delete<any>(`/departments/${id}`);
  }
}

export default new DepartmentDataService();