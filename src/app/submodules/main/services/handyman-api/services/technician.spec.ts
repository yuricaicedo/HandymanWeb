import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { TechnicianModel } from '../../../shared/models/TechnicianModel';
import { TechnicianService } from './technician.service';
fdescribe('TechnicianService', () => {
    let technician: TechnicianService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TechnicianService],
            imports: [HttpClientTestingModule]
        });
        technician = TestBed.inject(TechnicianService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(technician).toBeTruthy();
    });

    describe('[Method getById]', () => {
        it('', () => {
            const url = `${environment.back.url}/technicians/11`;
            const techniciansMock: TechnicianModel[] = [{
                "idTechnician": 1,
                "documentType": "CC",
                "documentNumber": "documentNumber",
                "fullName": "Cristian Camilo Zambrano Grajales"
            }]
            const method = 'GET';
            technician.getByDocument('11').subscribe(
                (technicians: TechnicianModel[]) => {
                    expect(technicians).toEqual(techniciansMock)
                }
            )

        })
    })
})