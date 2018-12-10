import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
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
        let token = this.storageService.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});

        return this.http.get<CustomerDTO>(
            `${API_CONFIG.baseURL}/customers/email?value=${email}`,
            {'headers': authHeader}
        );
    }

    getImageFromBucket(id: string) : Observable<any>{
        let url = `${API_CONFIG.bucketBaseURL}/cp${id}.jpg`;

        return this.http.get(url, {responseType: 'blob'});
    }
}