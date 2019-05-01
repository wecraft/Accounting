import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { MatPaginatorModule, MatTableModule } from "@angular/material";
import { InvoiceModule } from "../../invoice/invoice.module";
import { RegularInvoicesComponent } from "./regular-invoices.component";

@NgModule({
	imports: [SharedModule, MatPaginatorModule, MatTableModule, InvoiceModule],
	declarations: [RegularInvoicesComponent],
	exports: [RegularInvoicesComponent]
})
export class RegularInvoicesModule {}
