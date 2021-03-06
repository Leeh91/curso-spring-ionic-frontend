import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class ProductService{

    constructor(public http: HttpClient){}

    findByCategory(category_id: string){
        return this.http.get(`${API_CONFIG.baseURL}/products?categories=${category_id}`)
    }

    getSmallImageFromBucket(id: string): Observable<any>{
        let url = `${API_CONFIG.bucketBaseURL}/prod${id}-small.jpg`
        return this.http.get(url, {responseType: 'blob'});
    }
}