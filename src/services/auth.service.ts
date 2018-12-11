import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtHelper } from "angular2-jwt";
import { CredentialsDTO } from "../models/credentials.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http: HttpClient,
        public storageService: StorageService
    ){

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

    successfulLogin(authorizationValue: string){
        let token = authorizationValue.substring(7);
        let user: LocalUser = {
            token: token,
            email: this.jwtHelper.decodeToken(token).sub
        }

        this.storageService.setLocalUser(user);
    }

    refreshToken(){
        return this.http.post(`${API_CONFIG.baseURL}/auth/refresh_token`,
        {},
        {
            observe: 'response',
            responseType: 'text'
        });
    }

    logout(){
        this.storageService.setLocalUser(null);
    }
}