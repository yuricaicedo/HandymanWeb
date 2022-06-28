import { TypeServiceModel } from "./TypeServiceModel"

export interface ServiceModel {
    idService: number
    direction: string,
    journey: string,
    user: number,
    idServiceType: TypeServiceModel
}