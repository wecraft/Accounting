import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { BankTransComponent } from "./bank-trans.component";
import {
	MatPaginator,
	MatTableModule,
	MatPaginatorModule
} from "@angular/material";
import { AccountIconModule } from "../account/account-icon/account-icon.module";
import { OrderModule } from "../order/order.module";

@NgModule({
	imports: [
		SharedModule,
		MatPaginatorModule,
		MatTableModule,
		AccountIconModule,
		OrderModule
	],
	declarations: [BankTransComponent],
	exports: [BankTransComponent]
})
export class BankTransModule {}
