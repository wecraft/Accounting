import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { AccountTransGroupFormComponent } from "./account-trans-group-form.component";
import { AccountTransFormModule } from "../account-trans-form/account-trans-form.module";

@NgModule({
	imports: [SharedModule, AccountTransFormModule],
	declarations: [AccountTransGroupFormComponent],
	exports: [AccountTransGroupFormComponent]
})
export class AccountTransGroupFormModule {}
