import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, noop, Observable, Observer, of, switchMap, tap } from 'rxjs';
import { OperationService, ServiceService, TechnicianService } from '../../services/handyman-api/handyman-api.imports';
import * as moment from 'moment';
import { ToastService } from '../../../../service/shared/shared.imports';
import { ServiceModel, TechnicianModel } from '../../shared/models/models.imports';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
moment.locale("es");

@Component({
  selector: 'app-new-operation',
  templateUrl: './new-operation.component.html',
  styleUrls: ['./new-operation.component.css']
})
export class NewOperationComponent implements OnInit {
  
  formOperation!: FormGroup;
  today = moment();
  maxStartDate = new Date(this.today.toDate());
  minStartDate = new Date(this.today.subtract(7, 'days').toDate());
  maxEndDate = this.maxStartDate;
  minEndDate!: Date;

  technicianSelect!: any;
  searchTechnician!: string;
  technicians!: TechnicianModel[];
  errorMessageTechnician!: string;
  suggestionsTechnician$!: Observable<TechnicianModel[]>;
  
  serviceSelect!: any;
  searchService!: string;
  services!: ServiceModel[];
  errorMessageService!: string;
  suggestionsService$!: Observable<ServiceModel[]>;

  // Flags
  searchingTechnician: boolean = false;
  searchingService: boolean = false;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private technicianService: TechnicianService,
    private serviceService: ServiceService,
    private operationService: OperationService,
    private toastService: ToastService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.searchTechnicians();
    this.searchServices();
    this.changeDate(this.startDate, "startDate");
    this.changeDate(this.endDate, "endDate");
  }

  get documentTechnician() {
    return this.formOperation.controls['documentTechnician']
  }

  get idService() {
    return this.formOperation.controls['idService']
  }

  get startDate() {
    return this.formOperation.controls['startDate']
  }

  get endDate() {
    return this.formOperation.controls['endDate']
  }

  buildForm(): void {
    this.formOperation = this.formBuilder.group({
      documentTechnician: [ '', Validators.compose([ Validators.required ]) ],
      idService: [ '', Validators.compose([ Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/) ]) ],
      startDate: [ '', Validators.compose([ Validators.required ]) ],
      endDate: [ '', Validators.compose([ Validators.required ]) ]
    })
  }

  searchTechnicians(): void {
    this.suggestionsTechnician$ = new Observable((observer: Observer<string | undefined>) => {
      this.technicianSelect = null;
      observer.next(this.documentTechnician.value)
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          this.documentTechnician.setErrors(null);
          this.searchingTechnician = true;
          return this.technicianService.getByDocument(query).pipe(
            map((technicians: TechnicianModel[]) => {
              this.technicians = technicians || []
              this.searchingTechnician = false;
              return this.technicians
            }),
            tap(() => noop, err => {
              this.errorMessageTechnician = err && err.message || 'Lo siento, no se pudo procesar la petición.';
            })
          );
        }
        return of([]);
      })
    )
  }

  searchServices(): void {
    this.suggestionsService$ = new Observable((observer: Observer<string | undefined>) => {
      this.serviceSelect = null;
      observer.next(this.idService.value)
    }).pipe(
      switchMap((query: string) => {
        if (query && !isNaN((Number(query)))) {
          this.idService.setErrors(null);
          this.searchingService = true;
          return this.serviceService.getById(query).pipe(
            map((services: ServiceModel[]) => {
              this.services = services || []
              this.searchingService = false;
              return this.services
            }),
            tap(() => noop, err => {
              this.errorMessageService = err && err.message || 'Lo siento, no se pudo procesar la petición.';
            })
          );
        }
        return of([]);
      })
    )
  }

  changeDate(control: AbstractControl, key: string): void {
    control.valueChanges.subscribe((value: Date) => {
      if (value) (key === "startDate") ? this.minEndDate = value : this.maxStartDate = value;
    })
  }

  save(): void {
    
    this.loading = true;

    this.operationService.create({
      startDate: moment(this.startDate.value).utc(true).toISOString(),
      endDate:  moment(this.endDate.value).utc(true).toISOString(),
      service: this.serviceSelect,
      technician: this.technicianSelect
    }).subscribe({
      next: (result) => {
        this.showToastSuccess("Operación creada exitosamente")
        this.resetForm();
      },
      error: (error) => {
        if (error.status === 400) this.showToastDanger(error.error.metaData.Error);
        else this.showToastDanger('Ha ocurrido un problema, inténtelo más tarde.');
        console.log(error);
        this.loading = false;
      },
      complete: () => this.loading = false
    })
  }

  resetForm(): void {
    this.formOperation.reset();
    this.serviceSelect = undefined;
    this.technicianSelect = undefined;
  }

  showToastDanger(content: string) {
    this.toastService.showError("Handyman dice:", content);
  }

  showToastSuccess(content: string) {
    this.toastService.showSuccess("Handyman dice:", content);
  }

  onSelectTechnician(event: any): void {
    if (event && event.item) this.technicianSelect = event.item;
  }

  onSelectService(event: any): void {
    if (event && event.item) this.serviceSelect = event.item;
  }

  noResultsTechnicians(event: boolean): void {
    if (event) this.documentTechnician.setErrors({'notFound': true});
  }

  noResultsServices(event: boolean): void {
    if (event) this.idService.setErrors({'notFound': true});
  }

  onBlurTechnician(): void{
    if(this.documentTechnician.value) {
      this.technicianSelect = this.technicians.find(value => value.documentNumber === this.documentTechnician.value)
      if (!this.technicianSelect) this.documentTechnician.setErrors({'notFound': true});
    }
  }

  onBlurService(){
    if(this.idService.value) {
      this.serviceSelect = this.services.find(value => value.idService === Number(this.idService.value))
      if (!this.serviceSelect) this.idService.setErrors({'notFound': true});
    }
  }
}
