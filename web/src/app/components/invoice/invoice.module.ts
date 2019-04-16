import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { InvoiceComponent } from "./invoice.component";
import { InvoiceFormModule } from "./invoice-form/invoice-form.module";

@NgModule({
	imports: [SharedModule, InvoiceFormModule],
	declarations: [InvoiceComponent],
	entryComponents: [InvoiceComponent]
})
export class InvoiceModule {}
