import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { InvoiceFormComponent } from "./invoice-form.component";
import { MatDatepickerModule } from "@angular/material";

@NgModule({
	imports: [SharedModule, MatDatepickerModule],
	declarations: [InvoiceFormComponent],
	exports: [InvoiceFormComponent]
})
export class InvoiceFormModule {}
