import http from "../http-common";
import IDepartmentData from "../types/department.type";

class DepartmentDataService {
  getAll(rentalId: any) {
    return http.get<Array<IDepartmentData>>(`/rentals/${rentalId}/departments`);
  }

  get(rentalId: string, id: string) {
    return http.get<IDepartmentData>(`/rentals/${rentalId}/departments/${id}`);
  }

  getById(id: string){
    return http.get<IDepartmentData>(`/departments/${id}`);
  }
  
  getAllDepartments() {
    return http.get<Array<IDepartmentData>>("/departments");
  }

  create(rentalId: string, data: IDepartmentData) {
    return http.post<IDepartmentData>(`/rentals/${rentalId}/departments`, data);
  }

  update(rentalId: string, data: IDepartmentData, id: string) {
    return http.put<any>(`/rentals/${rentalId}/departments/${id}`, data);
  }

  delete(rentalId: string, id: string) {
    return http.delete<any>(`/rentals/${rentalId}/departments/${id}`);
  }
}

export default new DepartmentDataService();