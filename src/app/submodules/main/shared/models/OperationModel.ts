import { ServiceModel } from "./ServiceModel"
import { TechnicianModel } from "./TechnicianModel"

export interface OperationModel {
    startDate: string,
    endDate: string,
    technician: TechnicianModel,
    service: ServiceModel
}