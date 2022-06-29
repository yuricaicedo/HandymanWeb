import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { ServiceModel } from '../../../shared/models/ServiceModel';
import { ServiceService } from './service.service';
fdescribe('OperationService', () => {
    let service: ServiceService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ServiceService],
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(ServiceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('[Method getById]', () => {
        it('', () => {
            const url = `${environment.back.url}/services/1`;
            const servicesMock: ServiceModel[] = [{
                "idService": 1,
                "direction": "Calle 10",
                "journey": "Mañana",
                "user": 123,
                "idServiceType": {
                    "idServiceType": 1,
                    "description": "Reparación"
                }
            }]
            const method = 'GET';
            service.getById('1').subscribe(
                (services: ServiceModel[])=>{
                    expect(services).toEqual(servicesMock)
                  }
            )
            
        })
    })
})