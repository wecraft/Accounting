import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/components/shared/shared.module";
import { AccountTransFormComponent } from "./account-trans-form.component";
import { MatDatepickerModule } from "@angular/material";
import { AccountFormModule } from "../../account/account-form/account-form.module";

@NgModule({
	imports: [SharedModule, MatDatepickerModule, AccountFormModule],
	declarations: [AccountTransFormComponent],
	exports: [AccountTransFormComponent]
})
export class AccountTransFormModule {}
