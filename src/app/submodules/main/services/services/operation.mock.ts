import { of } from "rxjs"
import { OperationModel } from "../../shared/models/OperationModel"

export class OperationMock {
    getById = (body: OperationModel) =>{
        return of()
    }
}