import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private messageService: MessageService) {}

    showSuccess( title: string, content: string ) {
        this.messageService.add({ severity:'success', summary: title, detail: content });
    }

    showError( title: string, content: string ) {
        this.messageService.add({ severity:'error', summary: title, detail: content });
    }
}