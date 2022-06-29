import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { OperationModel } from '../../../shared/models/OperationModel';
import { OperationService } from './operation.service';
describe('OperationService', () => {
    let operation: OperationService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OperationService],
            imports: [HttpClientTestingModule]
        });
        operation = TestBed.inject(OperationService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(operation).toBeTruthy();
    });

    afterEach(() => {
        httpMock.verify()
    })
    describe('[Method create]', () => {
        it('', () => {
            const operationMock: OperationModel = {
                startDate: "2022-06-20T13:59:11.332Z",
                endDate: "2022-06-20T22:59:11.332Z",
                technician: {
                    idTechnician: 1,
                    documentType: "CC",
                    documentNumber: "documentNumber",
                    fullName: "Cristian Camilo Zambrano Grajales"
                },
                service: {
                    idService: 1,
                    direction: "Calle 10",
                    journey: "Mañana",
                    user: 123,
                    idServiceType: {
                        idServiceType: 1,
                        description: "Reparación"
                    }
                }
            }
            const url = `${environment.back.url}/operations`;
            const method = 'POST';
            operation.create(operationMock).subscribe(
                (operation: any) =>{
                    expect(operation).toEqual(null)
                }
            )
            const req:TestRequest = httpMock.expectOne(url)
            //expect(req.request.method).toBe(method)
            req.flush(operationMock)
            httpMock.verify()
        })
    })
})