import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { RegularTransactionsComponent } from "./regular-transactions/regular-transactions.component";
import { RegularTransactionsModule } from "./regular-transactions/regular-transactions.module";
import { RegularInvoicesComponent } from "./regular-invoices/regular-invoices.component";
import { RegularInvoicesModule } from "./regular-invoices/regular-invoices.module";

const routes: Routes = [
	{
		path: "transactions",
		component: RegularTransactionsComponent
	},
	{
		path: "invoices",
		component: RegularInvoicesComponent
	},
	{
		path: "",
		pathMatch: "full",
		redirectTo: "transactions"
	}
];

@NgModule({
	declarations: [],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		RegularTransactionsModule,
		RegularInvoicesModule
	],
	exports: [RouterModule]
})
export class RegularLazyModule {}
