import { OperationModel } from "../models/OperationModel"
import { ServiceModel } from "../models/ServiceModel"
import { TechnicianModel } from "../models/TechnicianModel"



export const OperationEmptyModel: OperationModel = {
      endDate: '',
      startDate: '',
      service: {} as ServiceModel,
      technician: {} as TechnicianModel

}

export const OperationModelnFilled = {
      startDate: "2022-06-20T13:59:11.332Z",
      endDate: "2022-06-20T22:59:11.332Z",
      idService: 1,
      documentTechnician: 1

}
