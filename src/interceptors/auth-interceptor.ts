import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(public storageService: StorageService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler){
        let localUser = this.storageService.getLocalUser();

        let N = API_CONFIG.baseURL.length;
        let isRequestToAPI =  req.url.substring(0, N) == API_CONFIG.baseURL;

        if(localUser && isRequestToAPI){
            const authRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authRequest);
        }
        return next.handle(req);
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};