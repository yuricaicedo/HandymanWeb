import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment";
import { BaseService } from "../../../../service/common/base.service";

export class HandymanApi extends BaseService {

    private urlApi: string;

    constructor(
        private controller: string
    ) {
        super();
        this.urlApi = environment.back.url;
        this.controller = controller;
    }

    private urlComplementary( method: string ) {
        return this.controller + "/" + method;
    }

    protected override get( method: string, params?: string ): Observable<any> {
        return super.get( this.urlApi, this.urlComplementary(method), params )
    }

    protected override post( method: string, params?: any, body: any = {} ): Observable<any> {
        return super.post( this.urlApi, this.controller, body, params )
    }

}