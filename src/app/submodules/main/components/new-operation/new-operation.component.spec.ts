import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import * as moment from 'moment';
import { ServiceService, TechnicianService } from '../../services/handyman-api/handyman-api.imports';


import { NewOperationComponent } from './new-operation.component';
import { OperationEmptyModel, OperationModelnFilled } from '../../shared/mocks/operationMock';
import { OperationMock } from '../../services/services/operation.mock';
import { ServiceMock } from '../../services/services/service.mock';
import { TechnicianServiceMock } from '../../services/services/technician.service.mock';

describe('NewOperationComponent', () => {
  let component: NewOperationComponent;
  let fixture: ComponentFixture<NewOperationComponent>;
  const technicianServiceMock = new TechnicianServiceMock();
  const serviceMock = new ServiceMock();
  const operationMock = new OperationMock();
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOperationComponent ],
      imports: [ReactiveFormsModule, ToastModule],
      providers: [
        {provide: TechnicianService, useValue: technicianServiceMock},
        {provide: ServiceService, useValue: serviceMock},
        {provide: OperationMock, useValue: operationMock},
        MessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("form control", () =>{
    describe("Control documentTechnician", () =>{
      it("When documentTechnician is requerid", () =>{
        const documentTechnician = component.formOperation.get("documentTechnician");
        documentTechnician?.setValue("1234")
        expect(documentTechnician?.valid).toBeTrue()
      })
      it("When Spy method not have been colled", () =>{
        const documentTechnician = component.formOperation.get("documentTechnician");
        documentTechnician?.setValue("1234")
        const spyMethod = spyOn(component, 'searchTechnicians');
        expect(spyMethod).not.toHaveBeenCalled()
      })
      it("When Spy method have been called", () =>{
        
        component.ngOnInit();
        const spyMethod = spyOn(component, 'searchTechnicians');
        expect(spyMethod).not.toHaveBeenCalled()
      })
    })
  })
  describe("Control idService", () =>{
    it("When idService is requerid", () =>{
      const idService = component.formOperation.get("idService");
      idService?.setValue("1234")
      expect(idService?.valid).toBeTrue()
    })
    it("When Spy method not have been colled", () =>{
      const idService = component.formOperation.get("idService");
      idService?.setValue("1234")
      const spyMethod = spyOn(component, 'searchServices');
      expect(spyMethod).not.toHaveBeenCalled()
    })
    it("When Spy method have been called", () =>{
      
      component.ngOnInit();
      const spyMethod = spyOn(component, 'searchServices');
      expect(spyMethod).not.toHaveBeenCalled()
    })
  })
  describe("Control startDate", () =>{
    it("When startDate is requerid", () =>{
      const startDate = component.formOperation.get("startDate");
      startDate?.setValue(moment().toDate())
      expect(startDate?.valid).toBeTrue()
    })
  })
  describe("Control endDate", () =>{
    it("When endDate is requerid", () =>{
      const endDate = component.formOperation.get("endDate");
      endDate?.setValue(moment().toDate())
      expect(endDate?.valid).toBeTrue()
    })
  })
  describe("[Method save]", () =>{
    it("Then the form is invalid ", () =>{
      const spyResetForm = spyOn(component.formOperation, 'reset');
      component.formOperation.setValue({...OperationModelnFilled})

      component.save();

      expect(component.formOperation.valid).toBeTrue();
      expect(spyResetForm).not.toHaveBeenCalled()
    })
  })
});
