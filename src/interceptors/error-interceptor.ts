import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage.service";
import { AlertController } from "ionic-angular";
import { FieldMessage } from "../models/field_message";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

    constructor(public storageService: StorageService,
        public alertController: AlertController){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error){
                errorObj = errorObj.error;
            }
            if(!errorObj.status){
                errorObj = JSON.parse(errorObj);
            }

            console.error("Erro identificado pelo interceptor: ");
            console.error(errorObj);

            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;
                case 401:
                    this.handle401();
                    break;
                case 422:
                    this.handle422(errorObj);
                    break;
                default:
                    this.handleDefaultError(errorObj);
                break;
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    handleDefaultError(errorObj){
        let alert = this.alertController.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });

        alert.present();
    }

    handle401(){
        let alert = this.alertController.create({
            title: 'Erro 401: falha de autenticação',
            message: 'E-mail ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });

        alert.present();
    }

    handle403(){
        this.storageService.setLocalUser(null);
    }

    handle422(errorObj){
        let alert = this.alertController.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors)
        })

        alert.present();
    }

    private listErrors(messages: FieldMessage[]) : string {
        let s: string = '';
        for(var i=0; i<messages.length; i++){
            s = s + '<p><strong> ' + messages[i].fieldName + '</strong> : ' + messages[i].message
        }

        return s;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};