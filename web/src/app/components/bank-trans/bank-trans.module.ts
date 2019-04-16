import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { BankTransComponent } from "./bank-trans.component";
import { MatTableModule, MatPaginatorModule } from "@angular/material";
import { AccountIconModule } from "../account/account-icon/account-icon.module";
import { OrderModule } from "../order/order.module";
import { UtilUploaderModule } from "../shared/utils/util-uploader/util-uploader.module";
import { BankTransImportModule } from "./bank-trans-import/bank-trans-import.module";

@NgModule({
	imports: [
		SharedModule,
		MatPaginatorModule,
		MatTableModule,
		AccountIconModule,
		OrderModule,
		UtilUploaderModule,
		BankTransImportModule
	],
	declarations: [BankTransComponent],
	exports: [BankTransComponent]
})
export class BankTransModule {}
