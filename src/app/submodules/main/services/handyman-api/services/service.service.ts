import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ServiceModel } from "../../../shared/models/models.imports";
import { HandymanApi } from "../handyman-api.service";

@Injectable({
    providedIn: 'root'
})
export class ServiceService extends HandymanApi {

    constructor() {
        super('services')
    }

    getById(id: string): Observable<ServiceModel[]> {
        return this.get(id);
    }
}