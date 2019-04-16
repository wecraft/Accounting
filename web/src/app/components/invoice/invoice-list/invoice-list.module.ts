import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { InvoiceListComponent } from "./invoice-list.component";
import { MatPaginatorModule, MatTableModule } from "@angular/material";
import { InvoiceModule } from "../invoice.module";

@NgModule({
	imports: [SharedModule, MatPaginatorModule, MatTableModule, InvoiceModule],
	declarations: [InvoiceListComponent],
	exports: [InvoiceListComponent]
})
export class InvoiceListModule {}
