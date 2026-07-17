import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class TaskService {

  private http = inject(HttpClient);

  api = 'http://localhost:8000/tasks';

  getTasks() {
    return this.http.get<any[]>(this.api);
  }

  createTask(t: any) {
    return this.http.post(this.api, t);
  }

  updateTask(t: any) {
    return this.http.patch(`${this.api}/${t.id}`, t);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}