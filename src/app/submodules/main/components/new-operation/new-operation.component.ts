import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, noop, Observable, Observer, of, switchMap, tap } from 'rxjs';
import { OperationService, ServiceService, TechnicianService } from '../../services/handyman-api/handyman-api.imports';
import * as moment from 'moment';
import { ToastService } from '../../../../service/shared/shared.imports';
import { ServiceModel, TechnicianModel } from '../../shared/models/models.imports';
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

  technicians: TechnicianModel[] = [];
  searchTechnician!: string;
  errorMessageTechnician!: string;
  suggestionsTechnician$!: Observable<TechnicianModel[]>;

  services: ServiceModel[] = [];
  searchService!: string;
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
      observer.next(this.documentTechnician.value)
    }).pipe(
      switchMap((query: string) => {
        if (query) {
          this.documentTechnician.setErrors(null);
          this.searchingTechnician = true;
          return this.technicianService.getByDocument(query).pipe(
            map((technicians: TechnicianModel[]) => {
              if (!technicians.length) this.documentTechnician.setErrors({'notFound': true});
              this.searchingTechnician = false;
              this.technicians = technicians;
              return technicians || []
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
      observer.next(this.idService.value)
    }).pipe(
      switchMap((query: string) => {
        if (query && !isNaN((Number(query)))) {
          this.idService.setErrors(null);
          this.searchingService = true;
          return this.serviceService.getById(query).pipe(
            map((services: ServiceModel[]) => {
              if (!services.length) this.idService.setErrors({'notFound': true});
              this.searchingService = false;
              this.services = services
              return services || []
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
    const technicianMatch: any = this.technicians.find(value => value.documentNumber === this.documentTechnician.value);
    const serviceMatch: any = this.services.find(value => value.idService === Number(this.idService.value));
    if (!technicianMatch) this.documentTechnician.setErrors({'notMatch': true});
    if (!serviceMatch) this.idService.setErrors({'notMatch': true});
    
    if (!this.formOperation.valid) return;
    
    this.loading = true;

    this.operationService.create({
      startDate: this.startDate.value,
      endDate: this.startDate.value,
      service: serviceMatch,
      technician: technicianMatch
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
  }

  showToastDanger(content: string) {
    this.toastService.showError("Handyman dice:", content);
  }

  showToastSuccess(content: string) {
    this.toastService.showSuccess("Handyman dice:", content);
  }
}
