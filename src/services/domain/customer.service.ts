import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/RX";
import { CustomerDTO } from "../../models/customer.dto";
import { StorageService } from "../storage.service";
import { API_CONFIG } from "../../config/api.config";

@Injectable()
export class CustomerService {

    constructor(
        public http: HttpClient,
        public storageService: StorageService
        ){
    }

    findByEmail(email: string): Observable<CustomerDTO>{
        return this.http.get<CustomerDTO>(
            `${API_CONFIG.baseURL}/customers/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`;

        return this.http.get(url, {responseType: 'blob'});
    }
}