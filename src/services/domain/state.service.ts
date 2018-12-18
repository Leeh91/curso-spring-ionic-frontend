import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StateDTO } from "../../models/state.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class StateService {

    constructor(public http: HttpClient){}

    findAll() : Observable<StateDTO[]> {
        return this.http.get<StateDTO[]>(`${API_CONFIG.baseURL}/estados`);
    }
}