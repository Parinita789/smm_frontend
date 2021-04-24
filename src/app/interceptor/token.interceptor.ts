import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

import { Observable } from 'rxjs';

@Injectable()

export class AuthTokenInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.getToken();
        if (!token) {
            const tokenizeReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
                    'Access-Control-Allow-Headers': '*'
                }
            });
            return next.handle(tokenizeReq);
        } else {
            const tokenizeReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: token,
                }
            });
            return next.handle(tokenizeReq);
        }
    }

    getToken() {
        return this.authService.getToken()
    }
}

export interface Token {
    authorization: string,
    accesstoken: string
};
