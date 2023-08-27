import { Injectable } from '@angular/core';
import { DEFAULT_CONNECT_URL } from './constants';

@Injectable({
    providedIn: 'root'
})
export class ConnectService {
    private connect: string;

    constructor() {
        this.connect = DEFAULT_CONNECT_URL;
    }

    getConnect() {
        return this.connect;
    }
}