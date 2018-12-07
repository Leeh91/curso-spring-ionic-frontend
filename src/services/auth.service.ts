import { Injectable } from "@angular/core";
import { CredentialsDTO } from "../models/credentials.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthService{

    constructor(public http: HttpClient){

    }

    authenticate(credentials: CredentialsDTO){

        return this.http.post(
            `${API_CONFIG.baseURL}/login`, 
            credentials,
            {
                observe: 'response',
                responseType: 'text'
            })

    }
}