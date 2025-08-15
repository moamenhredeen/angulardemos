import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { TasksResponse } from "./types";

@Injectable({
    providedIn: 'root'
})
export class TodoistService {

    private readonly http = inject(HttpClient)
    
    private readonly headers = {
        'Authorization': `Bearer ${environment.todoist.key}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    filterTasks(filter: string = '', sortBy: string = 'priority', sortOrder: 'asc' | 'desc' = 'asc'): Observable<TasksResponse> {
        const params: any = {};
        
        if (filter) {
            params.query = `search:${filter}`;
        } else {
            params.query = 'all';
        }
        
        params.sort_by = sortBy;
        params.sort_order = sortOrder;

        return this.http.get<TasksResponse>(`${environment.todoist.url}/tasks/filter`, {
            params,
            headers: this.headers
        });
    }
}