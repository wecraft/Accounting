import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { RegularTransactionsComponent } from "./regular-transactions.component";
import { MatPaginatorModule, MatTableModule } from "@angular/material";
import { AccountIconModule } from "../../account/account-icon/account-icon.module";
import { OrderModule } from "../../order/order.module";

@NgModule({
	imports: [
		SharedModule,
		MatPaginatorModule,
		MatTableModule,
		AccountIconModule,
		OrderModule
	],
	declarations: [RegularTransactionsComponent],
	exports: [RegularTransactionsComponent]
})
export class RegularTransactionsModule {}
