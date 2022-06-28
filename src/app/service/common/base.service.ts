import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpXhrBackend } from "@angular/common/http";

export class BaseService {

    public http = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest }));

    constructor() {}

    protected get( urlBase: string, urlComplementary: string, params?: string, options?: any ): Observable<any> {
        options = (options) ? options : this.getOptions();
        const urlFull = this.getUrl( urlBase, urlComplementary, params );
        return this.http.get( urlFull, options )
    }

    protected post( urlBase: string, urlComplementary: string, body?:any,  params?: string, options?: any ): Observable<any> {
        const urlFull = this.getUrl( urlBase, urlComplementary, params );
        return this.http.post( urlFull, body, options );
    }

    private getUrl( urlBase: string, urlComplementary: string, params?: any ) {
        let paramsString: string;

        paramsString = (params) ? '?' + new URLSearchParams( params ).toString() : '';

        return `${ urlBase }/${ urlComplementary }${ paramsString }`
    }

    private getOptions() {
        let httpHeaders = new HttpHeaders();
        httpHeaders = httpHeaders.append('Content-Type', 'aplication/json')
        return {
            headers: httpHeaders
        };
    }
}