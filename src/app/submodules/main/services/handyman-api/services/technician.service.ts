import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TechnicianModel } from "../../../shared/models/models.imports";
import { HandymanApi } from "../handyman-api.service";

@Injectable({
    providedIn: 'root'
})
export class TechnicianService extends HandymanApi {

    constructor() {
        super('technicians')
    }

    getByDocument(document: string): Observable<TechnicianModel[]> {
        return this.get(document);
    }
}