import { of } from "rxjs"

export class ServiceMock {
    getById = (id: string) =>{
        return of()
    }
}