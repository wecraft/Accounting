import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { InvoiceListComponent } from "./invoice-list/invoice-list.component";
import { InvoiceListModule } from "./invoice-list/invoice-list.module";

const routes: Routes = [
	{
		path: "",
		component: InvoiceListComponent
	}
];

@NgModule({
	declarations: [],
	imports: [SharedModule, RouterModule.forChild(routes), InvoiceListModule],
	exports: [RouterModule]
})
export class InvoiceLazyModule {}
