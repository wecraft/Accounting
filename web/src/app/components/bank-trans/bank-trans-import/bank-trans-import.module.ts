import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { BankTransImportComponent } from "./bank-trans-import.component";
import { OrderFormModule } from "../../order/order-form/order-form.module";
import { AccountTransFormModule } from "../../account-trans/account-trans-form/account-trans-form.module";

@NgModule({
	imports: [SharedModule, OrderFormModule, AccountTransFormModule],
	declarations: [BankTransImportComponent],
	entryComponents: [BankTransImportComponent]
})
export class BankTransImportModule {}
