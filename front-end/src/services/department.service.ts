import http from "../http-common";
import IDepartmentData from "../types/department.type";

class DepartmentDataService {
  getAll(rentalId: any) {
    return http.get<Array<IDepartmentData>>(`/api/rentals/${rentalId}/departments`);
  }

  get(rentalId: string, id: string) {
    return http.get<IDepartmentData>(`/api/rentals/${rentalId}/departments/${id}`);
  }

  getById(id: string){
    return http.get<IDepartmentData>(`/api/departments/${id}`);
  }
  
  getAllDepartments() {
    return http.get<Array<IDepartmentData>>("/api/departments");
  }

  create(rentalId: string, data: IDepartmentData) {
    return http.post<IDepartmentData>(`/api/rentals/${rentalId}/departments`, data);
  }

  update(rentalId: string, data: IDepartmentData, id: string) {
    return http.put<any>(`/api/rentals/${rentalId}/departments/${id}`, data);
  }

  delete(rentalId: string, id: string) {
    return http.delete<any>(`/api/rentals/${rentalId}/departments/${id}`);
  }
}

export default new DepartmentDataService();