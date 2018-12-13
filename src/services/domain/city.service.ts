import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CityDTO } from "../../models/city.dto";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CityService{

    constructor(public http: HttpClient){

    }

    findAll(state_id: string): Observable<CityDTO[]> {
        return this.http.get<CityDTO[]>(`${API_CONFIG.baseURL}/estados/${state_id}/cidades`);
    }
}