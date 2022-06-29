import { of } from "rxjs"

export class TechnicianServiceMock {
    getByDocument=(document: String) =>{
        return of()
    }
}