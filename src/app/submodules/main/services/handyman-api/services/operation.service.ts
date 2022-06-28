import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { OperationModel } from "../../../shared/models/models.imports";
import { HandymanApi } from "../handyman-api.service";

@Injectable({
    providedIn: 'root'
})
export class OperationService extends HandymanApi {

    constructor() {
        super('operations')
    }

    create( body: OperationModel ): Observable<any> {
        return this.post('', null, body);
    }
}